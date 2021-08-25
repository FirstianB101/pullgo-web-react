import axios from "axios";

/* action 정의 */
const FETCH_STUDENT_JOINED_ACADEMY_LIST = "FETCH_STUDENT_JOINED_ACADEMY_LIST";

/* action 생성 함수 정의 */
export const fetchStudentJoinedAcademyList = (studentJoinedAcademyList) => {
	return {
		type: FETCH_STUDENT_JOINED_ACADEMY_LIST,
		studentJoinedAcademyList
	};
};

/* 초기 state 정의 */
const initState = {
	studentJoinedAcademyList: []
};

/* 서버 API로부터 studentId로 해당 학생이 가입된 academy 목록들 수신 */
export const apiFetchStudentJoinedAcademyList = (studentId) => {
	return async (dispatch) => {
		try {
			const response = await axios.get("/v1/academies?", {
				params: {
					studentId: studentId
				}
			});
			// action 생성 함수 dispatch
			dispatch(fetchStudentJoinedAcademyList(response.data));
		} catch (error) {
			throw error;
		}
	};
};

/* reducer 정의 */
export const fetchStudentJoinedAcademyListReducer = (
	state = initState,
	action
) => {
	switch (action.type) {
		case FETCH_STUDENT_JOINED_ACADEMY_LIST:
			return {
				...state,
				studentJoinedAcademyList: action.studentJoinedAcademyList
			};

		default:
			return state;
	}
};
