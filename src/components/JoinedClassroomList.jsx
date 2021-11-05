import React, { useState, useEffect, memo } from "react";
import axios from "axios";

const JoinedClassroomList = memo((props) => {
    const [isFetched, setIsFetched] = useState(false);
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

        setIsFetched(true);
    }, [joinedClassroomList]);

    /* classroomName, academyName, teacherName 표시 */
    const showClassroomListItems = () => {
        const listItems = [];

        for (let i = 0; i < joinedClassroomList.length; i++) {
            const classNameElement = <li>반: {joinedClassroomList[i].name}</li>;
            let academyNameElement;
            if (academyList[i])
                academyNameElement = (
                    <>
                        <span className="span_academy_name">
                            학원: {academyList[i].name}
                        </span>
                        <br />
                    </>
                );

            const teachersNameElement = [];
            if (teachersList[i]) {
                for (let j = 0; j < teachersList[i].length; j++) {
                    const teacherNameElement = (
                        <span className="span_teacher_name">
                            {j === 0 ? "선생님: " : ""}
                            {teachersList[i][j].account.fullName}
                            {j !== teachersList[i].length - 1 ? ", " : " "}
                        </span>
                    );
                    teachersNameElement.push(teacherNameElement);
                }
            }

            const item = (
                <div className="classroom_list_item">
                    {classNameElement}
                    {academyNameElement}
                    {teachersNameElement}
                </div>
            );

            listItems.push(item);
        }

        return listItems;
    };

    return (
        <div className="joined_classroom_list">
            <h3>가입된 반 목록</h3>
            <ul>
                {!isFetched ? (
                    <></>
                ) : joinedClassroomList.length !== 0 ? (
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
