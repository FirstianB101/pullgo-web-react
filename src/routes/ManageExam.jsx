import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchExamList } from "../redux/fetchExamList";
import MenuBar_T from "../components/MenuBar_T";
import ManageClassroomMenuChips from "../components/ManageClassroomMenuChips";
import ManageExamList from "../components/ManageExamList";

import "../styles/ManageExam.css";

const ManageExam = memo(({ history, match, location }) => {
    // Query String Parsing 하여 객체화
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    const [classroomId, setClassroomId] = useState(query.id);
    // const [classroomId, setClassroomId] = useState(match.params.classroomId);

    const dispatch = useDispatch();
    const onFetchJoinedAcademyList = (userType, userId) => {
        console.log("onFetchJoinedAcademyList()");
        dispatch(apiFetchJoinedAcademyList(userType, userId));
    };
    const onFetchExamList = (classroomId) => {
        console.log("onFetchExamList()");
        dispatch(apiFetchExamList(classroomId));
    };

    const userType = useSelector((state) => state.userTypeReducer.userType);
    const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);

    useEffect(() => {
        console.log("ManageExam 렌더링");
        onFetchJoinedAcademyList(userType, teacherId);
    }, []);

    useEffect(() => {
        onFetchExamList(classroomId);
    }, [classroomId]);

    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const examList = useSelector((state) => state.examListReducer.examList);
    const isJoinedAcademy = joinedAcademyList.length !== 0;

    const rightMenu = <i class="fas fa-plus fa-lg"></i>;

    return (
        <div className="manage_exam">
            <MenuBar_T
                centerMenu="시험 관리"
                rightMenu={rightMenu}
                isJoinedAcademy={isJoinedAcademy}
                history={history}
                match={match}
                location={location}
            />

            <div className="wrapper__div__manage_exam_list">
                <ManageClassroomMenuChips
                    currentChipLabel="시험 관리"
                    history={history}
                    location={location}
                />

                {examList.length !== 0 ? (
                    <ManageExamList
                        examList={examList}
                        classroomId={classroomId}
                        history={history}
                    />
                ) : (
                    <h2 className="no_exam">등록된 시험이 없습니다!</h2>
                )}
            </div>
        </div>
    );
});

export default ManageExam;
