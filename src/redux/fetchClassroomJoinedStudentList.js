import axios from "axios";

/* action 정의 */
const FETCH_CLASSROOM_JOINED_STUDENT_LIST =
    "FETCH_CLASSROOM_JOINED_STUDENT_LIST";

/* action 생성 함수 정의 */
export const fetchClassroomJoinedStudentList = (joinedStudentList) => {
    return {
        type: FETCH_CLASSROOM_JOINED_STUDENT_LIST,
        joinedStudentList
    };
};

/* 초기 state 정의 */
const initState = {
    joinedStudentList: []
};

/* 서버 API로부터 classroomId로 반에 가입된 학생들 조회 */
export const apiFetchClassroomJoinedStudentList = (classroomId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/v1/students?", {
                params: {
                    classroomId
                }
            });
            // action 생성 함수 dispatch
            dispatch(fetchClassroomJoinedStudentList(response.data));
        } catch (error) {
            throw error;
        }
    };
};

/* reducer 정의 */
export const classroomJoinedStudentListReducer = (
    state = initState,
    action
) => {
    switch (action.type) {
        case FETCH_CLASSROOM_JOINED_STUDENT_LIST:
            return {
                ...state,
                joinedStudentList: action.joinedStudentList
            };

        default:
            return state;
    }
};
