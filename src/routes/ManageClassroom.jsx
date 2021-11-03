import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchJoinedClassroomList } from "../redux/fetchJoinedClassroomList";
import MenuBar_T from "../components/MenuBar_T";
import ClassroomInfo from "./ClassroomInfo";
import ManageClassroomList from "../components/ManageClassroomList";

import "../styles/ManageClassroom.css";

const ManageClassroom = ({ history, match }) => {
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

    const rightMenu = <i class="fas fa-plus fa-lg"></i>;

    return (
        <div className="manage_classroom">
            {isJoinedClassroom === true ? (
                <>
                    <MenuBar_T
                        centerMenu="반 관리"
                        rightMenu={rightMenu}
                        // rightMenu="+"
                        isJoinedAcademy={isJoinedAcademy}
                        history={history}
                        match={match}
                    />
                    <ManageClassroomList
                        joinedAcademyList={joinedAcademyList}
                        joinedClassroomList={joinedClassroomList}
                        history={history}
                    />
                </>
            ) : (
                <ClassroomInfo history={history} />
            )}
        </div>
    );
};

export default ManageClassroom;
