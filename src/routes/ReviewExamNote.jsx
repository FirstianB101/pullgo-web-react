import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchExamQuestionList } from "../redux/fetchExamQuestionList";
import MenuBar_S from "../components/MenuBar_S";
import ReviewExamNoteQuestion from "../components/ReviewExamNoteQuestion";

// Pagination
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// import "../styles/ReviewExamNote.css";

const ReviewExamNote = ({ history, match, location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    const [examId, setExamId] = useState(query.id);
    const [isInitialized, setIsInitialized] = useState(false);
    // questionList가 최초 초기화되었는지를 나타내는 flag 변수

    const dispatch = useDispatch();
    const onFetchJoinedAcademyList = (userType, userId) => {
        console.log("onFetchJoinedAcademyList()");
        dispatch(apiFetchJoinedAcademyList(userType, userId));
    };
    const onFetchExamQuestionList = (examId) => {
        console.log("onFetchExamQuestionList()");
        dispatch(apiFetchExamQuestionList(examId));
    };

    const userType = useSelector((state) => state.userTypeReducer.userType);
    const studentId = useSelector((state) => state.studentIdReducer.studentId);

    useEffect(() => {
        console.log("ReviewExamNote 렌더링");
        onFetchJoinedAcademyList(userType, studentId);
    }, []);

    useEffect(() => {
        onFetchExamQuestionList(examId);
    }, [examId]);

    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const isJoinedAcademy = joinedAcademyList.length !== 0;

    const [questionList, setQuestionList] = useState(
        useSelector((state) => state.examQuestionListReducer.questionList)
    );
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // currentQuestionIndex 초기화
    useEffect(() => {
        if (isInitialized) return;

        if (questionList.length !== 0) setCurrentQuestionIndex(1);
        setIsInitialized(true);
    }, [questionList]);

    /* 문제 번호들 Pagination을 통해 문제 이동 */
    const onChangePagination = (e, value) => {
        setCurrentQuestionIndex(value);
    };

    return (
        <>
            <MenuBar_S
                centerMenu="오답노트"
                isJoinedAcademy={isJoinedAcademy}
                history={history}
                match={match}
                location={location}
            />

            <div className="manage_exam_question">
                <div className="question_number_group">
                    <h2 className="question_number">
                        문제 {currentQuestionIndex}번
                    </h2>

                    <div className="question_number_pagination">
                        <Stack spacing={2}>
                            <Pagination
                                count={questionList.length}
                                page={currentQuestionIndex}
                                onChange={onChangePagination}
                                color="primary"
                            />
                        </Stack>
                    </div>
                </div>

                <ReviewExamNoteQuestion
                    currentQuestionIndex={currentQuestionIndex}
                    questionList={questionList}
                />
            </div>
        </>
    );
};

export default ReviewExamNote;
