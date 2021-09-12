import React from "react";
import { useDispatch } from "react-redux";

import { apiFetchStudentId } from "../redux/student/fetchStudentId";
import { apiFetchTeacherId } from "../redux/teacher/fetchTeacherId";
import LogIn from "../routes/LogIn";

/* LogIn 라우터(Presenter)를 관리하는 Container */
/* history props: 로그인 -> 메인 화면 링크 이동을 위해 전달 */
const LogInContainer = ({ history }) => {
	// const studentId = useSelector(
	// 	(state) => state.fetchStudentIdReducer.studentId
	// );
	// const studentJoinedAcademyList = useSelector(
	// 	(state) =>
	// 		state.fetchStudentJoinedAcademyListReducer.studentJoinedAcademyList
	// );
	// const studentInfo = useSelector(
	// 	(state) => state.fetchStudentInfoReducer.studentInfo
	// );

	const dispatch = useDispatch();

	const onFetchStudentId = (studentId) => {
		console.log("onFetchStudentId()");
		dispatch(apiFetchStudentId(studentId));
	};
	const onFetchTeacherId = (teacherId) => {
		console.log("onFetchTeacherId()");
		dispatch(apiFetchTeacherId(teacherId));
	};

	return (
		<LogIn
			history={history}
			onFetchStudentId={onFetchStudentId}
			onFetchTeacherId={onFetchTeacherId}
		/>
	);
};

export default LogInContainer;
