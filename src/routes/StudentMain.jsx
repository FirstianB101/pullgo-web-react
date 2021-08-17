import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchStudentInfo } from "../redux/fetchStudentInfo";
import { apiFetchStudentJoinedAcademyList } from "../redux/fetchStudentJoinedAcademyList";
import NoAcademyStudent from "./NoAcademyStudent";

/* 학생의 학원 가입 여부에 따라 Routing */
const StudentMain = memo(({ history }) => {
	const dispatch = useDispatch();
	const onFetchStudentInfo = (studentId) => {
		console.log("onFetchStudentInfo()");
		dispatch(apiFetchStudentInfo(studentId));
	};
	const onFetchStudentJoinedAcademyList = (studentId) => {
		console.log("onFetchStudentJoinedAcademyList()");
		dispatch(apiFetchStudentJoinedAcademyList(studentId));
	};

	const SID = useSelector((state) => state.fetchStudentIdReducer.studentId);
	const [studentId, setStudentId] = useState(SID);
	// const [studentId, setStudentId] = useState(
	// 	useSelector((state) => state.fetchStudentIdReducer.studentId)
	// );
	// const [studentJoinedAcademyList, setStudentJoinedAcademyList] = useState("");

	// 학생 정보, 학생이 가입된 학원 Redux 갱신: componentDidMount()
	// 업데이트된 studentId로 조회하기 위한 useEffect
	useEffect(() => {
		console.log(
			`studentId ${SID}번 학생 정보, 학생이 가입된 학원 목록 갱신`
		);
		onFetchStudentInfo(SID);
		onFetchStudentJoinedAcademyList(SID);

		setStudentId(SID);
	}, [SID]);

	// useEffect(() => {
	// 	console.log(
	// 		`studentId ${studentId}번 학생 정보, 학생이 가입된 학원 목록 갱신`
	// 	);
	// 	onFetchStudentInfo(studentId);
	// 	onFetchStudentJoinedAcademyList(studentId);

	// 	setStudentId(studentId);
	// }, [studentId]);

	// useEffect(() => {
	// 	// onFetchStudentJoinedAcademyList(studentId);
	// 	console.log("StudentMain 렌더링");

	// }, []);

	const studentJoinedAcademyList = useSelector(
		(state) =>
			state.fetchStudentJoinedAcademyListReducer.studentJoinedAcademyList
	);

	return studentJoinedAcademyList.length === 0 ? (
		<NoAcademyStudent history={history} />
	) : (
		<div>StudentLessonCalendar</div>
	);
});

export default StudentMain;
