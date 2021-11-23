import React, { memo } from "react";

/* student 1개를 인자로 받아서 student 정보 속성들을 파싱해서 객체로 return */
const parsingStudentInfo = (student) => {
    const studentId = student.id;
    const fullName = student.account.fullName;
    const schoolName = student.schoolName;
    const schoolYear = student.schoolYear;
    const phone = student.account.phone;
    const parentPhone = student.parentPhone;

    return {
        studentId,
        fullName,
        schoolName,
        schoolYear,
        phone,
        parentPhone
    };
};

const ExamAttenderStateList = ({ joinedStudentList, attenderStateList }) => {
    /* student의 AttenderState의 progress 속성에 따라 응시 상태 반환 */
    const getAttenderStateProgress = (studentId) => {
        const attenderState = attenderStateList.find(
            (attenderStateObj) => attenderStateObj.attenderId === studentId
        );

        if (attenderState == undefined)
            return {
                progress: "미응시"
            };

        if (attenderState.progress === "ONGOING")
            return { progress: "응시 중" };
        else if (attenderState.progress === "COMPLETE") {
            return {
                progress: "응시 완료",
                score: attenderState.score
            };
        }
    };

    const showStudentListItems = () => {
        const listItems = [];

        for (let i = 0; i < joinedStudentList.length; i++) {
            const studentInfo = parsingStudentInfo(joinedStudentList[i]);
            const attenderStateProgress = getAttenderStateProgress(
                joinedStudentList[i].id
            );

            const element = (
                <div className="div__student_list_menu">
                    <li key={joinedStudentList[i].id}>
                        {/* 학교, 학년 및 이름, 응시 상태 */}
                        <div className="student_list_info">
                            <div>
                                <span className="student_name">
                                    {studentInfo.fullName} 학생
                                </span>
                            </div>

                            <span className="school_name_year">
                                {studentInfo.schoolName}{" "}
                                {studentInfo.schoolYear}학년
                            </span>

                            <span className="attender_state_progress">
                                {attenderStateProgress.progress}
                            </span>
                            {attenderStateProgress.progress === "응시 완료" ? (
                                <span className="attender_state_score">
                                    {attenderStateProgress.score}점 / 100점
                                </span>
                            ) : null}
                        </div>
                    </li>
                </div>
            );

            listItems.push(element);
        }

        return listItems;
    };

    return (
        <div className="exam_attender_state_list">
            <ul className="ul__student_list">{showStudentListItems()}</ul>
        </div>
    );
};

export default ExamAttenderStateList;
