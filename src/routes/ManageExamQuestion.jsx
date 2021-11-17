import React, { useState, useEffect, memo } from "react";
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

import "../styles/ManageExamQuestion.css";

const deleteQuestion = async (questionId, authToken) => {
    try {
        const response = await axios.delete(
            `/v1/exam/questions/${questionId}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        // if (response.status == 204)
        //     alert("");
    } catch (e) {
        alert("토큰 만료. 로그인 페이지로 이동");
        console.log(e);
    }
};

const postCreateQuestion = async (examId, question, authToken) => {
    try {
        const response = await axios.post(
            "/v1/exam/questions",
            {
                examId,
                content: question.content,
                pictureUrl: question.pictureUrl,
                answer: question.answer,
                choice: question.choice
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

const patchQuestion = async (questionId, question, authToken) => {
    try {
        const response = await axios.patch(
            `/v1/exam/questions/${questionId}`,
            {
                content: question.content,
                pictureUrl: question.pictureUrl,
                answer: question.answer,
                choice: question.choice
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
    const authToken = useSelector((state) => state.authTokenReducer.authToken);

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

    /* 현재까지 작업한 문제들 모두 DELETE, POST, PATCH */
    const onClickBtnSubmit = async (e) => {
        // 문제 정보가 덜 입력된 문제 번호 배열
        const unfilledQuestionNumber = [];
        for (let i = 0; i < questionList.length; i++) {
            if (Object.keys(questionList[i]).length === 0) {
                unfilledQuestionNumber.push(i + 1);
                continue;
            }
            if (
                questionList[i]?.content == undefined ||
                questionList[i]?.content == ""
            ) {
                unfilledQuestionNumber.push(i + 1);
                continue;
            }
            if (questionList[i]?.answer.length === 0) {
                unfilledQuestionNumber.push(i + 1);
                continue;
            }
            if (
                questionList[i]?.choice == undefined ||
                questionList[i]?.choice[1] == "" ||
                questionList[i]?.choice[2] == "" ||
                questionList[i]?.choice[3] == "" ||
                questionList[i]?.choice[4] == "" ||
                questionList[i]?.choice[5] == ""
            ) {
                unfilledQuestionNumber.push(i + 1);
                continue;
            }
        }

        if (unfilledQuestionNumber.length !== 0) {
            alert(
                `${unfilledQuestionNumber.toString()}번 문제의 정보가 덜 입력되었습니다.\n문제 정보를 입력하거나 문제를 삭제 해주세요.`
            );
            return;
        }

        let confirmSubmit = window.confirm("시험 문제들을 출제 하시겠습니까?");
        if (!confirmSubmit) return;

        // DELETE
        for (let i = 0; i < deletedQuestionIdList.length; i++) {
            await deleteQuestion(deletedQuestionIdList[i], authToken);
        }

        // POST, PATCH
        for (let i = 0; i < questionList.length; i++) {
            // questionId가 있으면 PATCH, 없으면 POST
            if (questionList[i]?.id == undefined)
                await postCreateQuestion(examId, questionList[i], authToken);
            else
                await patchQuestion(
                    questionList[i].id,
                    questionList[i],
                    authToken
                );
        }

        alert("시험 문제를 출제하였습니다.");
        history.push("/teacher/manage_classroom");
    };

    /* 현재까지 작업한 문제들 모두 폐기 (서버에 저장된 question 그대로 유지) */
    const onClickBtnCancel = (e) => {
        let confirmCancel = window.confirm(
            "새로 작업한 시험 문제들을 모두 취소 합니다.\n최근에 제출한 시험 문제를 유지합니다."
        );
        if (confirmCancel) history.push("/teacher/manage_classroom");
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
            // 삭제할 questionId 배열에 저장
            setDeletedQuestionIdList([
                ...deletedQuestionIdList,
                questionList[currentQuestionIndex - 1].id
            ]);
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
        <>
            <MenuBar_T
                centerMenu="시험 문제 관리"
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

                <div className="floating_action_buttons">
                    <Box sx={{ "& > :not(style)": { m: 1 } }}>
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

                <div className="div__btn__submit_cancel">
                    <button onClick={onClickBtnSubmit}>제 출</button>
                    <button onClick={onClickBtnCancel}>취 소</button>
                </div>
            </div>
        </>
    );
};

export default ManageExamQuestion;
