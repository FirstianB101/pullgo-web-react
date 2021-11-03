import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchStudentListByClassroomId } from "../redux/fetchStudentListByClassroomId";
import MenuBar_T from "../components/MenuBar_T";
import ManageClassroomMenuChips from "../components/ManageClassroomMenuChips";
import ManageStudentList from "../components/ManageStudentList";

import "../styles/ManageStudent.css";
import "../styles/ManageClassroomMenuChips.css";

const ManageStudent = ({ history, match, location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    const [classroomId, setClassroomId] = useState(query.id);

    const dispatch = useDispatch();
    const onFetchJoinedAcademyList = (userType, userId) => {
        console.log("onFetchJoinedAcademyList()");
        dispatch(apiFetchJoinedAcademyList(userType, userId));
    };
    const onFetchStudentListByClassroomId = (classroomId) => {
        console.log("onFetchStudentListByClassroomId()");
        dispatch(apiFetchStudentListByClassroomId(classroomId));
    };

    const userType = useSelector((state) => state.userTypeReducer.userType);
    const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);

    useEffect(() => {
        console.log("ManageStudent 렌더링");
        onFetchJoinedAcademyList(userType, teacherId);
    }, []);

    useEffect(() => {
        onFetchStudentListByClassroomId(classroomId);
    }, [classroomId]);

    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const studentList = useSelector(
        (state) => state.studentListByClassroomIdReducer.studentList
    );
    const isJoinedAcademy = joinedAcademyList.length !== 0;

    return (
        <div className="manage_student">
            <MenuBar_T
                centerMenu="학생 관리"
                isJoinedAcademy={isJoinedAcademy}
                history={history}
                match={match}
            />

            <ManageClassroomMenuChips
                currentChipLabel="학생 관리"
                history={history}
                location={location}
            />

            {studentList.length !== 0 ? (
                <ManageStudentList
                    classroomId={classroomId}
                    studentList={studentList}
                />
            ) : (
                <h2 className="no_student">반에 가입된 학생이 없습니다!</h2>
            )}
        </div>
    );
};

export default ManageStudent;
