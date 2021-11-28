import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchClassroomJoinedStudentList } from "../redux/fetchClassroomJoinedStudentList";
import { apiFetchClassroomJoinedTeacherList } from "../redux/fetchClassroomJoinedTeacherList";
import MenuBar_T from "../components/MenuBar_T";
import ManageClassroomMenuChips from "../components/ManageClassroomMenuChips";
import ClassroomJoinedStudentList from "../components/ClassroomJoinedStudentList";
import ClassroomJoinedTeacherList from "../components/ClassroomJoinedTeacherList";

import "../styles/ManageClassroomMembers.css";

const ManageClassroomMembers = memo(({ history, match, location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    const [classroomId, setClassroomId] = useState(query.id);

    const dispatch = useDispatch();
    const onFetchJoinedAcademyList = (userType, userId) => {
        console.log("onFetchJoinedAcademyList()");
        dispatch(apiFetchJoinedAcademyList(userType, userId));
    };
    const onFetchClassroomJoinedStudentList = (classroomId) => {
        console.log("onFetchClassroomJoinedStudentList()");
        dispatch(apiFetchClassroomJoinedStudentList(classroomId));
    };
    const onFetchClassroomJoinedTeacherList = (classroomId) => {
        console.log("onFetchClassroomJoinedTeacherList()");
        dispatch(apiFetchClassroomJoinedTeacherList(classroomId));
    };

    const userType = useSelector((state) => state.userTypeReducer.userType);
    const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);

    useEffect(() => {
        console.log("ManageClassroomMembers 렌더링");
        onFetchJoinedAcademyList(userType, teacherId);
    }, []);

    useEffect(() => {
        onFetchClassroomJoinedStudentList(classroomId);
        onFetchClassroomJoinedTeacherList(classroomId);
    }, [classroomId]);

    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const joinedStudentList = useSelector(
        (state) => state.classroomJoinedStudentListReducer.joinedStudentList
    );
    const joinedTeacherList = useSelector(
        (state) => state.classroomJoinedTeacherListReducer.joinedTeacherList
    );
    const isJoinedAcademy = joinedAcademyList.length !== 0;

    return (
        <div className="manage_classroom_members">
            <MenuBar_T
                centerMenu="반 구성원 관리"
                isJoinedAcademy={isJoinedAcademy}
                history={history}
                match={match}
            />

            <div className="wrapper__div__manage_classroom_members">
                <ManageClassroomMenuChips
                    currentChipLabel="구성원 관리"
                    history={history}
                    location={location}
                />

                <div className="classroom_joined_user_list">
                    {joinedStudentList.length !== 0 ? (
                        <ClassroomJoinedStudentList
                            classroomId={classroomId}
                            joinedStudentList={joinedStudentList}
                        />
                    ) : (
                        <h2 className="no_student">반에 가입된 학생이 없습니다!</h2>
                    )}

                    {joinedTeacherList.length !== 0 ? (
                        <ClassroomJoinedTeacherList
                            classroomId={classroomId}
                            joinedTeacherList={joinedTeacherList}
                            teacherId={teacherId}
                        />
                    ) : (
                        <h2 className="no_teacher">
                            반에 가입된 선생님이 없습니다!
                        </h2>
                    )}
                </div>
            </div>
        </div>
    );
});

export default ManageClassroomMembers;
