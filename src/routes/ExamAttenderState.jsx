import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchClassroomJoinedStudentList } from "../redux/fetchClassroomJoinedStudentList";
import { apiFetchAttenderStateListByExamId } from "../redux/fetchAttenderStateListByExamId";
import MenuBar_T from "../components/MenuBar_T";
import ExamAttenderStateList from "../components/ExamAttenderStateList";

// import "../styles/ExamAttenderState.css";

const ExamAttenderState = ({ history, match, location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    const [classroomId, setClassroomId] = useState(query.classroom);
    const [examId, setExamId] = useState(query.exam);

    const dispatch = useDispatch();
    const onFetchJoinedAcademyList = (userType, userId) => {
        console.log("onFetchJoinedAcademyList()");
        dispatch(apiFetchJoinedAcademyList(userType, userId));
    };
    const onFetchClassroomJoinedStudentList = (classroomId) => {
        console.log("onFetchClassroomJoinedStudentList()");
        dispatch(apiFetchClassroomJoinedStudentList(classroomId));
    };
    const onFetchAttenderStateListByExamId = (examId) => {
        console.log("onFetchAttenderStateListByExamId()");
        dispatch(apiFetchAttenderStateListByExamId(examId));
    };

    const userType = useSelector((state) => state.userTypeReducer.userType);
    const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);

    useEffect(() => {
        console.log("ExamAttenderState 렌더링");
        onFetchJoinedAcademyList(userType, teacherId);
    }, []);

    useEffect(() => {
        onFetchClassroomJoinedStudentList(classroomId);
    }, [classroomId]);

    useEffect(() => {
        onFetchAttenderStateListByExamId(examId);
    }, [examId]);

    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const joinedStudentList = useSelector(
        (state) => state.classroomJoinedStudentListReducer.joinedStudentList
    );
    const attenderStateList = useSelector(
        (state) => state.attenderStateListByExamIdReducer.attenderStateList
    );
    const isJoinedAcademy = joinedAcademyList.length !== 0;

    return (
        <div className="exam_attender_state">
            <MenuBar_T
                centerMenu="시험응시 현황"
                isJoinedAcademy={isJoinedAcademy}
                history={history}
                match={match}
                location={location}
            />

            <ExamAttenderStateList
                joinedStudentList={joinedStudentList}
                attenderStateList={attenderStateList}
            />
        </div>
    );
};

export default ExamAttenderState;
