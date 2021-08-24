import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchStudentJoinedAcademyList } from "../redux/fetchStudentJoinedAcademyList";
import { apiFetchStudentJoinedClassroomList } from "../redux/fetchStudentJoinedClassroomList";
import { apiFetchStudentApplyingClassroomList } from "../redux/fetchStudentApplyingClassroomList";
import MenuBar_S from "../components/MenuBar_S";
import JoinedClassroomList_S from "../components/JoinedClassroomList_S";
import ApplyingClassroomList_S from "../components/ApplyingClassroomList_S";
import "../styles/ClassroomInfo_S.css";

const ClassroomInfo_S = memo(({ history }) => {
	const dispatch = useDispatch();
	const onFetchStudentJoinedAcademyList = (studentId) => {
		console.log("onFetchStudentJoinedAcademyList()");
		dispatch(apiFetchStudentJoinedAcademyList(studentId));
	};
	const onFetchStudentJoinedClassroomList = (studentId) => {
		console.log("onFetchStudentJoinedClassroomList()");
		dispatch(apiFetchStudentJoinedClassroomList(studentId));
	};
	const onFetchStudentApplyingClassroomList = (studentId) => {
		console.log("onFetchStudentApplyingClassroomList()");
		dispatch(apiFetchStudentApplyingClassroomList(studentId));
	};

	const studentId = useSelector(
		(state) => state.fetchStudentIdReducer.studentId
	);

	useEffect(() => {
		console.log("ClassroomInfo_S 렌더링");
		onFetchStudentJoinedAcademyList(studentId);
		onFetchStudentJoinedClassroomList(studentId);
		onFetchStudentApplyingClassroomList(studentId);
	}, []);

	const studentJoinedAcademyList = useSelector(
		(state) =>
			state.fetchStudentJoinedAcademyListReducer.studentJoinedAcademyList
	);
	const studentJoinedClassroomList = useSelector(
		(state) =>
			state.fetchStudentJoinedClassroomListReducer
				.studentJoinedClassroomList
	);
	const studentApplyingClassroomList = useSelector(
		(state) =>
			state.fetchStudentApplyingClassroomListReducer
				.studentApplyingClassroomList
	);
	const isJoinedAcademy = studentJoinedAcademyList.length !== 0;

	/* ClassroomInfo_S: Container 컴포넌트 */
	/* JoinedClassroomList_S, ApplyingClassroomList_S: Presenter 컴포넌트 */

	return (
		<div className="student_classroom_info">
			<MenuBar_S isJoinedAcademy={isJoinedAcademy} history={history} />

			{/* 예외처리: 가입된 학원이 없을 경우, 학원 가입하기 유도 */}
			{isJoinedAcademy === true ? (
				<>
					<JoinedClassroomList_S
						studentJoinedClassroomList={studentJoinedClassroomList}
					/>
					<ApplyingClassroomList_S
						studentApplyingClassroomList={
							studentApplyingClassroomList
						}
					/>
				</>
			) : (
				""
			)}

			<button
				className="btn_apply_classroom"
				onClick={() => history.push("/student_apply_classroom")}
			>
				반 가입신청 하기
			</button>
		</div>
	);
});

export default ClassroomInfo_S;
