import React, { memo } from "react";

const ManageClassroomList = memo(
    ({ joinedAcademyList, joinedClassroomList, history }) => {
        const showClassroomListItems = () => {
            const listItems = [];

            for (let i = 0; i < joinedClassroomList.length; i++) {
                const academyName = getAcademyName(
                    joinedClassroomList[i].academyId
                );
                const classroom_teacher_week =
                    joinedClassroomList[i].name.split(";");
                // 반 이름, 선생님 이름, 요일 => 세미콜론 기준으로 파싱

                const classroomName = classroom_teacher_week[0];
                const teacherName = classroom_teacher_week[1];
                // const week = classroom_teacher_week[2];
                let week = "";
                for (let j = 0; j < classroom_teacher_week[2].length; j++)
                    week += classroom_teacher_week[2][j] + ", ";
                week = week.substring(0, week.length - 2);

                const element = (
                    <div className="div__classroom_list_menu">
                        <li
                            key={joinedClassroomList[i].id}
                            onClick={() =>
                                history.push(
                                    `/teacher/manage_exam/classroom?id=${joinedClassroomList[i].id}`
                                )
                            }
                        >
                            <span className="classroom_name">
                                {classroomName} 반
                            </span>
                            <span className="academy_name">
                                {academyName} 학원
                            </span>
                            <span className="teacher_name">
                                {teacherName} 선생님
                            </span>
                            <span className="week">{week}</span>
                        </li>
                    </div>
                );

                listItems.push(element);
            }

            return listItems;
        };

        /* academyId로 academyName 검색 */
        const getAcademyName = (academyId) => {
            return joinedAcademyList.find((academy) => academy.id === academyId)
                ?.name;
        };

        return (
            <div className="manage_classroom_list">
                <ul className="ul__classroom_list">
                    {showClassroomListItems()}
                </ul>
            </div>
        );
    }
);

export default ManageClassroomList;
