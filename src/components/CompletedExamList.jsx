import React, { memo } from "react";

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

const CompletedExamList = ({
    completedExamList,
    joinedAcademyList,
    joinedClassroomList,
    history
}) => {
    const showExamListItems = () => {
        const listItems = [];

        for (let i = 0; i < completedExamList.length; i++) {
            const examInfo = parsingExamInfo(completedExamList[i]);

            /* classroomName, academyName 찾기 */
            const classroomObj = joinedClassroomList.find(
                (classroom) => classroom.id == completedExamList[i].classroomId
            );
            const classroomName = classroomObj.name.split(";")[0];
            const academyName = joinedAcademyList.find(
                (academy) => academy.id == classroomObj.academyId
            ).name;

            const element = (
                <div className="div__exam_list_menu div__completed_exam_list_menu">
                    <li key={completedExamList[i].id}>
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

                        <button
                            className="btn__review_exam"
                            onClick={(e) =>
                                onClickBtnReviewExam(completedExamList[i].id, e)
                            }
                        >
                            오답노트 확인
                        </button>
                    </li>
                </div>
            );

            listItems.push(element);
        }

        return listItems;
    };

    /* 오답노트 확인 button 클릭 */
    const onClickBtnReviewExam = (examId, e) => {
        history.push(`/student/review_exam/exam?id=${examId}`);
    };

    return (
        <div className="div__manage_exam_list">
            <ul className="ul__exam_list">{showExamListItems()}</ul>
        </div>
    );
};

export default CompletedExamList;
