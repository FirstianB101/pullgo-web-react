import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchJoinedClassroomList } from "../redux/fetchJoinedClassroomList";
import { apiFetchApplyingClassroomList } from "../redux/fetchApplyingClassroomList";

import MenuBar_S from "../components/MenuBar_S";
import MenuBar_T from "../components/MenuBar_T";
import JoinedClassroomList from "../components/JoinedClassroomList";
import ApplyingClassroomList from "../components/ApplyingClassroomList";
import "../styles/ClassroomInfo.css";

const ClassroomInfo = memo(({ history }) => {
	const dispatch = useDispatch();
	const onFetchJoinedAcademyList = (userType, userId) => {
		console.log("onFetchJoinedAcademyList()");
		dispatch(apiFetchJoinedAcademyList(userType, userId));
	};
	const onFetchJoinedClassroomList = (userType, userId) => {
		console.log("onFetchJoinedClassroomList()");
		dispatch(apiFetchJoinedClassroomList(userType, userId));
	};
	const onFetchApplyingClassroomList = (userType, userId) => {
		console.log("onFetchApplyingClassroomList()");
		dispatch(apiFetchApplyingClassroomList(userType, userId));
	};

	const userType = useSelector((state) => state.userTypeReducer.userType);
	const studentId = useSelector((state) => state.studentIdReducer.studentId);
	const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);

	useEffect(() => {
		console.log("ClassroomInfo 렌더링");

		if (userType === "student") {
			onFetchJoinedAcademyList(userType, studentId);
			onFetchJoinedClassroomList(userType, studentId);
			onFetchApplyingClassroomList(userType, studentId);
		} else {
			onFetchJoinedAcademyList(userType, teacherId);
			onFetchJoinedClassroomList(userType, teacherId);
			onFetchApplyingClassroomList(userType, teacherId);
		}
	}, []);

	const joinedAcademyList = useSelector(
		(state) => state.joinedAcademyListReducer.joinedAcademyList
	);
	const joinedClassroomList = useSelector(
		(state) => state.joinedClassroomListReducer.joinedClassroomList
	);
	const applyingClassroomList = useSelector(
		(state) => state.applyingClassroomListReducer.applyingClassroomList
	);
	const isJoinedAcademy = joinedAcademyList.length !== 0;

	/* ClassroomInfo: Container 컴포넌트 */
	/* JoinedClassroomList, ApplyingClassroomList: Presenter 컴포넌트 */

	return (
		<div className="classroom_info">
			{userType === "student" ? (
				<MenuBar_S
					centerMenu="반 가입요청"
					isJoinedAcademy={isJoinedAcademy}
					history={history}
				/>
			) : (
				<MenuBar_T
					centerMenu="반 가입요청"
					isJoinedAcademy={isJoinedAcademy}
					history={history}
				/>
			)}

			{/* 예외처리: 가입된 학원이 없을 경우, 학원 가입하기 유도 */}
			{isJoinedAcademy === true ? (
				<>
					<JoinedClassroomList
						joinedClassroomList={joinedClassroomList}
					/>
					<ApplyingClassroomList
						applyingClassroomList={applyingClassroomList}
					/>
				</>
			) : (
				""
			)}

			<button
				className="btn_apply_classroom"
				onClick={() => history.push(`/${userType}/apply_classroom`)}
			>
				반 가입신청 하기
			</button>
		</div>
	);
});

export default ClassroomInfo;
