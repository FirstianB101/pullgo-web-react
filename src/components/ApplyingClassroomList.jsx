import axios from "axios";
import React, { useState, useEffect, memo } from "react";

const ApplyingClassroomList = memo((props) => {
	const [applyingClassroomList, setApplyingClassroomList] = useState(
		props.applyingClassroomList
	);
	const [academyList, setAcademyList] = useState([]);
	const [teachersList, setTeachersList] = useState([]);

	const fetchAcademyByAcademyId = async (academyId) => {
		try {
			const response = await axios({
				method: "GET",
				url: `/v1/academies/${academyId}`
			});

			// 배열 state academyList에 academy 추가
			setAcademyList((prevAcademyList) => [
				...prevAcademyList,
				response.data
			]);
		} catch (error) {
			throw error;
		}
	};

	/* classroomId로 해당 반에 소속된 teachers (배열) 조회 */
	/* 한 classroom에 다수의 teacher 존재 가능 */
	const fetchTeachersByClassroomId = async (classroomId) => {
		try {
			const response = await axios({
				method: "GET",
				url: `/v1/teachers?classroomId=${classroomId}`
			});

			// 배열 state teachersList에 teachers 추가
			setTeachersList((prevTeachersList) => [
				...prevTeachersList,
				response.data
			]);
		} catch (error) {
			throw error;
		}
	};

	useEffect(() => {
		// AcademyList에 해당 반의 학원, 선생님 추가
		if (applyingClassroomList.length !== 0) {
			applyingClassroomList.map((classroom) => {
				fetchAcademyByAcademyId(classroom.academyId);
				fetchTeachersByClassroomId(classroom.id);
			});
		}
	}, [applyingClassroomList]);

	/* classroomName, academyName, teacherName 표시 */
	const showClassroomListItems = () => {
		const listItems = [];

		for (let i = 0; i < applyingClassroomList.length; i++) {
			const classNameElement = (
				<li>반: {applyingClassroomList[i].name}</li>
			);
			let academyNameElement;
			if (academyList[i])
				academyNameElement = (
					<>
						<span className="span_academy_name">
							학원: {academyList[i].name}
						</span>
						<br />
					</>
				);

			const teachersNameElement = [];
			if (teachersList[i]) {
				for (let j = 0; j < teachersList[i].length; j++) {
					const teacherNameElement = (
						<span className="span_teacher_name">
							{j === 0 ? "선생님: " : ""}
							{teachersList[i][j].account.fullName}
							{j !== teachersList[i].length - 1 ? ", " : " "}
						</span>
					);
					teachersNameElement.push(teacherNameElement);
				}
			}

			const item = (
				<div className="classroom_list_item">
					{classNameElement}
					{academyNameElement}
					{teachersNameElement}
				</div>
			);

			listItems.push(item);
		}

		return listItems;
	};

	return (
		<div className="applying_classroom_list">
			<h3>가입 신청한 반 목록</h3>
			<ul>
				{applyingClassroomList.length !== 0
					? showClassroomListItems()
					: ""}
			</ul>
		</div>
	);
});

export default ApplyingClassroomList;
