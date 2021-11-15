import React, { useState, useEffect, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchExamQuestionList } from "../redux/fetchExamQuestionList";
import MenuBar_T from "../components/MenuBar_T";
import CreateEditExamQuestion from "../components/CreateEditExamQuestion";

// Pagination
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// Floating Action Button
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

// css

const ManageExamQuestion = ({ history, match, location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    const [examId, setExamId] = useState(query.id);
    const [isInitialized, setIsInitialized] = useState(false);
    // questionList가 최초 초기화되었는지를 나타내는 flag 함수

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
    const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);

    useEffect(() => {
        console.log("ManageExamQuestion 렌더링");
        onFetchJoinedAcademyList(userType, teacherId);
    }, []);

    useEffect(() => {
        onFetchExamQuestionList(examId);
    }, [examId]);

    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const isJoinedAcademy = joinedAcademyList.length !== 0;

    // state: 현재 작업 중인 전체 문제 리스트, 현재 문제 번호
    const [questionList, setQuestionList] = useState(
        useSelector((state) => state.examQuestionListReducer.questionList)
    );
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // DELETE 할 문제 id 목록들
    const [deletedQuestionIdList, setDeletedQuestionIdList] = useState([]);

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

    /* 현재까지 수정, 추가한 문제들 모두 POST 또는 PATCH */
    const onClickBtnSave = (e) => {
        alert("저장");
    };

    /* 현재까지 작업한 문제들 모두 폐기 (서버에 저장된 question 그대로 유지) */
    const onClickBtnCancel = (e) => {
        alert("취소");
    };

    /* 현재 보고있는 문제 DELETE */
    const onClickBtnDeleteQuestion = (e) => {
        let newIndex = currentQuestionIndex - 1;
        if (newIndex == 0 && questionList.length > 1) newIndex = 1;

        // 0이 되면, 등록된 시험 문제 없는 것으로 예외처리
        setCurrentQuestionIndex(newIndex);

        if (newIndex === 0) setQuestionList([]);
        else
            setQuestionList([
                ...questionList.slice(0, currentQuestionIndex - 1),
                ...questionList.slice(currentQuestionIndex, questionList.length)
            ]);

        // 삭제 선택한 question이 서버에 등록된 question인 경우 (questionId 존재)
        if (questionList[currentQuestionIndex - 1]?.id != undefined) {
            setDeletedQuestionIdList([
                ...deletedQuestionIdList,
                questionList[currentQuestionIndex - 1].id
            ]);
            // 삭제할 questionId 배열에 저장
        }
    };

    /* 문제 추가 */
    const onClickBtnAddQuestion = (e) => {
        // 새로 추가한 문제(마지막 문제)로 이동
        setCurrentQuestionIndex(questionList.length + 1);
        setQuestionList([...questionList, {}]); // 빈 객체

        // const newQuestion = {
        //     questionIndex: questionList.length + 1
        // };
        // setQuestionList([...questionList, newQuestion]);
    };

    return (
        <div className="manage_exam_question">
            <MenuBar_T
                centerMenu="시험 문제 관리"
                isJoinedAcademy={isJoinedAcademy}
                history={history}
                match={match}
                location={location}
            />

            <h2>문제 {currentQuestionIndex}번</h2>

            <Stack spacing={2}>
                <Pagination
                    count={questionList.length}
                    page={currentQuestionIndex}
                    onChange={onChangePagination}
                    color="primary"
                />
            </Stack>

            <div className="floating_action_buttons">
                <Box sx={{ "& > :not(style)": { m: 1 } }}>
                    {/* <Fab variant="extended" onClick={onClickBtnSave}>
                        저 장
                    </Fab> */}
                    {/* <Fab variant="extended" onClick={onClickBtnCancel}>
                        취 소
                    </Fab> */}
                    <Fab
                        color="primary"
                        aria-label="edit"
                        onClick={onClickBtnDeleteQuestion}
                        disabled={questionList.length === 0}
                    >
                        <DeleteForeverOutlinedIcon fontSize="large" />
                    </Fab>
                    <Fab
                        color="primary"
                        aria-label="add"
                        onClick={onClickBtnAddQuestion}
                    >
                        <AddIcon />
                    </Fab>
                </Box>
            </div>

            {questionList.length !== 0 ? (
                <CreateEditExamQuestion
                    // currentQuestion={questionList[currentQuestionIndex - 1]}
                    currentQuestionIndex={currentQuestionIndex}
                    questionList={questionList}
                    setQuestionList={setQuestionList}
                />
            ) : (
                <h2>출제한 문제가 없습니다!</h2>
            )}

            {/* 현재까지 작업한 문제들 생성/수정/삭제 */}
            <button>제출</button>
            {/* 현재까지 작업한 문제들 폐기(모두 취소) */}
            <button onClick={onClickBtnCancel}>취소</button>

            {/* 문제 추가 또는 수정 */}
            {/* {currentQuestionIndex > 0 &&
            // Object.keys(questionList[currentQuestionIndex - 1]).length === 0 ?
            Object.keys(questionList[currentQuestionIndex - 1]).length === 1 ? (
                <h2>문제 추가</h2>
            ) : (
                <h2>문제 수정</h2>
            )} */}
        </div>
    );
};

export default ManageExamQuestion;
