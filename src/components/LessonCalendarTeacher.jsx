import React, { useState } from "react";
// import BigCalendar from "react-big-calendar";
// import { Calendar, dateFnsLocalizer, momentLocalizer } from "react-big-calendar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ko";
import events from "../module/events";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

// moment.locale("en-GB");
// BigCalendar.momentLocalizer(moment);

function getTodayDateStr() {
	let today = new Date();

	let year = today.getFullYear();
	let month = ('0' + (today.getMonth() + 1)).slice(-2);
	let day = ('0' + today.getDate()).slice(-2);

	return year + '-' + month + '-' + day;
}

function dateToStr(date) {
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	if (month < 10) month = "0" + month;
	month = parseInt(month);

	let day = date.getDate();
	if (day < 10) day = "0" + day;
	day = parseInt(day);

	// let hour = date.getHours();
	// if(hour < 10) hour = '0' + hour;

	// let min = date.getMinutes();
	// if(min < 10) min = '0' + min;

	// let sec = date.getSeconds();
	// if(sec < 10) sec = '0' + sec;

	// return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;

	return { year, month, day };
}

// let selectingStart = false;
// let selectingEnd = false;

function PaperComponent(props) {
	return (
		<Draggable
			handle="#draggable-dialog-title"
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper {...props} />
		</Draggable>
	);
}

const LessonCalendarTeacher = () => {
	const localizer = momentLocalizer(moment);
	// const localizer = BigCalendar.momentLocalizer(moment);

	// 일정 추가
	const onSelectSlot = (e) => {
		console.log(e.slots[0]); // click한 날짜

		// if (selectingStart) {
		//     console.log(dateToStr(e.slots[0]));

		//     hh = prompt("일정 시작 시간(h)");
		// }

		// if (selectingEnd) {

		// }
	};

	// 등록된 수업 일정 수정
	const onSelectEvent = (e) => {
		console.log(e);			// 등록된 수업 일정 등 클릭 시
	};

	const onClickBtn = (e) => {
		console.log("open Modal");

		// title = prompt("일정 제목: ", "일정");
		// allDay = window.confirm("하루 종일 지속");

		// selectingStart = true;
		// selectingEnd = true;

		// console.log(title, allDay, selectingStart, selectingEnd);
	};

	const [classRoom, setClassRoom] = useState();	// 반 이름
	const [title, setTitle] = useState();			// 수업 이름
	const [date, setDate] = useState();				// 날짜
	const [start, setStart] = useState();			// 시작 시각
	const [end, setEnd] = useState();				// 종료 시각
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// 수업 생성 Form 입력 값들 유효 확인 및 서버로 전송, 캘린더에 수업 추가
	const onSubmitForm = () => {
		console.log("Form Send or Not");
		setOpen(false);
	};

	const onChangeSelectClassRoom = (e) => {
		setClassRoom(e.target.value);
	};

	const onChangeInputTitle = (e) => {
		setTitle(e.target.value);
	};

	const onChangeInputDate = (e) => {
		setDate(e.target.value);
	};

	return (
		<div style={{ height: "500pt" }}>
			<h2 className="calendar_title">수업 일정</h2>
			{/* <button onClick={onClickBtn}>일정 추가</button> */}
			<Button
				variant="outlined"
				color="primary"
				onClick={handleClickOpen}
			>
				수업 추가
			</Button>

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
					수업 생성
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<form className="lesson_create__form" onSubmit={onSubmitForm}>
							반
							<select name="classRoom" value={classRoom}
								onChange={onChangeSelectClassRoom} required>
								<option value="">반 선택</option>
								<option value="high_2_math">고2 이과</option>
								<option value="high_3_math">고3 이과</option>
							</select>
							<br />

							수업 이름
							<input
								type="text"
								name="title"
								value={title}
								onChange={onChangeInputTitle}
								required
							/>
							<br />

							날짜
							<input
								type="date"
								name="date"
								min={getTodayDateStr()}
								value={date}
								onChange={onChangeInputDate}
								required
							/>
							<br />

							시작 시각, 종료 시각
							<br /><br />

							<Button autoFocus onClick={handleClose} color="primary">
								취소
							</Button>
							<Button type="submit" color="primary">
								생성
							</Button>
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
				events={events}
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

export default LessonCalendarTeacher;
