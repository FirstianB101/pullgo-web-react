import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchStudentInfo } from "../redux/student/fetchStudentInfo";
import { apiFetchTeacherInfo } from "../redux/teacher/fetchTeacherInfo";
import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import YesAcademy from "../components/YesAcademy";
import NoAcademy from "../components/NoAcademy";

/* 학생의 학원 가입 여부에 따라 Routing */
const MainPage = memo(({ history, match }) => {
	const dispatch = useDispatch();
	const onFetchStudentInfo = (studentId) => {
		console.log("onFetchStudentInfo()");
		dispatch(apiFetchStudentInfo(studentId));
	};
	const onFetchTeacherInfo = (teacherId) => {
		console.log("onFetchTeacherInfo()");
		dispatch(apiFetchTeacherInfo(teacherId));
	};
	const onFetchJoinedAcademyList = (userType, userId) => {
		console.log("onFetchJoinedAcademyList()");
		dispatch(apiFetchJoinedAcademyList(userType, userId));
	};

	const userType = useSelector((state) => state.userTypeReducer.userType);
	const studentId = useSelector((state) => state.studentIdReducer.studentId);
	const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);

	// 사용자 정보, 사용자가 가입된 학원 Redux 갱신
	// 업데이트된 studentId 또는 teacherId로 조회하기 위한 useEffect
	useEffect(() => {
		if (userType === "student") {
			onFetchStudentInfo(studentId);
			onFetchJoinedAcademyList(userType, studentId);
		} else {
			onFetchTeacherInfo(teacherId);
			onFetchJoinedAcademyList(userType, teacherId);
		}
	}, [studentId, teacherId]);

	useEffect(() => {
		console.log("MainPage 렌더링");

		if (userType === "student")
			onFetchJoinedAcademyList(userType, studentId);
		else onFetchJoinedAcademyList(userType, teacherId);
	}, []);

	const joinedAcademyList = useSelector(
		(state) => state.joinedAcademyListReducer.joinedAcademyList
	);

	return joinedAcademyList.length === 0 ? (
		<NoAcademy history={history} />
	) : (
		<YesAcademy history={history} match={match} />
	);
});

export default MainPage;
