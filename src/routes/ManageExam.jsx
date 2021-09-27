import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchExamList } from "../redux/fetchExamList";
import MenuBar_T from "../components/MenuBar_T";
import ManageExamList from "../components/ManageExamList";

import "../styles/ManageExam.css";

const ManageExam = ({ history, match }) => {
	const [classroomId, setClassroomId] = useState(match.params.classroomId);

	const dispatch = useDispatch();
	const onFetchJoinedAcademyList = (userType, userId) => {
		console.log("onFetchJoinedAcademyList()");
		dispatch(apiFetchJoinedAcademyList(userType, userId));
	};
	const onFetchExamList = (classroomId) => {
		console.log("onFetchExamList()");
		dispatch(apiFetchExamList(classroomId));
	};

	const userType = useSelector((state) => state.userTypeReducer.userType);
	const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);

	useEffect(() => {
		console.log("ManageExam 렌더링");
		onFetchJoinedAcademyList(userType, teacherId);
	}, []);

	useEffect(() => {
		onFetchExamList(classroomId);
	}, [classroomId]);

	const joinedAcademyList = useSelector(
		(state) => state.joinedAcademyListReducer.joinedAcademyList
	);
	const examList = useSelector((state) => state.examListReducer.examList);
	const isJoinedAcademy = joinedAcademyList.length !== 0;

	const rightMenu = <i class="fas fa-plus fa-lg"></i>;

	return (
		<div className="manage_exam">
			<MenuBar_T
				centerMenu="시험 관리"
				rightMenu={rightMenu}
				isJoinedAcademy={isJoinedAcademy}
				history={history}
			/>

			{examList.length !== 0 ? (
				<ManageExamList examList={examList} classroomId={classroomId} />
			) : (
				<span className="no_exam">등록된 시험이 없습니다!</span>
			)}

			{/* 하단 MenuBar 컴포넌트 */}
		</div>
	);
};

export default ManageExam;
