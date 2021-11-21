import axios from "axios";

/* action 정의 */
const FETCH_ATTENDER_STATE_LIST_BY_STUDENT_ID =
    "FETCH_ATTENDER_STATE_LIST_BY_STUDENT_ID";

/* action 생성 함수 정의 */
export const fetchAttenderStateListByStudentId = (attenderStateList) => {
    return {
        type: FETCH_ATTENDER_STATE_LIST_BY_STUDENT_ID,
        attenderStateList
    };
};

/* 초기 state 정의 */
const initState = {
    attenderStateList: []
};

/* 서버 API로부터 studentId로 해당 반의 exam 목록들 수신 */
export const apiFetchAttenderStateListByStudentId = (studentId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/v1/exam/attender-states?", {
                params: {
                    studentId
                }
            });
            // action 생성 함수 dispatch
            dispatch(fetchAttenderStateListByStudentId(response.data));
        } catch (error) {
            throw error;
        }
    };
};

/* reducer 정의 */
export const attenderStateListByStudentIdReducer = (
    state = initState,
    action
) => {
    switch (action.type) {
        case FETCH_ATTENDER_STATE_LIST_BY_STUDENT_ID:
            return {
                ...state,
                attenderStateList: action.attenderStateList
            };

        default:
            return state;
    }
};
