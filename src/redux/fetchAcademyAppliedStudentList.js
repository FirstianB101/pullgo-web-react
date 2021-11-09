import axios from "axios";

/* action 정의 */
const FETCH_ACADEMY_APPLIED_STUDENT_LIST = "FETCH_ACADEMY_APPLIED_STUDENT_LIST";

/* action 생성 함수 정의 */
export const fetchAcademyAppliedStudentList = (appliedStudentList) => {
    return {
        type: FETCH_ACADEMY_APPLIED_STUDENT_LIST,
        appliedStudentList
    };
};

/* 초기 state 정의 */
const initState = {
    appliedStudentList: []
};

/* 서버 API로부터 AcademyId로 해당 학원에 가입 요청한 student 목록들 수신 */
export const apiFetchAcademyAppliedStudentList = (academyId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/v1/students?", {
                params: {
                    appliedAcademyId: academyId
                }
            });
            // action 생성 함수 dispatch
            dispatch(fetchAcademyAppliedStudentList(response.data));
        } catch (error) {
            throw error;
        }
    };
};

/* reducer 정의 */
export const academyAppliedStudentListReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_ACADEMY_APPLIED_STUDENT_LIST:
            return {
                ...state,
                appliedStudentList: action.appliedStudentList
            };

        default:
            return state;
    }
};
