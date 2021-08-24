import axios from "axios";

/* action 정의 */
const FETCH_STUDENT_ID = "FETCH_STUDENT_ID";

/* action 생성 함수 정의 */
export const fetchStudentId = (studentId) => {
	return {
		type: FETCH_STUDENT_ID,
		studentId
	};
};

/* 초기 state 정의 */
const initState = {
	studentId: 0
};

/* 서버 API로부터 studentId 수신 */
export const apiFetchStudentId = (id) => {
	return async (dispatch) => {
		try {
			const response = await axios({
				method: "GET",
				url: `/v1/academies/${id}`
			});
			// action 생성 함수 dispatch
			dispatch(fetchStudentId(response.data.ownerId));
		} catch (error) {
			throw error;
		}
	};
};

/* reducer 정의 */
export const fetchStudentIdReducer = (state = initState, action) => {
	switch (action.type) {
		case FETCH_STUDENT_ID:
			return {
				...state,
				studentId: action.studentId
				// studentId: state.studentId
			};

		default:
			return state;
	}
};
