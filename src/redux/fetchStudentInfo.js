import axios from "axios";

/* action 정의 */
const FETCH_STUDENT_INFO = "fetchStudentInfo/FETCH_STUDENT_INFO";

/* action 생성 함수 정의 */
export const fetchStudentInfo = (studentInfo) => {
	return {
		type: FETCH_STUDENT_INFO,
		studentInfo
	};
};

/* 초기 state 정의 */
const initState = {
	studentInfo: {}
};

/* 서버 API로부터 studentId로 해당 student 조회 */
export const apiFetchStudentInfo = (studentId) => {
	return async (dispatch) => {
		try {
			const response = await axios({
				method: "GET",
				url: `/v1/students/${studentId}`
			});
			// action 생성 함수 dispatch
			dispatch(fetchStudentInfo(response.data));
		} catch (error) {
			throw error;
		}
	};
};

/* reducer 정의 */
export const fetchStudentInfoReducer = (state = initState, action) => {
	switch (action.type) {
		case FETCH_STUDENT_INFO:
			return {
				...state,
				studentInfo: action.studentInfo
			};

		default:
			return state;
	}
};
