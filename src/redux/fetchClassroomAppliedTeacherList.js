import axios from "axios";

/* action 정의 */
const FETCH_CLASSROOM_APPLIED_TEACHER_LIST =
    "FETCH_CLASSROOM_APPLIED_TEACHER_LIST";

/* action 생성 함수 정의 */
export const fetchClassroomAppliedTeacherList = (appliedTeacherList) => {
    return {
        type: FETCH_CLASSROOM_APPLIED_TEACHER_LIST,
        appliedTeacherList
    };
};

/* 초기 state 정의 */
const initState = {
    appliedTeacherList: []
};

/* 서버 API로부터 classroomId로 해당 반에 가입 요청한 teacher 목록들 수신 */
export const apiFetchClassroomAppliedTeacherList = (classroomId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/v1/teachers?", {
                params: {
                    appliedClassroomId: classroomId
                }
            });
            // action 생성 함수 dispatch
            dispatch(fetchClassroomAppliedTeacherList(response.data));
        } catch (error) {
            throw error;
        }
    };
};

/* reducer 정의 */
export const classroomAppliedTeacherListReducer = (
    state = initState,
    action
) => {
    switch (action.type) {
        case FETCH_CLASSROOM_APPLIED_TEACHER_LIST:
            return {
                ...state,
                appliedTeacherList: action.appliedTeacherList
            };

        default:
            return state;
    }
};
