import axios from "axios";

/* action 정의 */
const FETCH_EXAM_LIST_BY_STUDENT_ID = "FETCH_EXAM_LIST_BY_STUDENT_ID";

/* action 생성 함수 정의 */
export const fetchExamListByStudentId = (examList) => {
    return {
        type: FETCH_EXAM_LIST_BY_STUDENT_ID,
        examList
    };
};

/* 초기 state 정의 */
const initState = {
    examList: []
};

/* 서버 API로부터 studentId로 해당 반의 exam 목록들 수신 */
export const apiFetchExamListByStudentId = (studentId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/v1/exams?", {
                params: {
                    studentId,
                    size: 100
                }
            });
            // action 생성 함수 dispatch
            dispatch(fetchExamListByStudentId(response.data));
        } catch (error) {
            throw error;
        }
    };
};

/* reducer 정의 */
export const examListByStudentIdReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_EXAM_LIST_BY_STUDENT_ID:
            return {
                ...state,
                examList: action.examList
            };

        default:
            return state;
    }
};
