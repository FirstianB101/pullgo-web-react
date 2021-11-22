import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";

import { apiFetchExamQuestionList } from "../redux/fetchExamQuestionList";
import TakeExamQuestion from "../components/TakeExamQuestion";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// import "../styles/TakeExam.css";

const TakeExam = ({ history, match, location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    const [examId, setExamId] = useState(query.id);
    const [isInitialized, setIsInitialized] = useState(false);
    // questionList가 최초 초기화되었는지를 나타내는 flag 변수

    const dispatch = useDispatch();
    const onFetchExamQuestionList = (examId) => {
        console.log("onFetchExamQuestionList()");
        dispatch(apiFetchExamQuestionList(examId));
    };

    const studentId = useSelector((state) => state.studentIdReducer.studentId);
    const authToken = useSelector((state) => state.authTokenReducer.authToken);

    useEffect(() => {
        onFetchExamQuestionList(examId);
    }, [examId]);

    // 문제 리스트, 현재 문제 번호
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

    /* 저장된 문제들 제출 */
    const onClickBtnSubmit = async (e) => {
        alert("저장된 문제들 제출");
    };

    return (
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

            <TakeExamQuestion
                currentQuestionIndex={currentQuestionIndex}
                questionList={questionList}
            />

            <div className="div__btn__submit">
                <button
                // onClick={}
                >
                    저 장
                </button>
                <button onClick={onClickBtnSubmit}>제 출</button>
            </div>
        </div>
    );
};

export default TakeExam;
