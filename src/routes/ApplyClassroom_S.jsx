import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchStudentJoinedAcademyList } from "../redux/fetchStudentJoinedAcademyList";
import MenuBar_S from "../components/MenuBar_S";
// import SearchClassroomListContainer
// import "../styles/ApplyClassroom_S.css;"

const ApplyClassroom_S = ({ history }) => {
	const dispatch = useDispatch();
	const onFetchStudentJoinedAcademyList = (studentId) => {
		console.log("onFetchStudentJoinedAcademyList()");
		dispatch(apiFetchStudentJoinedAcademyList(studentId));
	};

	const studentId = useSelector(
		(state) => state.fetchStudentIdReducer.studentId
	);

	useEffect(() => {
		console.log("ApplyClassroom_S 렌더링");
		onFetchStudentJoinedAcademyList(studentId);
	}, []);

	const studentJoinedAcademyList = useSelector(
		(state) =>
			state.fetchStudentJoinedAcademyListReducer.studentJoinedAcademyList
	);
	const isJoinedAcademy = studentJoinedAcademyList.length !== 0;

	return (
		<div className="student_apply_classroom">
			<MenuBar_S isJoinedAcademy={isJoinedAcademy} history={history} />
			<h3>SearchClassroomListContainer</h3>
		</div>
	);
};

export default ApplyClassroom_S;
