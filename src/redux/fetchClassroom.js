import axios from "axios";

/* action 정의 */
const FETCH_CLASSROOM = "FETCH_CLASSROOM";

/* action 생성 함수 정의 */
export const fetchClassroom = (classroom) => {
    return {
        type: FETCH_CLASSROOM,
        classroom
    };
};

/* 초기 state 정의 */
const initState = {
    classroom: null
};

/* 서버 API로부터 classroomId로 classroom 수신 */
export const apiFetchClassroom = (classroomId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `/v1/academy/classrooms/${classroomId}`
            );
            // action 생성 함수 dispatch
            dispatch(fetchClassroom(response.data));
        } catch (error) {
            throw error;
        }
    };
};

/* reducer 정의 */
export const classroomReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_CLASSROOM:
            return {
                ...state,
                classroom: action.classroom
            };

        default:
            return state;
    }
};
