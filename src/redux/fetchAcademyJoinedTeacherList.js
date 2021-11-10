import axios from "axios";

/* action 정의 */
const FETCH_ACADEMY_JOINED_TEACHER_LIST = "FETCH_ACADEMY_JOINED_TEACHER_LIST";

/* action 생성 함수 정의 */
export const fetchAcademyJoinedTeacherList = (joinedTeacherList) => {
    return {
        type: FETCH_ACADEMY_JOINED_TEACHER_LIST,
        joinedTeacherList
    };
};

/* 초기 state 정의 */
const initState = {
    joinedTeacherList: []
};

/* 서버 API로부터 academyId로 해당 학원에 가입된 teacher 목록들 수신 */
export const apiFetchAcademyJoinedTeacherList = (academyId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/v1/teachers?", {
                params: {
                    academyId
                }
            });
            // action 생성 함수 dispatch
            dispatch(fetchAcademyJoinedTeacherList(response.data));
        } catch (error) {
            throw error;
        }
    };
};

/* reducer 정의 */
export const academyJoinedTeacherListReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_ACADEMY_JOINED_TEACHER_LIST:
            return {
                ...state,
                joinedTeacherList: action.joinedTeacherList
            };

        default:
            return state;
    }
};
