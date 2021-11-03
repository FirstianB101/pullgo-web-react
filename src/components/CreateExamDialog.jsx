import React, { useState, memo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

const PaperComponent = memo((props) => {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
});

/* Date 객체를 인자로 받아서 "2021-08-09" 형식의 string으로 반환 */
const dateToStr = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
};

const CreateExamDialog = ({
    createExamDialogOpen,
    setCreateExamDialogOpen,
    match
}) => {
    // 시험 추가 Dialog form 요소 state들
    const [examName, setExamName] = useState("");
    // BeginDateTime 분해 => BeginDate, BeginTime
    const [beginDate, setBeginDate] = useState("");
    const [beginTime, setBeginTime] = useState("");
    // EndDateTime 분해 => EndDate, EndTime
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    // TimeLimit 분해 => TimeLimitHour, TimeLimitMinute
    const [timeLimitHour, setTimeLimitHour] = useState("");
    const [timeLimitMinute, setTimeLimitMinute] = useState("");
    const [passScore, setPassScore] = useState("");

    const handleClose = () => {
        // 시험 추가 Dialog form Input state들 초기화
        setExamName("");
        setBeginDate("");
        setBeginTime("");
        setEndDate("");
        setEndTime("");
        setTimeLimitHour("");
        setTimeLimitMinute("");
        setPassScore("");

        setCreateExamDialogOpen(false);
    };

    const onChangeInputExamName = (e) => {
        setExamName(e.target.value);
    };

    const onChangeInputBeginDate = (e) => {
        setBeginDate(e.target.value);
    };

    const onChangeInputBeginTime = (e) => {
        setBeginTime(e.target.value);
    };

    const onChangeInputEndDate = (e) => {
        setEndDate(e.target.value);
    };

    const onChangeInputEndTime = (e) => {
        setEndTime(e.target.value);
    };

    const onChangeInputTimeLimitHour = (e) => {
        setTimeLimitHour(e.target.value);
    };

    const onChangeInputTimeLimitMinute = (e) => {
        setTimeLimitMinute(e.target.value);
    };

    const onChangeInputPassScore = (e) => {
        setPassScore(e.target.value);
    };

    const classroomId = match?.params?.classroomId;
    const creatorId = useSelector((state) => state.teacherIdReducer.teacherId);
    const authToken = useSelector((state) => state.authTokenReducer.authToken);

    /* 시험 추가 Dialog Form Submit */
    const onSubmitForm = async (e) => {
        // e.preventDefault();

        const postCreateExam = async () => {
            const parsedBeginDateTime = `${beginDate}T${beginTime}:00`;
            const parsedEndDateTime = `${endDate}T${endTime}:00`;
            let parsedTimeLimit = "PT";
            if (timeLimitHour != "0") parsedTimeLimit += `${timeLimitHour}H`;
            if (timeLimitMinute != "0")
                parsedTimeLimit += `${timeLimitMinute}M`;

            try {
                const response = await axios.post(
                    `/v1/exams`,
                    {
                        classroomId,
                        creatorId,
                        name: examName,
                        beginDateTime: parsedBeginDateTime,
                        endDateTime: parsedEndDateTime,
                        timeLimit: parsedTimeLimit,
                        passScore
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    }
                );

                if (response.data != undefined)
                    alert("시험 추가가 완료되었습니다.");
            } catch (e) {
                alert("시험 추가 오류");
                console.log(e);
            }
        };

        let confirmCreateExam = window.confirm("시험을 추가 하시겠습니까?");
        if (confirmCreateExam) {
            await postCreateExam();

            // 페이지 새로고침 => 향후 문제 출제 페이지로 이동할 것
            window.location.replace(`/teacher/manage_exam/${classroomId}`);
        }

        // 시험 추가 form state들 초기화
        setExamName("");
        setBeginDate("");
        setBeginTime("");
        setEndDate("");
        setEndTime("");
        setTimeLimitHour("");
        setTimeLimitMinute("");
        setPassScore("");

        setCreateExamDialogOpen(false);
    };

    return (
        <div className="create_exam_dialog">
            <Dialog
                open={createExamDialogOpen}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle
                    style={{ cursor: "move" }}
                    id="draggable-dialog-title"
                >
                    시험 추가
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <form
                            className="exam_create__form"
                            onSubmit={onSubmitForm}
                        >
                            <div>
                                <span className="exam_create__form__label">
                                    시험 이름
                                </span>
                                <input
                                    type="text"
                                    name="exam_name"
                                    value={examName}
                                    onChange={onChangeInputExamName}
                                    required
                                />
                            </div>

                            <div>
                                <span className="exam_create__form__label">
                                    시험 시작 일시
                                </span>
                                <input
                                    type="date"
                                    name="begin_date"
                                    value={beginDate}
                                    onChange={onChangeInputBeginDate}
                                    min={dateToStr(new Date())}
                                    required
                                />
                                <input
                                    type="time"
                                    name="begin_time"
                                    value={beginTime}
                                    onChange={onChangeInputBeginTime}
                                    required
                                />
                            </div>

                            <div>
                                <span className="exam_create__form__label">
                                    시험 종료 일시
                                </span>
                                <input
                                    type="date"
                                    name="end_date"
                                    value={endDate}
                                    onChange={onChangeInputEndDate}
                                    min={beginDate}
                                    required
                                />
                                <input
                                    type="time"
                                    name="end_time"
                                    value={endTime}
                                    onChange={onChangeInputEndTime}
                                    required
                                />
                            </div>

                            <div>
                                <span className="exam_create__form__label">
                                    제한 시간
                                </span>
                                <input
                                    type="number"
                                    name="time_limit_hour"
                                    value={timeLimitHour}
                                    onChange={onChangeInputTimeLimitHour}
                                    min={0}
                                    max={24}
                                    // placeholder="시간(hour)"
                                    required
                                />
                                <span>시간</span>
                                <input
                                    type="number"
                                    name="time_limit_minute"
                                    value={timeLimitMinute}
                                    onChange={onChangeInputTimeLimitMinute}
                                    min={0}
                                    max={60}
                                    // placeholder="분(minute)"
                                    required
                                />
                                <span>분</span>
                            </div>

                            <div>
                                <span className="exam_create__form__label">
                                    기준 점수
                                </span>
                                <input
                                    type="number"
                                    name="pass_score"
                                    value={passScore}
                                    onChange={onChangeInputPassScore}
                                    min={0}
                                    required
                                />
                            </div>

                            <div className="buttons__confirm_cancel">
                                <Button onClick={handleClose} color="primary">
                                    취소
                                </Button>
                                <Button type="submit" color="primary">
                                    확인
                                </Button>
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateExamDialog;
