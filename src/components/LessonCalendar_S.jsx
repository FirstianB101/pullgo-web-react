import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ko";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

import events from "../module/events";

// 서버에서 수업 목록 Fetch
let lessons = events;

// Date 객체를 인자로 받아서 "2021-08-09" 형식의 string으로 반환
const dateToStr = (date) => {
	let year = date.getFullYear();
	let month = ("0" + (date.getMonth() + 1)).slice(-2);
	let day = ("0" + date.getDate()).slice(-2);

	return year + "-" + month + "-" + day;
};

// state인 date("2021-08-09" 형태)와
// state인 시간을 나타내는 start 또는 end("14:05" 형태)를 인자로 받아서
// 날짜 + 시간 형태의 Date 객체로 반환
const dateWithTime = (date, time) => {
	let year = date.slice(0, 4);
	let month = date.slice(5, 7);
	let day = date.slice(8, 10);

	// 시간 분해
	let hour = time.slice(0, 2);
	let min = time.slice(3, 5);

	return new Date(year, month - 1, day, hour, min);
};

const PaperComponent = (props) => {
	return (
		<Draggable
			handle="#draggable-dialog-title"
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper {...props} />
		</Draggable>
	);
};

const LessonCalendar_S = () => {
	// const [lessons, setLessons] = useState(); // 등록된 수업들(배열)
	const [classroom, setClassroom] = useState(); // 반 이름
	const [title, setTitle] = useState(); // 수업 이름
	const [date, setDate] = useState(); // 날짜
	const [start, setStart] = useState(); // 시작 시간
	const [end, setEnd] = useState(); // 종료 시간
	const [open, setOpen] = useState(false);

	const localizer = momentLocalizer(moment);

	const fetchLessons = async () => {
		try {
			const response = await axios({
				method: "GET",
				url: "/v1/academy/classroom/lessons"
			});

			// setLessons(response.data);
			console.log(response.data);
		} catch (e) {
			console.log("fetchLessons() Error");
		}
	};

	// componentDidMount() 역할, 최초 렌더링 시에 실행
	useEffect(() => {
		fetchLessons();
	}, []);

	// componentDidUpdate() 역할, props나 state 변화 시에 실행
	// useEffect(() => {

	// }, [state]);

	// 수업 추가(날짜 선택)
	const onSelectSlot = (e) => {
		console.log(dateToStr(e.slots[0])); // click한 날짜
		setDate(dateToStr(e.slots[0]));
		setOpen(true);
	};

	// 등록된 수업 일정 수정
	const onSelectEvent = (e) => {
		console.log(e); // 등록된 수업 일정 등 클릭 시
	};

	const onClickBtn = (e) => {
		console.log("수업 추가");
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// 수업 생성 Form 입력 값들 유효 확인 및 서버로 전송, 캘린더에 수업 추가
	const onSubmitForm = (e) => {
		e.preventDefault();

		// 캘린더에 수업 추가
		let newLesson = {
			id: lessons[lessons.length - 1].id + 1,
			classroom,
			title,
			allDay: true,
			start: dateWithTime(date, start),
			end: dateWithTime(date, end)
		};

		// state인 start, end는 시간 형식의 string,
		// Calendar에 들어가는 start, end는 날짜 + 시간 형식의 Date 객체

		lessons = [...lessons, newLesson];

		// 서버에 수업 추가 전송
		console.log("Send to Server");

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

	const onChangeInputStart = (e) => {
		setStart(e.target.value);
	};

	const onChangeInputEnd = (e) => {
		setEnd(e.target.value);
	};

	return (
		<div className="div__calendar" style={{ height: "500pt" }}>
			<h2 className="calendar_title">학생 수업 일정</h2>
			{/* <button onClick={onClickBtn}>일정 추가</button> */}
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
									<option value="high_2_math">
										고2 이과
									</option>
									<option value="high_3_math">
										고3 이과
									</option>
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
									// min={getTodayDateStr()}
									min={dateToStr(new Date())}
									value={date}
									onChange={onChangeInputDate}
									required
								/>
							</div>

							<div>
								<span className="lesson_create__form__label">
									시작 시간
								</span>
								<input
									type="time"
									name="start"
									value={start}
									onChange={onChangeInputStart}
									required
								/>
							</div>

							<div>
								<span className="lesson_create__form__label">
									종료 시간
								</span>
								<input
									type="time"
									name="start"
									value={end}
									min={start}
									onChange={onChangeInputEnd}
									required
								/>
							</div>

							<div>
								<Button onClick={handleClose} color="primary">
									취소
								</Button>
								<Button
									type="submit"
									onClick={onClickBtn}
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
				events={lessons}
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
				onSelectEvent={onSelectEvent}
				onSelectSlot={onSelectSlot}
				// eventPropGetter={eventStyleGetter}
			/>
		</div>
	);
};

export default LessonCalendar_S;
