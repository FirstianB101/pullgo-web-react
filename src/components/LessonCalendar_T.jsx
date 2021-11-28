import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchJoinedClassroomList } from "../redux/fetchJoinedClassroomList";
import { apiFetchLessonList } from "../redux/fetchLessonList";
import SelectedLessonList from "./SelectedLessonList";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ko";

import PaperComponent from "../material/PaperComponent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

/* Date 객체를 인자로 받아서 "2021-08-09" 형식의 string으로 반환 */
const dateToStr = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
};

/* state인 date("2021-08-09" 형태)와
 * state인 시간을 나타내는 start 또는 end("14:05" 형태)를 인자로 받아서
 * 날짜 + 시간 형태의 Date 객체로 반환 */
const dateWithTime = (date, time) => {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);

    // 시간 분해
    let hour = time.slice(0, 2);
    let min = time.slice(3, 5);

    return new Date(year, month - 1, day, hour, min);
};

/* Date 객체를 인자로 받아서 "2021-08" 형식(년, 월)의 string으로 반환 */
const dateToYearMonthStr = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    return year + "-" + month;
};

/* 문자열 yearMonth(년, 월)를 인자로 받아서 sinceDate (문자열) 반환
 * e.g. getSinceDate("2021-09")
 * => sinceDate: "2021-09-01"
 */
const getSinceDate = (yearMonth) => {
    return yearMonth + "-01";
};

/* 문자열 yearMonth(년, 월)를 인자로 받아서 untilDate (문자열) 반환
 * e.g. getUntilDate("2021-09")
 * => untilDate: "2021-10-01"
 */
const getUntilDate = (yearMonth) => {
    // ~년 12월 이면, 그 다음 년도 1월로 반환
    if (yearMonth.slice(5) == "12")
        return `${Number(yearMonth.slice(0, 4)) + 1}-01-01`;

    let year = yearMonth.slice(0, 4);
    let month = Number(yearMonth.slice(5, 7)) + 1;
    if (month === 13) month = "01";
    else if (month < 10) month = "0" + month;
    else month = String(month);
    return year + "-" + month + "-01";
};

/* classroomName으로 classroomId 검색 */
const getClassroomId = (classroomList, classroomName) => {
    return classroomList.find((classroom) => classroom.name === classroomName)
        ?.id;
};

/* classroomId로 classroomName 검색 */
const getClassroomName = (classroomList, classroomId) => {
    return classroomList.find((classroom) => classroom.id === classroomId)
        ?.name;
};

/* joinedClassroomList를 <option> 태그에 담아서 return */
const getOptionTag = (classroomList) => {
    return classroomList.map((classroom) => (
        <option value={classroom.name}>{classroom.name.split(";")[0]}</option>
    ));
};

const LessonCalendar_T = (({ history, match }) => {
    const localizer = momentLocalizer(moment);

    const dispatch = useDispatch();
    const onFetchLessonList = (userType, userId, sinceDate, untilDate) => {
        console.log("onFetchLessonList()");
        dispatch(apiFetchLessonList(userType, userId, sinceDate, untilDate));
    };
    const onFetchJoinedAcademyList = (userType, userId) => {
        console.log("onFetchJoinedAcademyList()");
        dispatch(apiFetchJoinedAcademyList(userType, userId));
    };
    const onFetchJoinedClassroomList = (userType, userId) => {
        console.log("onFetchJoinedClassroomList()");
        dispatch(apiFetchJoinedClassroomList(userType, userId));
    };

    const userType = useSelector((state) => state.userTypeReducer.userType);
    const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);
    const teacherInfo = useSelector(
        (state) => state.teacherInfoReducer.teacherInfo
    );

    // 현재 보고있는 캘린더의 년, 월 문자열("2021-10" 형태)
    const [yearMonth, setYearMonth] = useState(match.params.year_month);
    // 캘린더 선택(클릭) 일자, 선택한 일자에 등록된 수업들
    const [selectedDate, setSelectedDate] = useState(""); // 캘린더에서 클릭한 날짜
    const [selectedLessons, setSelectedLessons] = useState(null);

    // "수업 추가" form 입력 항목
    const [classroom, setClassroom] = useState(""); // 반 이름
    const [title, setTitle] = useState(""); // 수업 이름
    const [date, setDate] = useState(""); // 날짜
    const [beginTime, setBeginTime] = useState(""); // 시작 시간
    const [endTime, setEndTime] = useState(""); // 종료 시간
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("LessonCalendar_T 렌더링");
        console.log(`teacherId ${teacherId}번 선생님의 등록된 수업 fetch`);

        setYearMonth(match.params.year_month);

        onFetchLessonList(
            userType,
            teacherId,
            getSinceDate(yearMonth),
            getUntilDate(yearMonth)
        );
        onFetchJoinedAcademyList(userType, teacherId);
        onFetchJoinedClassroomList(userType, teacherId);
    }, []);

    useEffect(() => {
        onFetchLessonList(
            userType,
            teacherId,
            getSinceDate(yearMonth),
            getUntilDate(yearMonth)
        );
        onFetchJoinedClassroomList(userType, teacherId);
    }, [teacherId]);

    useEffect(() => {
        onFetchLessonList(
            userType,
            teacherId,
            getSinceDate(yearMonth),
            getUntilDate(yearMonth)
        );
    }, [yearMonth]);

    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const joinedClassroomList = useSelector(
        (state) => state.joinedClassroomListReducer.joinedClassroomList
    );
    const lessonList = useSelector(
        (state) => state.lessonListReducer.lessonList
    );
    const authToken = useSelector((state) => state.authTokenReducer.authToken);

    /* lessonList를 react-big-calendar 형식에 맞게 요소 변형 */
    const formattingLessonList = () => {
        for (let i = 0; i < lessonList.length; i++) {
            // 반 이름
            lessonList[i].classRoom = getClassroomName(
                joinedClassroomList,
                lessonList[i].classroomId
            );
            // 수업 이름
            lessonList[i].title = lessonList[i].name;

            // 시작 날짜 및 시각, 종료 날짜 및 시각
            lessonList[i].start = dateWithTime(
                lessonList[i].schedule.date,
                lessonList[i].schedule.beginTime
            );
            lessonList[i].end = dateWithTime(
                lessonList[i].schedule.date,
                lessonList[i].schedule.endTime
            );
        }
    };
    formattingLessonList();

    /* 날짜 클릭: 해당 날짜에 등록된 수업 일정들을 하단에 List로 표시 */
    const onSelectSlot = (e) => {
        setSelectedDate(dateToStr(e.slots[0]));
    };

    /* onSelectSlot로 바뀐 selectedDate를 이용하여 selectedLessons을 지정하기 위한 useEffect */
    useEffect(() => {
        setSelectedLessons(
            lessonList.filter((lesson) => lesson.schedule.date === selectedDate)
        );
    }, [selectedDate]);

    const onSelectEvent = (e) => {
        console.log(e); // 등록된 수업 일정 등 클릭 시
    };

    /* 수업 추가 form의 확인 button 클릭 */
    const onClickBtnOk = (e) => {
        console.log("수업 추가");
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // 수업 추가 form state들 초기화
        setClassroom("");
        setTitle("");
        setDate("");
        setBeginTime("");
        setEndTime("");

        setOpen(false);
    };

    /* Calendar 상단의 Today, Back, Next 버튼 클릭하여 월 이동 */
    const onNavigateCalendar = (e) => {
        // e: Date 객체

        const yearMonthStr = dateToYearMonthStr(e);
        history.push(`/teacher/main/calendar/${yearMonthStr}`);
        setYearMonth(yearMonthStr);
        // setYearMonth(match.params.year_month);
    };

    // 수업 생성 Form 입력 값들 유효 확인 및 서버로 전송, 캘린더에 수업 추가
    const onSubmitForm = async (e) => {
        // e.preventDefault();

        const postCreateLesson = async () => {
            try {
                const response = await axios.post(
                    "/v1/academy/classroom/lessons",
                    {
                        classroomId: getClassroomId(
                            joinedClassroomList,
                            classroom
                        ),
                        name: title,
                        schedule: {
                            date,
                            beginTime,
                            endTime
                        }
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    }
                );

                if (response.data != undefined)
                    alert("수업 추가가 완료되었습니다.");
            } catch (e) {
                alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
                console.log(e);
            }
        };

        let confirmCreateLesson = window.confirm(
            `${classroom.split(";")[0]} 반 ${date} 날짜 ${beginTime} ~ ${endTime} ${title} 수업을 추가 하시겠습니까?`
        );
        if (confirmCreateLesson) {
            await postCreateLesson();

            // 페이지 새로고침
            window.location.replace(`/teacher/main/calendar/${yearMonth}`);
        }

        // 수업 추가 form state들 초기화
        setClassroom("");
        setTitle("");
        setDate("");
        setBeginTime("");
        setEndTime("");

        setOpen(false);
    };

    const onChangeSelectClassroom = (e) => {
        setClassroom(e.target.value);
    };

    const onChangeInputTitle = (e) => {
        setTitle(e.target.value);
    };

    const onChangeInputDate = (e) => {
        setDate(e.target.value);
    };

    const onChangeInputBeginTime = (e) => {
        setBeginTime(e.target.value);
    };

    const onChangeInputEndTime = (e) => {
        setEndTime(e.target.value);
    };

    return (
        <>
            <div className="div__calendar" style={{ height: "500pt" }}>
                <h2 className="calendar_title">선생님 수업 일정</h2>
                <h4 className="teacher_full_name">
                    {teacherInfo.account.fullName} 님,
                    <br />
                    안녕하세요 !!
                </h4>

                <div className="div__lesson_add__btn">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleClickOpen}
                    >
                        수업 추가
                    </Button>
                </div>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle
                        style={{ cursor: "move" }}
                        id="draggable-dialog-title"
                    >
                        수업 추가
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <form
                                className="lesson_create__form"
                                onSubmit={onSubmitForm}
                            >
                                <div>
                                    <span className="lesson_create__form__label">
                                        반
                                    </span>
                                    <select
                                        name="classroom"
                                        value={classroom}
                                        onChange={onChangeSelectClassroom}
                                        required
                                    >
                                        <option value="">반 선택</option>
                                        {getOptionTag(joinedClassroomList)}
                                    </select>
                                </div>

                                <div>
                                    <span className="lesson_create__form__label">
                                        수업 이름
                                    </span>
                                    <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={onChangeInputTitle}
                                        required
                                    />
                                </div>

                                <div>
                                    <span className="lesson_create__form__label">
                                        날짜
                                    </span>
                                    <input
                                        type="date"
                                        name="date"
                                        value={date}
                                        onChange={onChangeInputDate}
                                        min={dateToStr(new Date())}
                                        required
                                    />
                                </div>

                                <div>
                                    <span className="lesson_create__form__label">
                                        시작 시간
                                    </span>
                                    <input
                                        type="time"
                                        name="beginTime"
                                        value={beginTime}
                                        onChange={onChangeInputBeginTime}
                                        required
                                    />
                                </div>

                                <div>
                                    <span className="lesson_create__form__label">
                                        종료 시간
                                    </span>
                                    <input
                                        type="time"
                                        name="endTime"
                                        value={endTime}
                                        min={beginTime}
                                        onChange={onChangeInputEndTime}
                                        required
                                    />
                                </div>

                                <div>
                                    <Button
                                        onClick={handleClose}
                                        color="primary"
                                    >
                                        취소
                                    </Button>
                                    <Button
                                        type="submit"
                                        onClick={onClickBtnOk}
                                        color="primary"
                                    >
                                        확인
                                    </Button>
                                </div>
                            </form>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {/* <Button autoFocus onClick={handleClose} color="primary">
						취소
					</Button>
					<Button onClick={handleSubmit} color="primary">
						생성
					</Button> */}
                    </DialogActions>
                </Dialog>

                <Calendar
                    selectable={true}
                    localizer={localizer}
                    events={lessonList}
                    step={60}
                    view="month"
                    views={["month"]}
                    startAccessor="start"
                    endAccessor="end"
                    // defaultDate={moment().toDate()}
                    defaultDate={new Date(yearMonth)}
                    localizer={localizer}
                    culture="ko"
                    onSelectEvent={onSelectEvent}
                    onSelectSlot={onSelectSlot}
                    onNavigate={onNavigateCalendar}
                />
            </div>

            {selectedDate === "" ? (
                ""
            ) : (
                <SelectedLessonList
                    userType={userType}
                    selectedDate={selectedDate}
                    selectedLessons={selectedLessons}
                    joinedAcademyList={joinedAcademyList}
                    joinedClassroomList={joinedClassroomList}
                    yearMonth={yearMonth}
                />
            )}
        </>
    );
});

export default LessonCalendar_T;
