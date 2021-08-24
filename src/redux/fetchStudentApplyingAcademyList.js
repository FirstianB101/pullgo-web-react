import axios from "axios";

/* action 정의 */
const FETCH_STUDENT_APPLYING_ACADEMY_LIST =
	"FETCH_STUDENT_APPLYING_ACADEMY_LIST";

/* action 생성 함수 정의 */
export const fetchStudentApplyingAcademyList = (studentApplyingAcademyList) => {
	return {
		type: FETCH_STUDENT_APPLYING_ACADEMY_LIST,
		studentApplyingAcademyList
	};
};

/* 초기 state 정의 */
const initState = {
	studentApplyingAcademyList: []
};

/* 서버 API로부터 studentId로 해당 학생이 가입된 academy 목록들 수신 */
export const apiFetchStudentApplyingAcademyList = (studentId) => {
	return async (dispatch) => {
		try {
			const response = await axios({
				method: "GET",
				url: `/v1/academies?applyingStudentId=${studentId}`
			});
			// action 생성 함수 dispatch
			dispatch(fetchStudentApplyingAcademyList(response.data));
		} catch (error) {
			throw error;
		}
	};
};

/* reducer 정의 */
export const fetchStudentApplyingAcademyListReducer = (
	state = initState,
	action
) => {
	switch (action.type) {
		case FETCH_STUDENT_APPLYING_ACADEMY_LIST:
			return {
				...state,
				studentApplyingAcademyList: action.studentApplyingAcademyList
			};

		default:
			return state;
	}
};
