import React from "react";
import { useDispatch } from "react-redux";

import { apiFetchStudentId } from "../redux/fetchStudentId";
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

	return (
		<LogIn
			history={history}
			onFetchStudentId={onFetchStudentId}
			// studentId={studentId}
			// studentJoinedAcademyList={studentJoinedAcademyList}
			// studentInfo={studentInfo}
			// onFetchStudentJoinedAcademyList={onFetchStudentJoinedAcademyList}
			// onFetchStudentInfo={onFetchStudentInfo}
		/>
	);
};

export default LogInContainer;
