import React, { useState, useEffect, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";

import { apiFetchExamQuestionList } from "../redux/fetchExamQuestionList";
import { apiFetchAttenderStateList } from "../redux/fetchAttenderStateList";
import QuestionIndexPanel from "../components/QuestionIndexPanel";
import TakeExamQuestion from "../components/TakeExamQuestion";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// import "../styles/TakeExam.css";

const putAttenderAnswer = async (
    attenderStateId,
    questionId,
    answer,
    authToken
) => {
    try {
        const response = await axios.put(
            `/v1/exam/attender-state/${attenderStateId}/answers/${questionId}`,
            {
                answer
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        if (response.status === 404) alert("유효하지 않은 요청 입니다.");
    } catch (e) {
        console.log(e);
        alert("토큰 만료. 로그인 페이지로 이동");
    }
};

const postAttenderStateComplete = async (attenderStateId, authToken) => {
    try {
        const response = await axios.post(
            `/v1/exam/attender-states/${attenderStateId}/submit`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        if (response.status === 204) alert("시험 응시가 완료 되었습니다.");
    } catch (e) {
        console.log(e);
        alert("토큰 만료. 로그인 페이지로 이동");
    }
};

/* 인자 timeLimit: "PT1H30M30S" 형식 */
const getHourMinuteSecond = (timeLimit) => {
    let leftTimeLimit = timeLimit.slice(2); // "1H30M30S" 형식
    let hour, minute, second;

    if (leftTimeLimit.includes("H")) {
        hour = Number(leftTimeLimit.split("H")[0]);
        const index = timeLimit.indexOf("H");
        leftTimeLimit = timeLimit.slice(index + 1);
    } else hour = 0;

    if (leftTimeLimit.includes("M")) {
        minute = Number(leftTimeLimit.split("M")[0]);
        const index = timeLimit.indexOf("M");
        leftTimeLimit = timeLimit.slice(index + 1);
    } else minute = 0;

    if (leftTimeLimit.includes("S")) {
        second = Number(leftTimeLimit.split("S")[0]);
        const index = timeLimit.indexOf("S");
        leftTimeLimit = timeLimit.slice(index + 1);
    } else second = 0;

    return { hour, minute, second };
};

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
    const onFetchAttenderStateList = (studentId, examId) => {
        console.log("onFetchAttenderStateList()");
        dispatch(apiFetchAttenderStateList(studentId, examId));
    };

    const studentId = useSelector((state) => state.studentIdReducer.studentId);
    const authToken = useSelector((state) => state.authTokenReducer.authToken);

    useEffect(() => {
        onFetchExamQuestionList(examId);
    }, [examId]);

    useEffect(() => {
        onFetchAttenderStateList(studentId, examId);
    }, [studentId, examId]);

    const examList = useSelector((state) => state.examListReducer.examList);
    const exam = examList.find((exam) => exam.id == examId);

    const timeObj = getHourMinuteSecond(exam.timeLimit);

    // 화면에 보여질 시간
    const [hour, setHour] = useState(timeObj.hour);
    const [minute, setMinute] = useState(timeObj.minute);
    const [second, setSecond] = useState(timeObj.second);
    // const hour = useRef(timeObj.hour);
    // const minute = useRef(timeObj.minute);
    // const second = useRef(timeObj.second);

    const timer = useRef(null);
    const totalSecond = useRef(hour * 60 * 60 + minute * 60 + second - 3);

    const questionList = useSelector(
        (state) => state.examQuestionListReducer.questionList
    );
    const attenderState = useSelector(
        (state) => state.attenderStateListReducer.attenderStateList[0]
    );

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // 전체 문제의 작성 답안 리스트, 저장 버튼으로 저장된 전체 문제의 작성 답안 리스트
    const [attenderAnswerList, setAttenderAnswerList] = useState([]);
    const [savedAttenderAnswerList, setSavedAttenderAnswerList] = useState([]);

    // currentQuestionIndex 초기화
    useEffect(() => {
        if (isInitialized) return;

        if (questionList.length !== 0) {
            setCurrentQuestionIndex(1);
            // 전체 문제 개수 만큼 빈 배열 []로 채운 배열로 초기화
            setAttenderAnswerList(
                Array.from({ length: questionList.length }, () => [])
            );
            setSavedAttenderAnswerList(
                Array.from({ length: questionList.length }, () => [])
            );
        }

        setIsInitialized(true);
    }, [questionList]);

    /* 문제 번호들 Pagination을 통해 문제 이동 */
    const onChangePagination = (e, value) => {
        setCurrentQuestionIndex(value);
    };

    /* 현재까지 푼 문제들 모두 저장 */
    const onClickBtnSave = (e) => {
        setSavedAttenderAnswerList([...attenderAnswerList]);
    };

    /* 저장된 문제들 제출 */
    const onClickBtnSubmit = async (e) => {
        let confirmSubmit = window.confirm(
            "답안 제출 후, 수정이 불가능 합니다.\n답안을 제출 하시겠습니까?"
        );
        if (!confirmSubmit) return;

        for (let i = 0; i < questionList.length; i++) {
            if (savedAttenderAnswerList[i].length === 0) continue;

            await putAttenderAnswer(
                attenderState.id,
                questionList[i].id,
                savedAttenderAnswerList[i],
                authToken
            );
        }

        // AttenderState의 progress를 COMPLETE로 변경 (시험 응시 종료)
        await postAttenderStateComplete(attenderState.id, authToken);
        history.push("/student/assigned_exam");
    };

    // 창 닫기 x 클릭 시, 경고
    const onBeforeUnload = (e) => {
        e.preventDefault();
        return (e.returnValue = "");
    };

    // 창 닫기의 경고 창 확인 클릭 시, 저장된 문제 제출 및 응시 완료 COMPLETE
    const onUnload = async (e) => {
        for (let i = 0; i < questionList.length; i++) {
            if (savedAttenderAnswerList[i].length === 0) continue;

            await putAttenderAnswer(
                attenderState.id,
                questionList[i].id,
                savedAttenderAnswerList[i],
                authToken
            );
        }

        // AttenderState의 progress를 COMPLETE로 변경 (시험 응시 종료)
        await postAttenderStateComplete(attenderState.id, authToken);
    };

    /* window 창 Event Handler 등록 및 제거 */
    useEffect(() => {
        // window 창에 이벤트 핸들러 등록
        window.addEventListener("beforeunload", onBeforeUnload);
        window.addEventListener("unload", onUnload);

        // cleanup
        return async () => {
            onUnload();
            window.removeEventListener("beforeunload", onBeforeUnload);
            window.removeEventListener("unload", onUnload);
        };
    }, []);

    /* 제한 시간 timer */
    useEffect(() => {
        timer.current = setInterval(() => {
            const checkMinute = Math.floor(totalSecond.current / 60);

            setHour(Math.floor(totalSecond.current / 3600));
            setMinute(checkMinute % 60);
            setSecond(totalSecond.current % 60);
            // hour.current = Math.floor(totalSecond.current / 3600);
            // minute.current = checkMinute % 60;
            // second.current = totalSecond.current % 60;

            totalSecond.current -= 1;
        }, 1000);

        return () => clearInterval(timer.current);
    }, []);

    /* 제한 시간 timeout */
    useEffect(async () => {
        if (totalSecond.current <= 0) {
            for (let i = 0; i < questionList.length; i++) {
                if (savedAttenderAnswerList[i].length === 0) continue;

                await putAttenderAnswer(
                    attenderState.id,
                    questionList[i].id,
                    savedAttenderAnswerList[i],
                    authToken
                );
            }

            // AttenderState의 progress를 COMPLETE로 변경 (시험 응시 종료)
            await postAttenderStateComplete(attenderState.id, authToken);
            clearInterval(timer.current);
            history.push("/student/assigned_exam");
        }
    }, [second]);

    return (
        <div className="manage_exam_question">
            <div className="question_number_group">
                <h2 className="question_number">
                    문제 {currentQuestionIndex}번
                </h2>

                {/* 남은 minute, second */}
                <h3>
                    {hour > 0 ? hour + ":" : null}
                    {minute < 10 ? `0${minute}` : minute}:
                    {second < 10 ? `0${second}` : second}
                    {/* {hour.current > 0 ? hour.current + ":" : null}
                    {minute.current < 10
                        ? `0${minute.current}`
                        : minute.current}
                    :
                    {second.current < 10
                        ? `0${second.current}`
                        : second.current} */}
                </h3>

                <div className="question_number_pagination">
                    <Stack spacing={2}>
                        <Pagination
                            count={questionList.length}
                            page={currentQuestionIndex}
                            onChange={onChangePagination}
                            color="primary"
                        />
                    </Stack>

                    {/* <QuestionIndexPanel
                        savedAttenderAnswerList={savedAttenderAnswerList}
                        currentQuestionIndex={currentQuestionIndex}
                        setCurrentQuestionIndex={setCurrentQuestionIndex}
                    /> */}
                </div>
            </div>

            <TakeExamQuestion
                currentQuestionIndex={currentQuestionIndex}
                questionList={questionList}
                attenderAnswerList={attenderAnswerList}
                setAttenderAnswerList={setAttenderAnswerList}
            />

            <div className="div__btn__submit">
                <button onClick={onClickBtnSave}>저 장</button>
                <button onClick={onClickBtnSubmit}>제 출</button>
            </div>
        </div>
    );
};

export default TakeExam;
