import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchJoinedClassroomList } from "../redux/fetchJoinedClassroomList";
import { apiFetchLessonList } from "../redux/fetchLessonList";
import SelectedLessonList from "./SelectedLessonList";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ko";

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

/* Date 객체를 인자로 받아서 sinceDate (문자열) 반환
 * e.g. getSinceDate(2021-09-09 Date 객체)
 * => sinceDate: "2021-09-01"
 */
const getSinceDate = (date) => {
	let yearStr = String(date.getFullYear());
	let monthStr = String(date.getMonth() + 1);
	monthStr = monthStr.length === 1 ? "0" + monthStr : monthStr;

	let sinceDate = yearStr + "-" + monthStr + "-01";
	return sinceDate;
};

/* Date 객체를 인자로 받아서 untilDate (문자열) 반환
 * e.g. getUntilDate(2021-09-09 Date 객체)
 * => untilDate: "2021-10-01"
 */
const getUntilDate = (date) => {
	let year = date.getFullYear();
	let month = date.getMonth() + 2;
	month = month > 12 ? 1 : month;

	let yearStr = String(year);
	let monthStr = String(month);
	monthStr = monthStr.length === 1 ? "0" + monthStr : monthStr;

	let untilDate = yearStr + "-" + monthStr + "-01";
	return untilDate;
};

/* classroomId로 classroomName 검색 */
const getClassroomName = (classroomList, classroomId) => {
	return classroomList.find((classroom) => classroom.id === classroomId)
		?.name;
};

const LessonCalendar_S = memo(() => {
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
	const studentId = useSelector((state) => state.studentIdReducer.studentId);

	// 캘린더 선택(클릭) 일자, 선택한 일자에 등록된 수업들
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedLessons, setSelectedLessons] = useState(null);

	// 현재 보고있는 일자 => onNavigate()와 sinceDate, untilDate에 사용
	const [watchingDate, setWatchingDate] = useState(new Date());

	useEffect(() => {
		console.log("LessonCalendar_S 렌더링");
		console.log(`studentId ${studentId}번 학생의 등록된 수업 fetch`);

		onFetchLessonList(
			userType,
			studentId,
			getSinceDate(watchingDate),
			getUntilDate(watchingDate)
		);
		onFetchJoinedAcademyList(userType, studentId);
		onFetchJoinedClassroomList(userType, studentId);
	}, []);

	useEffect(() => {
		onFetchLessonList(
			userType,
			studentId,
			getSinceDate(watchingDate),
			getUntilDate(watchingDate)
		);
		onFetchJoinedClassroomList(userType, studentId);
	}, [studentId]);

	useEffect(() => {
		onFetchLessonList(
			userType,
			studentId,
			getSinceDate(watchingDate),
			getUntilDate(watchingDate)
		);
	}, [watchingDate]);

	const joinedAcademyList = useSelector(
		(state) => state.joinedAcademyListReducer.joinedAcademyList
	);
	const joinedClassroomList = useSelector(
		(state) => state.joinedClassroomListReducer.joinedClassroomList
	);
	const lessonList = useSelector(
		(state) => state.lessonListReducer.lessonList
	);

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

	/* Calendar 상단의 Today, Back, Next 버튼 클릭하여 월 이동 */
	const onNavigateCalendar = (e) => {
		// e: Date 객체
		setWatchingDate(e);
	};

	return (
		<>
			<div className="div__calendar" style={{ height: "500pt" }}>
				<h2 className="calendar_title">학생 수업 일정</h2>

				<Calendar
					selectable={true}
					localizer={localizer}
					events={lessonList}
					step={60}
					view="month"
					views={["month"]}
					// min={new Date(2008, 0, 1, 8, 0)} // 8:00 AM
					// max={new Date(2008, 0, 1, 17, 0)} // 6:00 PM
					// date={new Date(2018, 0, 1)}
					startAccessor="start"
					endAccessor="end"
					defaultDate={moment().toDate()}
					localizer={localizer}
					culture="ko"
					onSelectSlot={onSelectSlot}
					onNavigate={onNavigateCalendar}
					// eventPropGetter={eventStyleGetter}
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
				/>
			)}
		</>
	);
});

export default LessonCalendar_S;
