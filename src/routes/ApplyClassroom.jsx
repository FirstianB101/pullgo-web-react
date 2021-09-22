import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import MenuBar_S from "../components/MenuBar_S";
import MenuBar_T from "../components/MenuBar_T";
import SearchClassroomListContainer from "../container/SearchClassroomListContainer";
import "../styles/ApplyClassroom.css";

const ApplyClassroom = ({ history }) => {
	const dispatch = useDispatch();
	const onFetchJoinedAcademyList = (userType, userId) => {
		console.log("onFetchJoinedAcademyList()");
		dispatch(apiFetchJoinedAcademyList(userType, userId));
	};

	const userType = useSelector((state) => state.userTypeReducer.userType);
	const studentId = useSelector((state) => state.studentIdReducer.studentId);
	const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);

	useEffect(() => {
		console.log("ApplyClassroom 렌더링");

		if (userType === "student")
			onFetchJoinedAcademyList(userType, studentId);
		else onFetchJoinedAcademyList(userType, teacherId);
	}, []);

	const joinedAcademyList = useSelector(
		(state) => state.joinedAcademyListReducer.joinedAcademyList
	);
	const isJoinedAcademy = joinedAcademyList.length !== 0;

	return (
		<div className="apply_classroom">
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

			<SearchClassroomListContainer />
		</div>
	);
};

export default ApplyClassroom;
