import axios from "axios";

/* action 정의 */
const FETCH_ATTENDER_STATE_LIST = "FETCH_ATTENDER_STATE_LIST";

/* action 생성 함수 정의 */
export const fetchAttenderStateList = (attenderStateList) => {
    return {
        type: FETCH_ATTENDER_STATE_LIST,
        attenderStateList
    };
};

/* 초기 state 정의 */
const initState = {
    attenderStateList: []
};

/* 서버 API로부터 studentId로 해당 반의 exam 목록들 수신 */
export const apiFetchAttenderStateList = (studentId, examId) => {
    return async (dispatch) => {
        try {
            // examId 인자로 전달받으면, examId도 API query params에 추가
            const params = examId
                ? {
                      studentId,
                      examId
                  }
                : {
                      studentId
                  };

            const response = await axios.get("/v1/exam/attender-states?", {
                params
            });

            // action 생성 함수 dispatch
            dispatch(fetchAttenderStateList(response.data));
        } catch (error) {
            throw error;
        }
    };
};

/* reducer 정의 */
export const attenderStateListReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_ATTENDER_STATE_LIST:
            return {
                ...state,
                attenderStateList: action.attenderStateList
            };

        default:
            return state;
    }
};
