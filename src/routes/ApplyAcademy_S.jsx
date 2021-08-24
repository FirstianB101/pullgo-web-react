import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchStudentJoinedAcademyList } from "../redux/fetchStudentJoinedAcademyList";
import MenuBar_S from "../components/MenuBar_S";
import SearchAcademyListContainer from "../container/SearchAcademyListContainer";
import "../styles/ApplyAcademy_S.css";

const ApplyAcademy_S = memo(({ history }) => {
	const dispatch = useDispatch();
	const onFetchStudentJoinedAcademyList = (studentId) => {
		console.log("onFetchStudentJoinedAcademyList()");
		dispatch(apiFetchStudentJoinedAcademyList(studentId));
	};

	const studentId = useSelector(
		(state) => state.fetchStudentIdReducer.studentId
	);

	useEffect(() => {
		console.log("ApplyAcademy_S 렌더링");
		onFetchStudentJoinedAcademyList(studentId);
	}, []);

	const studentJoinedAcademyList = useSelector(
		(state) =>
			state.fetchStudentJoinedAcademyListReducer.studentJoinedAcademyList
	);
	const isJoinedAcademy = studentJoinedAcademyList.length !== 0;

	return (
		<div className="student_apply_academy">
			<MenuBar_S isJoinedAcademy={isJoinedAcademy} history={history} />
			<SearchAcademyListContainer />
		</div>
	);
});

export default ApplyAcademy_S;
