import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchJoinedClassroomList } from "../redux/fetchJoinedClassroomList";
import { apiFetchExamListByStudentId } from "../redux/fetchExamListByStudentId";
import { apiFetchAttenderStateListByStudentId } from "../redux/fetchAttenderStateListByStudentId";
import MenuBar_S from "../components/MenuBar_S";
import CompletedExamList from "../components/CompletedExamList";

import "../styles/CompletedExam.css";

const CompletedExam = ({ history, match, location }) => {
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
    const onFetchAttenderStateListByStudentId = (studentId) => {
        console.log("onFetchAttenderStateListByStudentId()");
        dispatch(apiFetchAttenderStateListByStudentId(studentId));
    };

    const userType = useSelector((state) => state.userTypeReducer.userType);
    const studentId = useSelector((state) => state.studentIdReducer.studentId);

    useEffect(() => {
        console.log("CompletedExam 렌더링");
        onFetchJoinedAcademyList(userType, studentId);
        onFetchJoinedClassroomList(userType, studentId);
    }, []);

    useEffect(() => {
        onFetchExamListByStudentId(studentId);
        onFetchAttenderStateListByStudentId(studentId);
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
    const attenderStateList = useSelector(
        (state) => state.attenderStateListByStudentIdReducer.attenderStateList
    );
    const isJoinedAcademy = joinedAcademyList.length !== 0;

    // 응시 완료 "COMPLETE" 상태만 존재하는 attenderStateList
    const [completedAttenderStateList, setCompletedAttenderStateList] =
        useState([]);
    // 응시 완료 "COMPLETE" 상태만 존재하는 examList (examList와 completedAttenderStateList 비교)
    const [completedExamList, setCompletedExamList] = useState([]);

    /* completedAttenderStateList 찾기 */
    useEffect(() => {
        if (attenderStateList.length === 0) return;

        const completedList = attenderStateList.filter(
            (attenderState) => attenderState.progress == "COMPLETE"
        );
        setCompletedAttenderStateList([...completedList]);
    }, [attenderStateList]);

    /* completedExamList 찾기 */
    useEffect(() => {
        if (examList.length === 0 || completedAttenderStateList.length === 0)
            return;

        const completedList = [];
        for (let i = 0; i < examList.length; i++) {
            for (let j = 0; j < completedAttenderStateList.length; j++) {
                // examId 같은 것 찾기
                if (examList[i].id == completedAttenderStateList[j].examId) {
                    completedList.push(examList[i]);
                    break;
                }
            }
        }

        setCompletedExamList([...completedList]);
    }, [examList, completedAttenderStateList]);

    return (
        <div className="completed_exam">
            <MenuBar_S
                centerMenu="응시완료 시험 목록"
                isJoinedAcademy={isJoinedAcademy}
                history={history}
                match={match}
                location={location}
            />

            {completedExamList.length !== 0 ? (
                <CompletedExamList
                    completedExamList={completedExamList}
                    joinedAcademyList={joinedAcademyList}
                    joinedClassroomList={joinedClassroomList}
                    history={history}
                />
            ) : (
                <h2 className="no_completed_exam">
                    응시 완료한 시험이 없습니다!
                </h2>
            )}
        </div>
    );
};

export default CompletedExam;
