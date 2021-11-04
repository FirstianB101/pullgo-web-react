import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
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
    const authToken = useSelector((state) => state.authTokenReducer.authToken);

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

    const checkedStudentId = useSelector(
        (state) =>
            state.classroomAppliedCheckedStudentListReducer.checkedStudentList
    );
    const checkedTeacherId = useSelector(
        (state) =>
            state.classroomAppliedCheckedTeacherListReducer.checkedTeacherList
    );

    const onClickBatchAccept = async (e) => {
        const postAcceptUser = async (userType, userId) => {
            const body =
                userType === "student"
                    ? { studentId: userId }
                    : { teacherId: userId };

            try {
                const response = await axios.post(
                    `/v1/academy/classrooms/${classroomId}/accept-${userType}`,
                    body,
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

        for (let i = 0; i < checkedStudentId.length; i++)
            await postAcceptUser("student", checkedStudentId[i]);

        for (let i = 0; i < checkedTeacherId.length; i++)
            await postAcceptUser("teacher", checkedTeacherId[i]);

        // 페이지 새로고침
        window.location.replace(
            `/teacher/manage_classroom_apply/classroom?id=${classroomId}`
        );
    };

    const onClickBatchReject = async (e) => {
        const postRejectUser = async (userType, userId) => {
            try {
                const response = await axios.post(
                    `/v1/${userType}s/${userId}/remove-applied-classroom`,
                    {
                        classroomId
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

        for (let i = 0; i < checkedStudentId.length; i++)
            await postRejectUser("student", checkedStudentId[i]);

        for (let i = 0; i < checkedTeacherId.length; i++)
            await postRejectUser("teacher", checkedTeacherId[i]);

        // 페이지 새로고침
        window.location.replace(
            `/teacher/manage_classroom_apply/classroom?id=${classroomId}`
        );
    };

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

                {appliedTeacherList.length !== 0 ? (
                    <ClassroomAppliedTeacherList
                        classroomId={classroomId}
                        appliedTeacherList={appliedTeacherList}
                    />
                ) : (
                    <>
                        <h2>선생님</h2>
                        <h2 className="no_teacher">
                            반에 가입 요청한 선생님이 없습니다!
                        </h2>
                    </>
                )}

                <br />
                <br />
                <br />

                {appliedStudentList.length !== 0 ||
                appliedTeacherList.length !== 0 ? (
                    <>
                        <button onClick={onClickBatchAccept}>일괄 승인</button>
                        <button onClick={onClickBatchReject}>일괄 거절</button>
                    </>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default ManageClassroomApply;
