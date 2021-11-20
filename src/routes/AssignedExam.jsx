import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchJoinedClassroomList } from "../redux/fetchJoinedClassroomList";
import { apiFetchExamListByStudentId } from "../redux/fetchExamListByStudentId";
import MenuBar_S from "../components/MenuBar_S";
import AssignedExamList from "../components/AssignedExamList";

import "../styles/AssignedExam.css";

const AssignedExam = ({ history, match, location }) => {
    const dispatch = useDispatch();
    const onFetchJoinedAcademyList = (userType, userId) => {
        console.log("onFetchJoinedAcademyList()");
        dispatch(apiFetchJoinedAcademyList(userType, userId));
    };
    const onFetchJoinedClassroomList = (userType, userId) => {
        console.log("onFetchJoinedClassroomList()");
        dispatch(apiFetchJoinedClassroomList(userType, userId));
    };
    const onFetchExamListByStudentId = (studentId) => {
        console.log("onFetchExamListByStudentId()");
        dispatch(apiFetchExamListByStudentId(studentId));
    };

    const userType = useSelector((state) => state.userTypeReducer.userType);
    const studentId = useSelector((state) => state.studentIdReducer.studentId);

    useEffect(() => {
        console.log("AssignedExam 렌더링");
        onFetchJoinedAcademyList(userType, studentId);
        onFetchJoinedClassroomList(userType, studentId);
    }, []);

    useEffect(() => {
        onFetchExamListByStudentId(studentId);
    }, [studentId]);

    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const joinedClassroomList = useSelector(
        (state) => state.joinedClassroomListReducer.joinedClassroomList
    );
    const examList = useSelector(
        (state) => state.examListByStudentIdReducer.examList
    );
    const isJoinedAcademy = joinedAcademyList.length !== 0;

    return (
        <div className="assigned_exam">
            <MenuBar_S
                centerMenu="시험 목록"
                isJoinedAcademy={isJoinedAcademy}
                history={history}
                match={match}
                location={location}
            />

            {examList.length !== 0 ? (
                <AssignedExamList
                    examList={examList}
                    joinedAcademyList={joinedAcademyList}
                    joinedClassroomList={joinedClassroomList}
                    history={history}
                />
            ) : (
                <h2 className="no_exam">등록된 시험이 없습니다!</h2>
            )}
        </div>
    );
};

export default AssignedExam;
