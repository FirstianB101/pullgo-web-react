import React, { memo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

/* exam 1개를 인자로 받아서 exam 정보 속성들을 파싱해서 객체로 return */
const parsingExamInfo = (exam) => {
    const examId = exam.id;
    const examName = exam.name;
    const beginDateTime = exam.beginDateTime
        .replaceAll("-", "/")
        .replace("T", " ")
        .substring(0, 16);
    const endDateTime = exam.endDateTime
        .replaceAll("-", "/")
        .replace("T", " ")
        .substring(0, 16);
    let timeLimit = exam.timeLimit.replace("PT", "");
    timeLimit = timeLimit.includes("S")
        ? timeLimit.substring(0, timeLimit.indexOf("M") + 1) // "S" (초) 제거
        : timeLimit;
    timeLimit = timeLimit.replace("H", "시간 ").replace("M", "분").trim();
    const passScore = exam.passScore;
    const cancelled = exam.cancelled;
    const finished = exam.finished;

    return {
        examId,
        examName,
        beginDateTime,
        endDateTime,
        timeLimit,
        passScore,
        cancelled,
        finished
    };
};

const AssignedExamList = ({
    examList,
    completedExamIdList,
    joinedAcademyList,
    joinedClassroomList,
    history
}) => {
    const studentId = useSelector((state) => state.studentIdReducer.studentId);
    const authToken = useSelector((state) => state.authTokenReducer.authToken);

    const showExamListItems = () => {
        const listItems = [];

        for (let i = 0; i < examList.length; i++) {
            const examInfo = parsingExamInfo(examList[i]);
            // 학생이 이미 응시한 시험인지 여부
            const isCompletedExam = completedExamIdList.includes(
                examList[i].id
            );

            /* classroomName, academyName 찾기 */
            const classroomObj = joinedClassroomList.find(
                (classroom) => classroom.id == examList[i].classroomId
            );

            if (classroomObj == undefined) return;

            const classroomName = classroomObj.name.split(";")[0];
            const academyName = joinedAcademyList.find(
                (academy) => academy.id == classroomObj.academyId
            ).name;

            const element = (
                <div className="div__exam_list_menu div__assigned_exam_list_menu">
                    <li key={examList[i].id}>
                        <div className="academy_classroom_name">
                            <span>학원: {academyName}</span>
                            <span>반: {classroomName}</span>
                        </div>

                        {/* 시험 정보 */}
                        <div className="exam_list_info">
                            <div className="exam_name_date">
                                <span className="exam_name">
                                    {examInfo.examName}
                                </span>
                                <span className="begin_end_date_time">
                                    {examInfo.beginDateTime} ~{" "}
                                    {examInfo.endDateTime}
                                </span>
                            </div>

                            <div className="time_limit_pass_score">
                                <span className="time_limit">
                                    제한 시간: {examInfo.timeLimit}
                                </span>
                                <span className="pass_score">
                                    기준 점수: {examInfo.passScore}점
                                </span>
                            </div>

                            <span className="cancelled">
                                {examInfo.cancelled
                                    ? "시험이 취소 되었습니다."
                                    : ""}
                            </span>
                            <span className="finished">
                                {examInfo.finished
                                    ? "시험이 종료 되었습니다."
                                    : ""}
                            </span>
                        </div>

                        {!examInfo.cancelled &&
                            !examInfo.finished &&
                            !isCompletedExam ? (
                            <button
                                className="btn__take_exam"
                                onClick={(e) =>
                                    onClickBtnTakeExam(
                                        examList[i].id,
                                        examList[i].name,
                                        e
                                    )
                                }
                            >
                                시험 응시
                            </button>
                        ) : null}
                    </li>
                </div>
            );

            listItems.push(element);
        }

        return listItems;
    };

    /* 시험 응시 button 클릭 */
    const onClickBtnTakeExam = async (examId, examName, e) => {
        let confirmTakeExam = window.confirm(
            `${examName} 시험을 응시 하시겠습니까?`
        );
        if (!confirmTakeExam) return;

        // AttenderState 생성 POST (시험 응시 시작)
        const postCreateAttenderState = async () => {
            try {
                const response = await axios.post(
                    "/v1/exam/attender-states",
                    {
                        attenderId: studentId,
                        examId
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    }
                );
            } catch (e) {
                alert("토큰 만료. 로그인 페이지로 이동");
                console.log(e);
            }
        };

        await postCreateAttenderState(studentId, examId);
        alert("시험을 시작합니다.");

        history.push(`/student/take_exam/exam?id=${examId}`);
    };

    return (
        <div className="div__manage_exam_list">
            <ul className="ul__exam_list">{showExamListItems()}</ul>
        </div>
    );
};

export default AssignedExamList;
