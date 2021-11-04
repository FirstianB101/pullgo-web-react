import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchClassroomAppliedStudentList } from "../redux/fetchClassroomAppliedStudentList";
import { apiFetchClassroomAppliedTeacherList } from "../redux/fetchClassroomAppliedTeacherList";
import MenuBar_T from "../components/MenuBar_T";
import ManageClassroomMenuChips from "../components/ManageClassroomMenuChips";
import ClassroomAppliedStudentList from "../components/ClassroomAppliedStudentList";
import ClassroomAppliedTeacherList from "../components/ClassroomAppliedTeacherList";

// import "../styles/ManageclassroomApply.css";
import "../styles/ManageClassroomMenuChips.css";

const ManageClassroomApply = ({ history, match, location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    const [classroomId, setClassroomId] = useState(query.id);

    const dispatch = useDispatch();
    const onFetchJoinedAcademyList = (userType, userId) => {
        console.log("onFetchJoinedAcademyList()");
        dispatch(apiFetchJoinedAcademyList(userType, userId));
    };
    const onFetchClassroomAppliedStudentList = (classroomId) => {
        console.log("onFetchClassroomAppliedStudentList()");
        dispatch(apiFetchClassroomAppliedStudentList(classroomId));
    };
    const onFetchClassroomAppliedTeacherList = (classroomId) => {
        console.log("onFetchClassroomAppliedTeacherList()");
        dispatch(apiFetchClassroomAppliedTeacherList(classroomId));
    };

    const userType = useSelector((state) => state.userTypeReducer.userType);
    const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);

    useEffect(() => {
        console.log("ManageClassroomApply 렌더링");
        onFetchJoinedAcademyList(userType, teacherId);
    }, []);

    useEffect(() => {
        onFetchClassroomAppliedStudentList(classroomId);
        onFetchClassroomAppliedTeacherList(classroomId);
    }, [classroomId]);

    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const appliedStudentList = useSelector(
        (state) => state.classroomAppliedStudentListReducer.appliedStudentList
    );
    const appliedTeacherList = useSelector(
        (state) => state.classroomAppliedTeacherListReducer.appliedTeacherList
    );
    const isJoinedAcademy = joinedAcademyList.length !== 0;

    return (
        <div className="manage_classroom_apply">
            <MenuBar_T
                centerMenu="요청 관리"
                isJoinedAcademy={isJoinedAcademy}
                history={history}
                match={match}
            />

            <ManageClassroomMenuChips
                currentChipLabel="요청 관리"
                history={history}
                location={location}
            />

            <div className="classroom_applied_user_list">
                {appliedStudentList.length !== 0 ? (
                    <ClassroomAppliedStudentList
                        classroomId={classroomId}
                        appliedStudentList={appliedStudentList}
                    />
                ) : (
                    <>
                        <h2>학생</h2>
                        <h2 className="no_student">
                            반에 가입 요청한 학생이 없습니다!
                        </h2>
                    </>
                )}

                <br />
                <br />
                <br />

                <ClassroomAppliedTeacherList
                    classroomId={classroomId}
                    appliedTeacherList={appliedTeacherList}
                />

                <br />
                <br />
                <br />

                <button>일괄 승인</button>
                <button>일괄 거절</button>
            </div>
        </div>
    );
};

export default ManageClassroomApply;
