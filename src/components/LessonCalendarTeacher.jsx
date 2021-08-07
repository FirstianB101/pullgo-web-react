import React, { useState } from "react";
// import BigCalendar from "react-big-calendar";
// import { Calendar, dateFnsLocalizer, momentLocalizer } from "react-big-calendar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ko";
// import events from "../module/events";

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

let events = [
	{
		title: "[고2 이과] 미적분2",
		allDay: true,
		start: new Date(2021, 6, 4, 12, 0), // 1월: 0
		end: new Date(2021, 6, 4, 14, 0) // 년, 월, 일, 시, 분
	},
	{
		title: "[고3 이과] 확통",
		allDay: true,
		start: new Date(2021, 6, 7, 10, 0),
		end: new Date(2021, 6, 7, 14, 0)
	}
];

let title, allDay;
let start, end;

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

	// 일정 추가: start, end 선택
	const onSelectSlot = (e) => {
		console.log(e.slots[0]); // click한 날짜

		let startDate, endDate;
		let hh, mm;

		// if (selectingStart) {
		//     console.log(dateToStr(e.slots[0]));

		//     hh = prompt("일정 시작 시간(h)");
		// }

		// if (selectingEnd) {

		// }
	};

	const onSelectEvent = (e) => {
		// console.log(e.title);
		console.log(e);
	};

	const onClickBtn = (e) => {
		console.log("open Modal");

		// title = prompt("일정 제목: ", "일정");
		// allDay = window.confirm("하루 종일 지속");

		// selectingStart = true;
		// selectingEnd = true;

		// console.log(title, allDay, selectingStart, selectingEnd);
	};

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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
					Subscribe
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email
						address here. We will send updates occasionally.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClose} color="primary">
						Subscribe
					</Button>
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
