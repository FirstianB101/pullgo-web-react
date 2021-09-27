import React, { useState, useEffect, useRef, memo } from "react";
import axios from "axios";

import ExamAttenderStatus from "./ExamAttenderStatus";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

/* Date 객체를 인자로 받아서 "2021-08-09" 형식의 string으로 반환 */
const dateToStr = (date) => {
	let year = date.getFullYear();
	let month = ("0" + (date.getMonth() + 1)).slice(-2);
	let day = ("0" + date.getDate()).slice(-2);
	return year + "-" + month + "-" + day;
};

/* exam 1개를 인자로 받아서 exam 정보 속성들을 파싱해서 객체로 return */
const parsingExamInfo = (exam) => {
	const examId = exam.id;
	const examName = exam.name;
	const beginDateTime = exam.beginDateTime
		.replaceAll("-", "/")
		.replace("T", " ")
		.substring(0, 16);
	const endDateTime = exam.endDateTime
		.replaceAll("-", "/")
		.replace("T", " ")
		.substring(0, 16);
	let timeLimit = exam.timeLimit.replace("PT", "");
	timeLimit = timeLimit.includes("S")
		? timeLimit.substring(0, timeLimit.indexOf("M") + 1) // "S" (초) 제거
		: timeLimit;
	timeLimit = timeLimit.replace("H", "시간 ").replace("M", "분").trim();
	const passScore = exam.passScore;
	const cancelled = exam.cancelled;
	const finished = exam.finished;

	return {
		examId,
		examName,
		beginDateTime,
		endDateTime,
		timeLimit,
		passScore,
		cancelled,
		finished
	};
};

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

const ManageExamList = ({ examList, classroomId }) => {
	// 시험 클릭 여부(시험 응시현황 보기 확장 여부)
	const [isAttenderStatusOpened, setIsAttenderStatusOpened] = useState([]);
	// 시험 수정 선택한 시험의 examId
	const [selectedExamId, setSelectedExamId] = useState("");
	const [open, setOpen] = useState(false);

	// 시험 수정 전 state들
	const [beforeEditExamName, setBeforeEditExamName] = useState("");
	const [beforeEditBeginDateTime, setBeforeEditBeginDateTime] = useState("");
	const [beforeEditEndDateTime, setBeforeEditEndDateTime] = useState("");
	const [beforeEditTimeLimit, setBeforeEditTimeLimit] = useState("");
	const [beforeEditPassScore, setBeforeEditPassScore] = useState("");

	// 시험 수정 Dialog form 요소 state들
	const [editedExamName, setEditedExamName] = useState("");
	// BeginDateTime 분해 => BeginDate, BeginTime
	const [editedBeginDate, setEditedBeginDate] = useState("");
	const [editedBeginTime, setEditedBeginTime] = useState("");
	// EndDateTime 분해 => EndDate, EndTime
	const [editedEndDate, setEditedEndDate] = useState("");
	const [editedEndTime, setEditedEndTime] = useState("");
	// TimeLimit 분해 => TimeLimitHour, TimeLimitMinute
	const [editedTimeLimitHour, setEditedTimeLimitHour] = useState("");
	const [editedTimeLimitMinute, setEditedTimeLimitMinute] = useState("");
	const [editedPassScore, setEditedPassScore] = useState("");

	const liExamInfoRefs = useRef([]);
	const btnEditExamRefs = useRef([]);
	// const btnDeleteExamRefs = useRef([]);
	const btnFinishExamRefs = useRef([]);
	const btnCancelExamRefs = useRef([]);

	/* isAttenderStatusOpened state 초기화 (examList 길이만큼 false로 채운 배열) */
	useEffect(() => {
		const isAttenderStatusOpenedArr = examList.map((exam) => false);
		setIsAttenderStatusOpened([...isAttenderStatusOpenedArr]);
	}, [examList]);

	const showExamListItems = () => {
		const listItems = [];

		for (let i = 0; i < examList.length; i++) {
			const examInfo = parsingExamInfo(examList[i]);

			const element = (
				<div className="div__exam_list_menu">
					<li
						key={examList[i].id}
						ref={(elem) => (liExamInfoRefs.current[i] = elem)}
						onClick={(e) => onClickExamInfo(i, e)}
					>
						{/* 시험 정보 */}
						<div className="exam_list_info">
							<span className="exam_name">
								{examInfo.examName}
							</span>
							<span className="begin_end_date_time">
								{examInfo.beginDateTime} ~{" "}
								{examInfo.endDateTime}
							</span>
							<span className="time_limit">
								제한 시간: {examInfo.timeLimit}
							</span>
							<span className="pass_score">
								기준 점수: {examInfo.passScore}점
							</span>
							<span className="cancelled">
								{examInfo.cancelled
									? "시험이 취소 되었습니다."
									: ""}
							</span>
							<span className="finished">
								{examInfo.finished
									? "시험이 종료 되었습니다."
									: ""}
							</span>
						</div>

						{/* 시험 응시 현황 */}
						<div className="exam_list_attender_status">
							{isAttenderStatusOpened[i] ? (
								<ExamAttenderStatus
									examId={examInfo.examId}
									examName={examInfo.examName}
								/>
							) : (
								""
							)}
						</div>
					</li>

					<div className="div__exam_list_menu_buttons">
						{/* 시험 수정 */}
						<button
							onClick={(e) =>
								onClickBtnEditExam(examList[i].id, i, e)
							}
							ref={(elem) => (btnEditExamRefs.current[i] = elem)}
						>
							📝
						</button>

						{/* 시험 삭제 */}
						{/* <button
							onClick={(e) =>
								onClickBtnDeleteExam(examList[i].id, i, e)
							}
							ref={(elem) =>
								(btnDeleteExamRefs.current[i] = elem)
							}
						>
							❌
						</button> */}

						{/* 시험 종료 */}
						<button
							onClick={(e) =>
								onClickBtnFinishExam(examList[i].id, i, e)
							}
							ref={(elem) =>
								(btnFinishExamRefs.current[i] = elem)
							}
						>
							✔️
						</button>

						{/* 시험 취소 */}
						<button
							onClick={(e) =>
								onClickBtnCancelExam(examList[i].id, i, e)
							}
							ref={(elem) =>
								(btnCancelExamRefs.current[i] = elem)
							}
						>
							🚫
						</button>
					</div>
				</div>
			);

			listItems.push(element);
		}

		return listItems;
	};

	const onClickExamInfo = (refIndex, e) => {
		const isAttenderStatusOpenedArr = [...isAttenderStatusOpened];
		isAttenderStatusOpenedArr[refIndex] =
			!isAttenderStatusOpenedArr[refIndex];

		setIsAttenderStatusOpened([...isAttenderStatusOpenedArr]);
	};

	/* 시험 수정 button 📝 클릭 => 시험 수정 Dialog Open */
	const onClickBtnEditExam = (examId, refIndex, e) => {
		const examInfo = parsingExamInfo(examList[refIndex]);

		// 시험 수정 전 ExamInfo state들 저장
		setBeforeEditExamName(examInfo.examName);
		setBeforeEditBeginDateTime(examInfo.beginDateTime);
		setBeforeEditEndDateTime(examInfo.endDateTime);
		setBeforeEditTimeLimit(examInfo.timeLimit);
		setBeforeEditPassScore(examInfo.passScore);

		// 시험 수정 입력 form 요소들의 state들 지정
		setEditedExamName(examInfo.examName);
		setEditedBeginDate(
			examInfo.beginDateTime.split(" ")[0].replaceAll("/", "-")
		);
		setEditedBeginTime(examInfo.beginDateTime.split(" ")[1]);
		setEditedEndDate(
			examInfo.endDateTime.split(" ")[0].replaceAll("/", "-")
		);
		setEditedEndTime(examInfo.endDateTime.split(" ")[1]);
		setEditedPassScore(examInfo.passScore);

		let timeLimitHour = examInfo.timeLimit.includes("시간")
			? examInfo.timeLimit.substring(
					0,
					examInfo.timeLimit.indexOf("시간")
			  )
			: 0;
		let timeLimitMinute;
		if (!examInfo.timeLimit.includes("분")) timeLimitMinute = 0;
		else if (!examInfo.timeLimit.includes("시간")) {
			// "00분"
			timeLimitMinute = examInfo.timeLimit.substring(
				0,
				examInfo.timeLimit.indexOf("분")
			);
		} else {
			// "0시간 00분"
			timeLimitMinute = examInfo.timeLimit.substring(
				examInfo.timeLimit.indexOf("시간") + 3,
				examInfo.timeLimit.indexOf("분")
			);
		}

		setEditedTimeLimitHour(timeLimitHour);
		setEditedTimeLimitMinute(timeLimitMinute);

		setSelectedExamId(examId);
		setOpen(true);
	};

	/* 시험 삭제 button ❌ 클릭 */
	// const onClickBtnDeleteExam = async (examId, refIndex, e) => {
	// 	const examInfo = parsingExamInfo(examList[refIndex]);

	// 	const deleteExam = async (examId) => {
	// 		try {
	// 			const response = await axios.delete(`/v1/exams/${examId}`);

	// 			if (response.data != undefined)
	// 				alert("시험이 삭제 되었습니다.");
	// 		} catch (e) {
	// 			alert("시험 삭제 오류");
	// 			console.log(e);
	// 		}
	// 	};

	// 	let confirmDeleteExam = window.confirm(
	// 		`${examInfo.examName} 시험(${examInfo.beginDateTime} ~ ${examInfo.endDateTime})을 삭제 하시겠습니까?`
	// 	);
	// 	if (confirmDeleteExam) {
	// 		await deleteExam(examId);

	// 		// 페이지 새로고침
	// 		window.location.replace(`/teacher/manage_exam/${classroomId}`);
	// 	}
	// };

	/* 시험 종료 button ✔️ 클릭 */
	const onClickBtnFinishExam = async (examId, refIndex, e) => {
		const examInfo = parsingExamInfo(examList[refIndex]);

		const finishExam = async (examId) => {
			try {
				const response = await axios.post(`/v1/exams/${examId}/finish`);

				if (response.data != undefined)
					alert("시험이 종료 되었습니다.");
			} catch (e) {
				// alert("시험 종료 오류");
				alert("이미 종료되거나 취소된 시험입니다.");
				console.log(e);
			}
		};

		let confirmFinishExam = window.confirm(
			`${examInfo.examName} 시험(${examInfo.beginDateTime} ~ ${examInfo.endDateTime})을 종료 하시겠습니까?`
		);
		if (confirmFinishExam) {
			await finishExam(examId);

			// 페이지 새로고침
			window.location.replace(`/teacher/manage_exam/${classroomId}`);
		}
	};

	/* 시험 취소 button 🚫 클릭 */
	const onClickBtnCancelExam = async (examId, refIndex, e) => {
		const examInfo = parsingExamInfo(examList[refIndex]);

		const cancelExam = async (examId) => {
			try {
				const response = await axios.post(`/v1/exams/${examId}/cancel`);

				if (response.data != undefined)
					alert("시험이 취소 되었습니다.");
			} catch (e) {
				// alert("시험 취소 오류");
				alert("이미 종료되거나 취소된 시험입니다.");
				console.log(e);
			}
		};

		let confirmCancelExam = window.confirm(
			`${examInfo.examName} 시험(${examInfo.beginDateTime} ~ ${examInfo.endDateTime})을 취소 하시겠습니까?`
		);
		if (confirmCancelExam) {
			await cancelExam(examId);

			// 페이지 새로고침
			window.location.replace(`/teacher/manage_exam/${classroomId}`);
		}
	};

	const handleClose = () => {
		// 변경할 ExamInfo Input state들 초기화
		setEditedExamName("");
		setEditedBeginDate("");
		setEditedBeginTime("");
		setEditedEndDate("");
		setEditedEndTime("");
		setEditedTimeLimitHour("");
		setEditedTimeLimitMinute("");
		setEditedPassScore("");

		setSelectedExamId("");
		setOpen(false);
	};

	/* 수업 수정 Dialog Form Submit */
	const onSubmitForm = async (e) => {
		e.preventDefault();
		console.log(`selectedExamId: ${selectedExamId}`);

		const patchEditExam = async (examId) => {
			const parsedBeginDateTime = `${editedBeginDate}T${editedBeginTime}:00`;
			const parsedEndDateTime = `${editedEndDate}T${editedEndTime}:00`;
			let parsedTimeLimit = "PT";
			if (editedTimeLimitHour != "0")
				parsedTimeLimit += `${editedTimeLimitHour}H`;
			if (editedTimeLimitMinute != "0")
				parsedTimeLimit += `${editedTimeLimitMinute}M`;

			try {
				const response = await axios.patch(`/v1/exams/${examId}`, {
					name: editedExamName,
					beginDateTime: parsedBeginDateTime,
					endDateTime: parsedEndDateTime,
					timeLimit: parsedTimeLimit,
					passScore: editedPassScore
				});

				if (response.data != undefined)
					alert("시험이 수정 되었습니다.");
			} catch (e) {
				alert("시험 수정 오류");
				console.log(e);
			}
		};

		const parsedEditedBeginDateTime =
			editedBeginDate.replaceAll("-", "/") + ` ${editedBeginTime}`;
		const parsedEditedEndDateTime =
			editedEndDate.replaceAll("-", "/") + ` ${editedEndTime}`;
		let parsedEditedTimeLimit = "";
		if (editedTimeLimitHour != "0")
			parsedEditedTimeLimit += `${editedTimeLimitHour}시간 `;
		if (editedTimeLimitMinute != "0")
			parsedEditedTimeLimit += `${editedTimeLimitMinute}분`;
		parsedEditedTimeLimit = parsedEditedTimeLimit.trim();

		if (
			beforeEditExamName === editedExamName &&
			beforeEditBeginDateTime === parsedEditedBeginDateTime &&
			beforeEditEndDateTime === parsedEditedEndDateTime &&
			beforeEditTimeLimit === parsedEditedTimeLimit &&
			beforeEditPassScore == editedPassScore
		) {
			alert("수정된 사항이 없습니다.");
			return;
		}

		let confirmPatchEditExam = window.confirm(
			`${editedExamName} 시험(${parsedEditedBeginDateTime} ~ ${parsedEditedEndDateTime}), 제한 시간 ${parsedEditedTimeLimit}, 기준 점수 ${editedPassScore}으로 수정 하시겠습니까?`
		);
		if (confirmPatchEditExam) {
			await patchEditExam(selectedExamId);

			// 페이지 새로고침
			window.location.replace(`/teacher/manage_exam/${classroomId}`);
		}
	};

	const onChangeInputExamName = (e) => {
		setEditedExamName(e.target.value);
	};

	const onChangeInputBeginDate = (e) => {
		setEditedBeginDate(e.target.value);
	};

	const onChangeInputBeginTime = (e) => {
		setEditedBeginTime(e.target.value);
	};

	const onChangeInputEndDate = (e) => {
		setEditedEndDate(e.target.value);
	};

	const onChangeInputEndTime = (e) => {
		setEditedEndTime(e.target.value);
	};

	const onChangeInputTimeLimitHour = (e) => {
		setEditedTimeLimitHour(e.target.value);
	};

	const onChangeInputTimeLimitMinute = (e) => {
		setEditedTimeLimitMinute(e.target.value);
	};

	const onChangeInputPassScore = (e) => {
		setEditedPassScore(e.target.value);
	};

	return (
		<div className="div__manage_exam_list">
			<ul className="ul__exam_list">{showExamListItems()}</ul>

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
					시험 수정
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<form
							className="exam_edit__form"
							onSubmit={onSubmitForm}
						>
							<div>
								<span className="exam_edit__form__label">
									시험 이름
								</span>
								<input
									type="text"
									name="exam_name"
									value={editedExamName}
									onChange={onChangeInputExamName}
								/>
							</div>

							<div>
								<span className="exam_edit__form__label">
									시험 시작 일시
								</span>
								<input
									type="date"
									name="begin_date"
									value={editedBeginDate}
									onChange={onChangeInputBeginDate}
									min={dateToStr(new Date())}
									required
								/>
								<input
									type="time"
									name="begin_time"
									value={editedBeginTime}
									onChange={onChangeInputBeginTime}
									required
								/>
							</div>

							<div>
								<span className="lesson_edit__form__label">
									시험 종료 일시
								</span>
								<input
									type="date"
									name="end_date"
									value={editedEndDate}
									onChange={onChangeInputEndDate}
									min={editedBeginDate}
									required
								/>
								<input
									type="time"
									name="end_time"
									value={editedEndTime}
									onChange={onChangeInputEndTime}
									required
								/>
							</div>

							<div>
								<span className="lesson_edit__form__label">
									제한 시간
								</span>
								<input
									type="number"
									name="time_limit_hour"
									value={editedTimeLimitHour}
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
									value={editedTimeLimitMinute}
									onChange={onChangeInputTimeLimitMinute}
									min={0}
									max={60}
									// placeholder="분(minute)"
									required
								/>
								<span>분</span>
							</div>

							<div>
								<span className="lesson_edit__form__label">
									기준 점수
								</span>
								<input
									type="number"
									name="pass_score"
									value={editedPassScore}
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

export default ManageExamList;
