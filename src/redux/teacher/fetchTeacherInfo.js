import axios from "axios";

/* action 정의 */
const FETCH_TEACHER_INFO = "FETCH_TEACHER_INFO";

/* action 생성 함수 정의 */
export const fetchTeacherInfo = (teacherInfo) => {
	return {
		type: FETCH_TEACHER_INFO,
		teacherInfo
	};
};

/* 초기 state 정의 */
const initState = {
	teacherInfo: {}
};

/* 서버 API로부터 teacherId로 해당 teacher 조회 */
export const apiFetchTeacherInfo = (teacherId) => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`/v1/teachers/${teacherId}`);
			// action 생성 함수 dispatch
			dispatch(fetchTeacherInfo(response.data));
		} catch (error) {
			throw error;
		}
	};
};

/* reducer 정의 */
export const teacherInfoReducer = (state = initState, action) => {
	switch (action.type) {
		case FETCH_TEACHER_INFO:
			return {
				...state,
				teacherInfo: action.teacherInfo
			};

		default:
			return state;
	}
};
