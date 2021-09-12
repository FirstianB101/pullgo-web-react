import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchApplyingAcademyList } from "../redux/fetchApplyingAcademyList";

import MenuBar_S from "../components/MenuBar_S";
import MenuBar_T from "../components/MenuBar_T";
import JoinedAcademyList from "../components/JoinedAcademyList";
import ApplyingAcademyList from "../components/ApplyingAcademyList";
import "../styles/AcademyInfo.css";

const AcademyInfo = memo(({ history }) => {
	const dispatch = useDispatch();
	const onFetchJoinedAcademyList = (userType, userId) => {
		console.log("onFetchJoinedAcademyList()");
		dispatch(apiFetchJoinedAcademyList(userType, userId));
	};
	const onFetchApplyingAcademyList = (userType, userId) => {
		console.log("onFetchApplyingAcademyList()");
		dispatch(apiFetchApplyingAcademyList(userType, userId));
	};

	const userType = useSelector((state) => state.userTypeReducer.userType);
	const studentId = useSelector((state) => state.studentIdReducer.studentId);
	const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);

	useEffect(() => {
		console.log("AcademyInfo 렌더링");

		if (userType === "student") {
			onFetchJoinedAcademyList(userType, studentId);
			onFetchApplyingAcademyList(userType, studentId);
		} else {
			onFetchJoinedAcademyList(userType, teacherId);
			onFetchApplyingAcademyList(userType, teacherId);
		}
	}, []);

	const joinedAcademyList = useSelector(
		(state) => state.joinedAcademyListReducer.joinedAcademyList
	);
	const applyingAcademyList = useSelector(
		(state) => state.applyingAcademyListReducer.applyingAcademyList
	);

	const isJoinedAcademy = joinedAcademyList.length !== 0;

	/* AcademyInfo: Container 컴포넌트 */
	/* JoinedAcademyList, ApplyingAcademyList: Presenter 컴포넌트 */

	return (
		<div className="academy_info">
			{userType === "student" ? (
				<MenuBar_S
					isJoinedAcademy={isJoinedAcademy}
					history={history}
				/>
			) : (
				<MenuBar_T
					isJoinedAcademy={isJoinedAcademy}
					history={history}
				/>
			)}

			<JoinedAcademyList joinedAcademyList={joinedAcademyList} />
			<ApplyingAcademyList applyingAcademyList={applyingAcademyList} />

			<button
				className="btn_apply_academy"
				onClick={() => history.push(`/${userType}/apply_academy`)}
			>
				학원 가입신청 하기
			</button>
		</div>
	);
});

export default AcademyInfo;
