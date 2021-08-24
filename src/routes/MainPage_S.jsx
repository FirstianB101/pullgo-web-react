import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchStudentInfo } from "../redux/fetchStudentInfo";
import { apiFetchStudentJoinedAcademyList } from "../redux/fetchStudentJoinedAcademyList";
import YesAcademy_S from "../components/YesAcademy_S";
import NoAcademy_S from "../components/NoAcademy_S";

/* 학생의 학원 가입 여부에 따라 Routing */
const MainPage_S = memo(({ history }) => {
	const dispatch = useDispatch();
	const onFetchStudentInfo = (studentId) => {
		console.log("onFetchStudentInfo()");
		dispatch(apiFetchStudentInfo(studentId));
	};
	const onFetchStudentJoinedAcademyList = (studentId) => {
		console.log("onFetchStudentJoinedAcademyList()");
		dispatch(apiFetchStudentJoinedAcademyList(studentId));
	};

	const studentId = useSelector(
		(state) => state.fetchStudentIdReducer.studentId
	);

	// 학생 정보, 학생이 가입된 학원 Redux 갱신
	// 업데이트된 studentId로 조회하기 위한 useEffect
	useEffect(() => {
		console.log(
			`studentId ${studentId}번 학생 정보, 학생이 가입된 학원 목록 갱신`
		);
		onFetchStudentInfo(studentId);
		onFetchStudentJoinedAcademyList(studentId);
	}, [studentId]);

	useEffect(() => {
		console.log("MainPage_S 렌더링");
		onFetchStudentJoinedAcademyList(studentId);
	}, []);

	const studentJoinedAcademyList = useSelector(
		(state) =>
			state.fetchStudentJoinedAcademyListReducer.studentJoinedAcademyList
	);

	return studentJoinedAcademyList.length === 0 ? (
		<NoAcademy_S history={history} />
	) : (
		<YesAcademy_S history={history} />
	);
});

export default MainPage_S;
