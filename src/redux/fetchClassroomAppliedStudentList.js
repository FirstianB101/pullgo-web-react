import axios from "axios";

/* action 정의 */
const FETCH_CLASSROOM_APPLIED_STUDENT_LIST =
    "FETCH_CLASSROOM_APPLIED_STUDENT_LIST";

/* action 생성 함수 정의 */
export const fetchClassroomAppliedStudentList = (appliedStudentList) => {
    return {
        type: FETCH_CLASSROOM_APPLIED_STUDENT_LIST,
        appliedStudentList
    };
};

/* 초기 state 정의 */
const initState = {
    appliedStudentList: []
};

/* 서버 API로부터 classroomId로 해당 반에 가입 요청한 student 목록들 수신 */
export const apiFetchClassroomAppliedStudentList = (classroomId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/v1/students?", {
                params: {
                    appliedClassroomId: classroomId
                }
            });
            // action 생성 함수 dispatch
            dispatch(fetchClassroomAppliedStudentList(response.data));
        } catch (error) {
            throw error;
        }
    };
};

/* reducer 정의 */
export const classroomAppliedStudentListReducer = (
    state = initState,
    action
) => {
    switch (action.type) {
        case FETCH_CLASSROOM_APPLIED_STUDENT_LIST:
            return {
                ...state,
                appliedStudentList: action.appliedStudentList
            };

        default:
            return state;
    }
};
