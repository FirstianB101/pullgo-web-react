import axios from "axios";

/* action 정의 */
const FETCH_ACADEMY_APPLIED_TEACHER_LIST = "FETCH_ACADEMY_APPLIED_TEACHER_LIST";

/* action 생성 함수 정의 */
export const fetchAcademyAppliedTeacherList = (appliedTeacherList) => {
    return {
        type: FETCH_ACADEMY_APPLIED_TEACHER_LIST,
        appliedTeacherList
    };
};

/* 초기 state 정의 */
const initState = {
    appliedTeacherList: []
};

/* 서버 API로부터 AcademyId로 해당 학원에 가입 요청한 TEACHER 목록들 수신 */
export const apiFetchAcademyAppliedTeacherList = (academyId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/v1/teachers?", {
                params: {
                    appliedAcademyId: academyId
                }
            });
            // action 생성 함수 dispatch
            dispatch(fetchAcademyAppliedTeacherList(response.data));
        } catch (error) {
            throw error;
        }
    };
};

/* reducer 정의 */
export const academyAppliedTeacherListReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_ACADEMY_APPLIED_TEACHER_LIST:
            return {
                ...state,
                appliedTeacherList: action.appliedTeacherList
            };

        default:
            return state;
    }
};
