import axios from "axios";

/* action 정의 */
const FETCH_EXAM_QUESTION_LIST = "FETCH_EXAM_QUESTION_LIST";

/* action 생성 함수 정의 */
export const fetchExamQuestionList = (questionList) => {
    return {
        type: FETCH_EXAM_QUESTION_LIST,
        questionList
    };
};

/* 초기 state 정의 */
const initState = {
    questionList: []
};

/* 서버 API로부터 examId로 시험에 등록된 question 목록들 수신 */
export const apiFetchExamQuestionList = (examId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/v1/exam/questions?", {
                params: {
                    examId,
                    size: 100
                }
            });

            // action 생성 함수 dispatch
            dispatch(fetchExamQuestionList(response.data));

            // questionList의 각 객체들에 questionIndex(문제 번호, 1부터 시작) 속성 추가
            // const questionList = response.data;
            // if (questionList.length !== 0) {
            //     for (let i = 0; i < questionList.length; i++)
            //         questionList[i].questionIndex = i + 1;
            // }
            // dispatch(fetchExamQuestionList(questionList));
        } catch (error) {
            throw error;
        }
    };
};

/* reducer 정의 */
export const examQuestionListReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_EXAM_QUESTION_LIST:
            return {
                ...state,
                questionList: action.questionList
            };

        default:
            return state;
    }
};
