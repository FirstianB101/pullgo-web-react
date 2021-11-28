import React, { useState, useEffect, memo } from "react";
import axios from "axios";

const JoinedClassroomList = memo((props) => {
    const [joinedClassroomList, setJoinedClassroomList] = useState(
        props.joinedClassroomList
    );
    const [academyList, setAcademyList] = useState([]);
    const [teachersList, setTeachersList] = useState([]);

    const fetchAcademyByAcademyId = async (academyId) => {
        try {
            const response = await axios({
                method: "GET",
                url: `/v1/academies/${academyId}`
            });

            // 배열 state academyList에 academy 추가
            setAcademyList((prevAcademyList) => [
                ...prevAcademyList,
                response.data
            ]);
        } catch (error) {
            throw error;
        }
    };

    /* classroomId로 해당 반에 소속된 teachers (배열) 조회 */
    /* 한 classroom에 다수의 teacher 존재 가능 */
    const fetchTeachersByClassroomId = async (classroomId) => {
        try {
            const response = await axios({
                method: "GET",
                url: `/v1/teachers?classroomId=${classroomId}`
            });

            // 배열 state teachersList에 teachers 추가
            setTeachersList((prevTeachersList) => [
                ...prevTeachersList,
                response.data
            ]);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        // AcademyList에 해당 반의 학원, 선생님 추가
        if (joinedClassroomList.length !== 0) {
            joinedClassroomList.map((classroom) => {
                fetchAcademyByAcademyId(classroom.academyId);
                fetchTeachersByClassroomId(classroom.id);
            });
        }
    }, [joinedClassroomList]);

    /* classroomName, academyName, teacherName 표시 */
    const showClassroomListItems = () => {
        const listItems = [];

        for (let i = 0; i < joinedClassroomList.length; i++) {
            const classroom_week =
                joinedClassroomList[i].name.split(";");
            // 반 이름, 선생님 이름, 요일 => 세미콜론 기준으로 파싱
            let week = "";
            for (let j = 0; j < classroom_week[1]?.length; j++)
                week += classroom_week[1][j] + ", ";
            week = week.substring(0, week.length - 2);

            const element = (
                <div className="classroom_list_item">
                    <li key={joinedClassroomList[i].id}>
                        <span className="classroom_name">
                            {joinedClassroomList[i].name.split(";")[0]} 반
                        </span>
                        <span className="academy_name">
                            {academyList[i]?.name} 학원
                        </span>
                        <span className="teacher_name">
                            {joinedClassroomList[i].creator.account.fullName} 선생님
                        </span>
                        <span className="week">
                            {week}
                        </span>
                    </li>
                </div>
            );

            listItems.push(element);
        }

        return listItems;
    };

    return (
        <div className="joined_classroom_list">
            <h3>가입된 반 목록</h3>
            <ul>
                {
                    joinedClassroomList.length !== 0 ? (
                        showClassroomListItems()
                    ) : (
                        <span className="no_joined_classroom">
                            가입된 반이 없습니다!
                        </span>
                    )}
            </ul>
        </div>
    );
});

export default JoinedClassroomList;
