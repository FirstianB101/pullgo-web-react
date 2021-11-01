import axios from "axios";

/* action 정의 */
const FETCH_TEACHER_ID = "FETCH_TEACHER_ID";

/* action 생성 함수 정의 */
export const fetchTeacherId = (teacherId) => {
    return {
        type: FETCH_TEACHER_ID,
        teacherId
    };
};

/* 초기 state 정의 */
const initState = {
    teacherId: 0
};

/* 서버 API로부터 teacherId 수신 */
export const apiFetchTeacherId = (id) => {
    return async (dispatch) => {
        try {
            // const response = await axios.get(`/v1/academies/${id}`);
            const response = await axios.get(`/v1/teachers/${id}`);
            // action 생성 함수 dispatch
            dispatch(fetchTeacherId(response.data.id));
        } catch (error) {
            throw error;
        }
    };
};

export const saveTeacherId = (teacherId) => {
    return (dispatch) => {
        dispatch(fetchTeacherId(teacherId));
    };
};

/* reducer 정의 */
export const teacherIdReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_TEACHER_ID:
            return {
                ...state,
                teacherId: action.teacherId
                // teacherId: state.teacherId
            };

        default:
            return state;
    }
};
