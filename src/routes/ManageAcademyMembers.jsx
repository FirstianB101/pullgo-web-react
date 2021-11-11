import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchAcademyJoinedStudentList } from "../redux/fetchAcademyJoinedStudentList";
import { apiFetchAcademyJoinedTeacherList } from "../redux/fetchAcademyJoinedTeacherList";
import MenuBar_T from "../components/MenuBar_T";
import ManageAcademyMenuChips from "../components/ManageAcademyMenuChips";
import AcademyJoinedStudentList from "../components/AcademyJoinedStudentList";
import AcademyJoinedTeacherList from "../components/AcademyJoinedTeacherList";

import "../styles/ManageAcademyMembers.css";

const ManageAcademyMembers = ({ history, match, location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    const [academyId, setAcademyId] = useState(query.id);
    const [academy, setAcademy] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);

    const dispatch = useDispatch();
    const onFetchJoinedAcademyList = (userType, userId) => {
        console.log("onFetchJoinedAcademyList()");
        dispatch(apiFetchJoinedAcademyList(userType, userId));
    };
    const onFetchAcademyJoinedStudentList = (academyId) => {
        console.log("onFetchAcademyJoinedStudentList()");
        dispatch(apiFetchAcademyJoinedStudentList(academyId));
    };
    const onFetchAcademyJoinedTeacherList = (academyId) => {
        console.log("onFetchAcademyJoinedTeacherList()");
        dispatch(apiFetchAcademyJoinedTeacherList(academyId));
    };

    const userType = useSelector((state) => state.userTypeReducer.userType);
    const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);

    useEffect(() => {
        console.log("ManageAcademyMembers 렌더링");
        onFetchJoinedAcademyList(userType, teacherId);
    }, []);

    useEffect(() => {
        onFetchAcademyJoinedStudentList(academyId);
        onFetchAcademyJoinedTeacherList(academyId);
    }, [academyId]);

    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const joinedStudentList = useSelector(
        (state) => state.academyJoinedStudentListReducer.joinedStudentList
    );
    const joinedTeacherList = useSelector(
        (state) => state.academyJoinedTeacherListReducer.joinedTeacherList
    );
    const isJoinedAcademy = joinedAcademyList.length !== 0;

    useEffect(() => {
        if (joinedAcademyList.length === 0) return;

        const currentAcademy = joinedAcademyList.find(
            (academy) => academy.id == academyId
        );
        if (currentAcademy != undefined) setAcademy(currentAcademy);
    }, [academyId, joinedAcademyList]);

    useEffect(() => {
        if (academy === null) return;
        setHasPermission(teacherId == academy.ownerId);
    }, [teacherId, academy]);

    return (
        <div className="manage_academy_members">
            <MenuBar_T
                centerMenu="학원 구성원 관리"
                isJoinedAcademy={isJoinedAcademy}
                history={history}
                match={match}
            />

            <ManageAcademyMenuChips
                currentChipLabel="구성원 관리"
                hasPermission={hasPermission}
                history={history}
                location={location}
            />

            <div className="academy_joined_user_list">
                {joinedStudentList.length !== 0 ? (
                    <AcademyJoinedStudentList
                        academyId={academyId}
                        joinedStudentList={joinedStudentList}
                    />
                ) : (
                    <h2 className="no_student">
                        학원에 가입된 학생이 없습니다!
                    </h2>
                )}

                {joinedTeacherList.length !== 0 ? (
                    <AcademyJoinedTeacherList
                        academyId={academyId}
                        joinedTeacherList={joinedTeacherList}
                        teacherId={teacherId}
                    />
                ) : (
                    <h2 className="no_teacher">
                        학원에 가입된 선생님이 없습니다!
                    </h2>
                )}
            </div>
        </div>
    );
};

export default ManageAcademyMembers;
