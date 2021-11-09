import axios from "axios";

/* action 정의 */
const FETCH_CLASSROOM_JOINED_TEACHER_LIST =
    "FETCH_CLASSROOM_JOINED_TEACHER_LIST";

/* action 생성 함수 정의 */
export const fetchClassroomJoinedTeacherList = (joinedTeacherList) => {
    return {
        type: FETCH_CLASSROOM_JOINED_TEACHER_LIST,
        joinedTeacherList
    };
};

/* 초기 state 정의 */
const initState = {
    joinedTeacherList: []
};

/* 서버 API로부터 classroomId로 반에 가입된 학생들 조회 */
export const apiFetchClassroomJoinedTeacherList = (classroomId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/v1/teachers?", {
                params: {
                    classroomId
                }
            });
            // action 생성 함수 dispatch
            dispatch(fetchClassroomJoinedTeacherList(response.data));
        } catch (error) {
            throw error;
        }
    };
};

/* reducer 정의 */
export const classroomJoinedTeacherListReducer = (
    state = initState,
    action
) => {
    switch (action.type) {
        case FETCH_CLASSROOM_JOINED_TEACHER_LIST:
            return {
                ...state,
                joinedTeacherList: action.joinedTeacherList
            };

        default:
            return state;
    }
};
