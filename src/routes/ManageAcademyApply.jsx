import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchAcademyAppliedStudentList } from "../redux/fetchAcademyAppliedStudentList";
import { apiFetchAcademyAppliedTeacherList } from "../redux/fetchAcademyAppliedTeacherList";
import MenuBar_T from "../components/MenuBar_T";
import ManageAcademyMenuChips from "../components/ManageAcademyMenuChips";
import AcademyAppliedStudentList from "../components/AcademyAppliedStudentList";
import AcademyAppliedTeacherList from "../components/AcademyAppliedTeacherList";

import "../styles/ManageAcademyApply.css";

const ManageAcademyApply = ({ history, match, location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    const [academyId, setAcademyId] = useState(query.id);
    const [academy, setAcademy] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    // 원장 권한(구성원 관리, 권한 위임, 학원 수정 및 삭제) 여부

    const dispatch = useDispatch();
    const onFetchJoinedAcademyList = (userType, userId) => {
        console.log("onFetchJoinedAcademyList()");
        dispatch(apiFetchJoinedAcademyList(userType, userId));
    };
    const onFetchAcademyAppliedStudentList = (academyId) => {
        console.log("onFetchAcademyAppliedStudentList()");
        dispatch(apiFetchAcademyAppliedStudentList(academyId));
    };
    const onFetchAcademyAppliedTeacherList = (academyId) => {
        console.log("onFetchAcademyAppliedTeacherList()");
        dispatch(apiFetchAcademyAppliedTeacherList(academyId));
    };

    const userType = useSelector((state) => state.userTypeReducer.userType);
    const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);
    const authToken = useSelector((state) => state.authTokenReducer.authToken);

    useEffect(() => {
        console.log("ManageAcademyApply 렌더링");
        onFetchJoinedAcademyList(userType, teacherId);
    }, []);

    useEffect(() => {
        onFetchAcademyAppliedStudentList(academyId);
        onFetchAcademyAppliedTeacherList(academyId);
    }, [academyId]);

    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const appliedStudentList = useSelector(
        (state) => state.academyAppliedStudentListReducer.appliedStudentList
    );
    const appliedTeacherList = useSelector(
        (state) => state.academyAppliedTeacherListReducer.appliedTeacherList
    );
    const isJoinedAcademy = joinedAcademyList.length !== 0;

    const checkedStudentId = useSelector(
        (state) =>
            state.academyAppliedCheckedStudentListReducer.checkedStudentList
    );
    const checkedTeacherId = useSelector(
        (state) =>
            state.academyAppliedCheckedTeacherListReducer.checkedTeacherList
    );

    useEffect(() => {
        if (joinedAcademyList.length === 0) return;

        const currentAcademy = joinedAcademyList.find(
            (academy) => academy.id == academyId
        );
        if (currentAcademy != undefined) setAcademy(currentAcademy);
    }, [academyId, joinedAcademyList]);

    useEffect(() => {
        if (academy === null) return;
        setHasPermission(teacherId == academy.ownerId);
    }, [teacherId, academy]);

    const onClickBatchAccept = async (e) => {
        const postAcceptUser = async (userType, userId) => {
            const body =
                userType === "student"
                    ? { studentId: userId }
                    : { teacherId: userId };

            try {
                const response = await axios.post(
                    `/v1/academies/${academyId}/accept-${userType}`,
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

        if (checkedStudentId.length === 0 && checkedTeacherId.length === 0)
            return;

        let confirmBatchAccept = window.confirm(
            "선택하신 사용자들의 학원 가입을 승인 하시겠습니까?"
        );
        if (!confirmBatchAccept) return;

        for (let i = 0; i < checkedStudentId.length; i++)
            await postAcceptUser("student", checkedStudentId[i]);

        for (let i = 0; i < checkedTeacherId.length; i++)
            await postAcceptUser("teacher", checkedTeacherId[i]);

        // 페이지 새로고침
        window.location.replace(
            `/teacher/manage_academy_apply/academy?id=${academyId}`
        );
    };

    const onClickBatchReject = async (e) => {
        const postRejectUser = async (userType, userId) => {
            try {
                const response = await axios.post(
                    `/v1/${userType}s/${userId}/remove-applied-academy`,
                    {
                        academyId
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

        if (checkedStudentId.length === 0 && checkedTeacherId.length === 0)
            return;

        let confirmBatchReject = window.confirm(
            "선택하신 사용자들의 학원 가입을 거절 하시겠습니까?"
        );
        if (!confirmBatchReject) return;

        for (let i = 0; i < checkedStudentId.length; i++)
            await postRejectUser("student", checkedStudentId[i]);

        for (let i = 0; i < checkedTeacherId.length; i++)
            await postRejectUser("teacher", checkedTeacherId[i]);

        // 페이지 새로고침
        window.location.replace(
            `/teacher/manage_academy_apply/academy?id=${academyId}`
        );
    };

    return (
        <div className="manage_academy_apply">
            <MenuBar_T
                centerMenu="학원 요청 관리"
                isJoinedAcademy={isJoinedAcademy}
                history={history}
                match={match}
            />

            <div className="wrapper__div__manage_academy_apply">
                <ManageAcademyMenuChips
                    currentChipLabel="요청 관리"
                    hasPermission={hasPermission}
                    history={history}
                    location={location}
                />

                <div className="academy_applied_user_list">
                    {appliedStudentList.length !== 0 ? (
                        <AcademyAppliedStudentList
                            academyId={academyId}
                            appliedStudentList={appliedStudentList}
                        />
                    ) : (
                        <>
                            <h2>학생</h2>
                            <h2 className="no_student">
                                학원에 가입 요청한 학생이 없습니다!
                            </h2>
                        </>
                    )}

                    {appliedTeacherList.length !== 0 ? (
                        <AcademyAppliedTeacherList
                            academyId={academyId}
                            appliedTeacherList={appliedTeacherList}
                        />
                    ) : (
                        <>
                            <h2>선생님</h2>
                            <h2 className="no_teacher">
                                학원에 가입 요청한 선생님이 없습니다!
                            </h2>
                        </>
                    )}

                    {appliedStudentList.length !== 0 ||
                        appliedTeacherList.length !== 0 ? (
                        <div className="academy_apply_batch_buttons">
                            <button
                                onClick={onClickBatchAccept}
                                className="btn__batch_accept"
                            >
                                일괄 승인
                            </button>
                            <button
                                onClick={onClickBatchReject}
                                className="btn__batch_reject"
                            >
                                일괄 거절
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageAcademyApply;
