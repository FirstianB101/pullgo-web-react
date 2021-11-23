import axios from "axios";

/* action 정의 */
const FETCH_ATTENDER_ANSWER_LIST = "FETCH_ATTENDER_ANSWER_LIST";

/* action 생성 함수 정의 */
export const fetchAttenderAnswerList = (attenderAnswerList) => {
    return {
        type: FETCH_ATTENDER_ANSWER_LIST,
        attenderAnswerList
    };
};

/* 초기 state 정의 */
const initState = {
    attenderAnswerList: []
};

/* 서버 API로부터 studentId로 해당 반의 exam 목록들 수신 */
export const apiFetchAttenderAnswerList = (attenderStateId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                "/v1/exam/attender-state/answers?",
                {
                    params: {
                        attenderStateId
                    }
                }
            );

            // action 생성 함수 dispatch
            dispatch(fetchAttenderAnswerList(response.data));
        } catch (error) {
            throw error;
        }
    };
};

/* reducer 정의 */
export const attenderAnswerListReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_ATTENDER_ANSWER_LIST:
            return {
                ...state,
                attenderAnswerList: action.attenderAnswerList
            };

        default:
            return state;
    }
};
