import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchStudentJoinedAcademyList } from "../redux/fetchStudentJoinedAcademyList";
import { apiFetchStudentApplyingAcademyList } from "../redux/fetchStudentApplyingAcademyList";
import MenuBar_S from "../components/MenuBar_S";
import JoinedAcademyList_S from "../components/JoinedAcademyList_S";
import ApplyingAcademyList_S from "../components/ApplyingAcademyList_S";
import "../styles/AcademyInfo_S.css";

const AcademyInfo_S = memo(({ history }) => {
	const dispatch = useDispatch();
	const onFetchStudentJoinedAcademyList = (studentId) => {
		console.log("onFetchStudentJoinedAcademyList()");
		dispatch(apiFetchStudentJoinedAcademyList(studentId));
	};
	const onFetchStudentApplyingAcademyList = (studentId) => {
		console.log("onFetchStudentApplyingAcademyList()");
		dispatch(apiFetchStudentApplyingAcademyList(studentId));
	};

	const studentId = useSelector(
		(state) => state.fetchStudentIdReducer.studentId
	);

	useEffect(() => {
		console.log("AcademyInfo_S 렌더링");
		onFetchStudentJoinedAcademyList(studentId);
		onFetchStudentApplyingAcademyList(studentId);
	}, []);

	const studentJoinedAcademyList = useSelector(
		(state) =>
			state.fetchStudentJoinedAcademyListReducer.studentJoinedAcademyList
	);
	const studentApplyingAcademyList = useSelector(
		(state) =>
			state.fetchStudentApplyingAcademyListReducer
				.studentApplyingAcademyList
	);
	const isJoinedAcademy = studentJoinedAcademyList.length !== 0;

	/* AcademyInfo_S: Container 컴포넌트 */
	/* JoinedAcademyList_S, ApplyingAcademyList_S: Presenter 컴포넌트 */

	return (
		<div className="student_academy_info">
			<MenuBar_S isJoinedAcademy={isJoinedAcademy} history={history} />

			<JoinedAcademyList_S
				studentJoinedAcademyList={studentJoinedAcademyList}
			/>
			<ApplyingAcademyList_S
				studentApplyingAcademyList={studentApplyingAcademyList}
			/>

			<button
				className="btn_apply_academy"
				onClick={() => history.push("/student_apply_academy")}
			>
				학원 가입신청 하기
			</button>
		</div>
	);
});

export default AcademyInfo_S;
