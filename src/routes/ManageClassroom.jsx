import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchJoinedClassroomList } from "../redux/fetchJoinedClassroomList";
import MenuBar_T from "../components/MenuBar_T";
import ClassroomInfo from "./ClassroomInfo";
import ManageClassroomList from "../components/ManageClassroomList";

// import "../styles/ManageClassroom.css";

const ManageClassroom = ({ history }) => {
	const dispatch = useDispatch();
	const onFetchJoinedAcademyList = (userType, userId) => {
		console.log("onFetchJoinedAcademyList()");
		dispatch(apiFetchJoinedAcademyList(userType, userId));
	};
	const onFetchJoinedClassroomList = (userType, userId) => {
		console.log("onFetchJoinedClassroomList()");
		dispatch(apiFetchJoinedClassroomList(userType, userId));
	};

	const userType = useSelector((state) => state.userTypeReducer.userType);
	const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);

	useEffect(() => {
		console.log("ManageClassroom 렌더링");
		onFetchJoinedAcademyList(userType, teacherId);
		onFetchJoinedClassroomList(userType, teacherId);
	}, []);

	const joinedAcademyList = useSelector(
		(state) => state.joinedAcademyListReducer.joinedAcademyList
	);
	const joinedClassroomList = useSelector(
		(state) => state.joinedClassroomListReducer.joinedClassroomList
	);
	const isJoinedAcademy = joinedAcademyList.length !== 0;
	const isJoinedClassroom = joinedClassroomList.length !== 0;

	return (
		<div className="manage_classroom">
			<MenuBar_T
				isJoinedAcademy={isJoinedAcademy}
				history={history}
			/>

			{
				isJoinedClassroom === true ? (
					<ManageClassroomList joinedClassroomList={joinedClassroomList} history={history} />) : (
					<ClassroomInfo history={history} />
				)
			}
		</div>
	);
};

export default ManageClassroom;
