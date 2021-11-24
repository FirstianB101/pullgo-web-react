import React, { useState, useRef, memo } from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
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

const SelectedLessonList = memo(
	({
		userType,
		selectedDate,
		selectedLessons,
		joinedAcademyList,
		joinedClassroomList,
		yearMonth
	}) => {
		// 하단 수업 상세 일정 요소들을 가리키는 Ref
		const liLessonInfoRefs = useRef([]);
		const btnEditLessonRefs = useRef([]);
		const btnDeleteLessonRefs = useRef([]);

		const [open, setOpen] = useState(false);
		// 수업 수정 선택한 수업의 lessonId
		const [selectedLessonId, setSelectedLessonId] = useState("");

		// 수업 수정 전 state들
		const [beforeEditClassroomName, setBeforeEditClassroomName] =
			useState("");
		const [beforeEditLessonName, setBeforeEditLessonName] = useState("");
		const [beforeEditDate, setBeforeEditDate] = useState("");
		const [beforeEditBeginTime, setBeforeEditBeginTime] = useState("");
		const [beforeEditEndTime, setBeforeEditEndTime] = useState("");

		// 수업 수정 Dialog form 요소 state들
		const [editedLessonName, setEditedLessonName] = useState("");
		const [editedDate, setEditedDate] = useState("");
		const [editedBeginTime, setEditedBeginTime] = useState("");
		const [editedEndTime, setEditedEndTime] = useState("");

		/* academyId로 academyName 검색 */
		const getAcademyName = (academyId) => {
			return joinedAcademyList.find((academy) => academy.id === academyId)
				.name;
		};

		/* classroomList에서 classroomId로 검색하여 해당하는 반의 학원 academyId 얻음  */
		const getAcademyIdFromClassroomList = (classroomId) => {
			return joinedClassroomList.find(
				(classroom) => classroom.id === classroomId
			)?.academyId;
		};

		/* selectedDate state에 해당하는 일정들을 각각의 <li> 배열로 return */
		const showSelectedDateLessonListItems = () => {
			const listItems = [];

			for (let i = 0; i < selectedLessons.length; i++) {
				const academyName = getAcademyName(
					getAcademyIdFromClassroomList(
						selectedLessons[i].classroomId
					)
				);
				// const classroomName = selectedLessons[i].classRoom;
				const classroomName = selectedLessons[i].classRoom.split(";")[0];
				const lessonName = selectedLessons[i].title;
				const beginTime = selectedLessons[i].schedule.beginTime.slice(
					0,
					5
				);
				const endTime = selectedLessons[i].schedule.endTime.slice(0, 5);

				const element = (
					<div className="div__selected_lesson_list_menu">
						<li
							key={selectedLessons[i].id}
							ref={(elem) => (liLessonInfoRefs.current[i] = elem)}
						>
							{academyName} 학원, {classroomName} 반, {lessonName}{" "}
							수업, {beginTime} ~ {endTime}
						</li>

						{/* 수업 일정 수정, 수업 일정 삭제 button */}
						{userType === "teacher" ? (
							<div className="div__selected_lesson_list_menu_buttons">
								<button
									onClick={(e) =>
										onClickBtnEditLesson(
											selectedLessons[i].id,
											i,
											e
										)
									}
									ref={(elem) =>
										(btnEditLessonRefs.current[i] = elem)
									}
								>
									📝
								</button>

								<button
									onClick={(e) =>
										onClickBtnDeleteLesson(
											selectedLessons[i].id,
											i,
											e
										)
									}
									ref={(elem) =>
										(btnDeleteLessonRefs.current[i] = elem)
									}
								>
									❌
								</button>
							</div>
						) : (
							""
						)}
					</div>
				);

				listItems.push(element);
			}

			return listItems;
		};

		const handleClose = () => {
			// 변경할 LessonInfo Input state들 초기화
			setEditedLessonName("");
			setEditedDate("");
			setEditedBeginTime("");
			setEditedEndTime("");

			setSelectedLessonId("");

			setOpen(false);
		};

		/* 수업 일정 수정 button 📝 클릭 */
		const onClickBtnEditLesson = (lessonId, refIndex, e) => {
			const academyName =
				liLessonInfoRefs.current[refIndex].childNodes[0].textContent;
			const classroomName =
				liLessonInfoRefs.current[refIndex].childNodes[2].textContent;
			const lessonName =
				liLessonInfoRefs.current[refIndex].childNodes[4].textContent;
			const beginTime =
				liLessonInfoRefs.current[refIndex].childNodes[7].textContent;
			const endTime =
				liLessonInfoRefs.current[refIndex].childNodes[9].textContent;

			// 수업 수정 전 LessonInfo state들 저장
			setBeforeEditClassroomName(classroomName);
			setBeforeEditLessonName(lessonName);
			setBeforeEditDate(selectedDate);
			setBeforeEditBeginTime(beginTime);
			setBeforeEditEndTime(endTime);

			// 수업 수정 입력 form 요소들의 state들 지정
			setEditedLessonName(lessonName);
			setEditedDate(selectedDate);
			setEditedBeginTime(beginTime);
			setEditedEndTime(endTime);

			setSelectedLessonId(lessonId);
			setOpen(true);
		};

		/* 수업 일정 삭제 button ❌ 클릭 */
		const onClickBtnDeleteLesson = async (lessonId, refIndex, e) => {
			const academyName =
				liLessonInfoRefs.current[refIndex].childNodes[0].textContent;
			const classroomName =
				liLessonInfoRefs.current[refIndex].childNodes[2].textContent;
			const lessonName =
				liLessonInfoRefs.current[refIndex].childNodes[4].textContent;
			const beginTime =
				liLessonInfoRefs.current[refIndex].childNodes[7].textContent;
			const endTime =
				liLessonInfoRefs.current[refIndex].childNodes[9].textContent;

			const deleteLesson = async (lessonId) => {
				try {
					const response = await axios.delete(
						`/v1/academy/classroom/lessons/${lessonId}`
					);

					if (response.data != undefined)
						alert("수업이 삭제 되었습니다.");
				} catch (e) {
					alert("수업 삭제 오류");
					console.log(e);
				}
			};

			let confirmDeleteLesson = window.confirm(
				`${academyName} 학원, ${classroomName} 반, ${lessonName} 수업(${beginTime} ~ ${endTime})을 삭제 하시겠습니까?`
			);
			if (confirmDeleteLesson) {
				await deleteLesson(lessonId);

				// 페이지 새로고침
				window.location.replace(
					`/teacher/main/calendar_year_month/${yearMonth}`
				);
				// history.push(`/teacher/main/calendar_year_month/${yearMonth}`);
			}
		};

		/* 수업 수정 Dialog Form Submit */
		const onSubmitForm = async (e) => {
			e.preventDefault();
			console.log(`selectedLessonId: ${selectedLessonId}`);

			const patchEditLesson = async (lessonId) => {
				try {
					const response = await axios.patch(
						`/v1/academy/classroom/lessons/${lessonId}`,
						{
							name: editedLessonName,
							schedule: {
								date: editedDate,
								beginTime: editedBeginTime,
								endTime: editedEndTime
							}
						}
					);

					if (response.data != undefined)
						alert("수업이 수정 되었습니다.");
				} catch (e) {
					alert("수업 수정 오류");
					console.log(e);
				}
			};

			if (
				beforeEditLessonName === editedLessonName &&
				beforeEditDate === editedDate &&
				beforeEditBeginTime === editedBeginTime &&
				beforeEditEndTime === editedEndTime
			) {
				alert("수정된 사항이 없습니다.");
				return;
			}

			let confirmPatchEditLesson = window.confirm(
				`${beforeEditClassroomName} 반, ${editedLessonName} 수업(${editedDate}, ${editedBeginTime} ~ ${editedEndTime}) 으로 수정 하시겠습니까?`
			);
			if (confirmPatchEditLesson) {
				await patchEditLesson(selectedLessonId);

				// 페이지 새로고침
				window.location.replace(
					`/teacher/main/calendar_year_month/${yearMonth}`
				);
				// history.push(`/teacher/main/calendar_year_month/${yearMonth}`);
			}
		};

		const onChangeInputLesson = (e) => {
			setEditedLessonName(e.target.value);
		};

		const onChangeInputDate = (e) => {
			setEditedDate(e.target.value);
		};

		const onChangeInputBeginTime = (e) => {
			setEditedBeginTime(e.target.value);
		};

		const onChangeInputEndTime = (e) => {
			setEditedEndTime(e.target.value);
		};

		return (
			<div className="div__selected_lesson_list">
				{selectedDate !== "" ? <h3>{selectedDate} 수업 일정</h3> : ""}

				<ul className="ul__selected_lesson_list">
					{selectedLessons?.length === 0 ? (
						<span>수업이 없습니다!</span>
					) : (
						showSelectedDateLessonListItems()
					)}
				</ul>

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
						수업 수정
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							<form
								className="lesson_edit__form"
								onSubmit={onSubmitForm}
							>
								<div>
									<span className="classroom_edit__form__label">
										반 이름
									</span>
									<input
										type="text"
										value={beforeEditClassroomName}
										disabled
									// readOnly
									/>
								</div>
								<div>
									<span className="lesson_edit__form__label">
										수업 이름
									</span>
									<input
										type="text"
										name="title"
										value={editedLessonName}
										onChange={onChangeInputLesson}
										required
									/>
								</div>

								<div>
									<span className="lesson_edit__form__label">
										날짜
									</span>
									<input
										type="date"
										name="date"
										value={editedDate}
										onChange={onChangeInputDate}
										min={dateToStr(new Date())}
										required
									/>
								</div>

								<div>
									<span className="lesson_edit__form__label">
										시작 시간
									</span>
									<input
										type="time"
										name="beginTime"
										value={editedBeginTime}
										onChange={onChangeInputBeginTime}
										required
									/>
								</div>

								<div>
									<span className="lesson_edit__form__label">
										종료 시간
									</span>
									<input
										type="time"
										name="endTime"
										value={editedEndTime}
										onChange={onChangeInputEndTime}
										min={editedBeginTime}
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
									<Button type="submit" color="primary">
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
			</div>
		);
	}
);

export default SelectedLessonList;
