import axios from "axios";

/* action 정의 */
const FETCH_ACADEMY_JOINED_STUDENT_LIST = "FETCH_ACADEMY_JOINED_STUDENT_LIST";

/* action 생성 함수 정의 */
export const fetchAcademyJoinedStudentList = (joinedStudentList) => {
    return {
        type: FETCH_ACADEMY_JOINED_STUDENT_LIST,
        joinedStudentList
    };
};

/* 초기 state 정의 */
const initState = {
    joinedStudentList: []
};

/* 서버 API로부터 academyId로 해당 학원에 가입된 student 목록들 수신 */
export const apiFetchAcademyJoinedStudentList = (academyId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/v1/students?", {
                params: {
                    academyId
                }
            });
            // action 생성 함수 dispatch
            dispatch(fetchAcademyJoinedStudentList(response.data));
        } catch (error) {
            throw error;
        }
    };
};

/* reducer 정의 */
export const academyJoinedStudentListReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_ACADEMY_JOINED_STUDENT_LIST:
            return {
                ...state,
                joinedStudentList: action.joinedStudentList
            };

        default:
            return state;
    }
};
