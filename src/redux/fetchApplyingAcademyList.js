import axios from "axios";

/* action 정의 */
const FETCH_APPLYING_ACADEMY_LIST = "FETCH_APPLYING_ACADEMY_LIST";

/* action 생성 함수 정의 */
export const fetchApplyingAcademyList = (applyingAcademyList) => {
	return {
		type: FETCH_APPLYING_ACADEMY_LIST,
		applyingAcademyList
	};
};

/* 초기 state 정의 */
const initState = {
	applyingAcademyList: []
};

/* 서버 API로부터 studentId 또는 teacherId로 해당 사용자가 가입 신청한 academy 목록들 수신 */
export const apiFetchApplyingAcademyList = (userType, userId) => {
	return async (dispatch) => {
		try {
			const response =
				userType === "student"
					? await axios.get("/v1/academies?", {
							params: {
								applyingStudentId: userId
							}
					  })
					: await axios.get("/v1/academies?", {
							params: {
								applyingTeacherId: userId
							}
					  });
			// action 생성 함수 dispatch
			dispatch(fetchApplyingAcademyList(response.data));
		} catch (error) {
			throw error;
		}
	};
};

/* reducer 정의 */
export const applyingAcademyListReducer = (state = initState, action) => {
	switch (action.type) {
		case FETCH_APPLYING_ACADEMY_LIST:
			return {
				...state,
				applyingAcademyList: action.applyingAcademyList
			};

		default:
			return state;
	}
};
