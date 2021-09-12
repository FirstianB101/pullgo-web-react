import React, { useState, memo } from "react";
import axios from "axios";

const SelectedLessonList = ({
	userType,
	selectedDate,
	selectedLessons,
	joinedAcademyList,
	joinedClassroomList
}) => {
	// 수업 삭제 후 리렌더링을 위한 flag state
	const [isDeleteLesson, setIsDeleteLesson] = useState(false);

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
				getAcademyIdFromClassroomList(selectedLessons[i].classroomId)
			);
			const classroomName = selectedLessons[i].classRoom;
			const lessonName = selectedLessons[i].title;
			const beginTime = selectedLessons[i].schedule.beginTime.slice(0, 5);
			const endTime = selectedLessons[i].schedule.endTime.slice(0, 5);

			const element = (
				<div className="div__selected_lesson_list_menu">
					<li key={selectedLessons[i].id}>
						{academyName} 학원, {classroomName} 반, {lessonName}{" "}
						수업, {beginTime} ~ {endTime}
					</li>

					{/* 수업 일정 수정, 수업 일정 삭제 button */}
					{userType === "teacher" ? (
						<div className="div__selected_lesson_list_menu_buttons">
							<button onClick={onClickBtnEditLesson}>📝</button>
							<button
								onClick={(e) =>
									onClickBtnDeleteLesson(
										selectedLessons[i].id,
										e
									)
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

	/* 수업 일정 수정 button 📝 클릭 */
	const onClickBtnEditLesson = (e) => {
		alert("수업 일정 수정");
	};

	/* 수업 일정 삭제 button ❌ 클릭 */
	const onClickBtnDeleteLesson = (lessonId, e) => {
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

		deleteLesson(lessonId);
		// setIsDeleteLesson(true);

		// 컴포넌트 리렌더링
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
		</div>
	);
};

export default SelectedLessonList;
