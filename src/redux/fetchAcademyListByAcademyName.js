import axios from "axios";

/* action 정의 */
const FETCH_ACADEMY_LIST_BY_ACADEMY_NAME = "FETCH_ACADEMY_LIST_BY_ACADEMY_NAME";

/* action 생성 함수 정의 */
export const fetchAcademyListByAcademyName = (academyList) => {
	return {
		type: FETCH_ACADEMY_LIST_BY_ACADEMY_NAME,
		academyList
	};
};

/* 초기 state 정의 */
const initState = {
	academyList: []
};

/* 서버 API로부터 academyName과 관련된 학원들 조회 */
export const apiFetchAcademyListByAcademyName = (academyName) => {
	return async (dispatch) => {
		try {
			const response = await axios.get("/v1/academies?", {
				params: {
					nameLike: academyName
				}
			});
			// action 생성 함수 dispatch
			dispatch(fetchAcademyListByAcademyName(response.data));
		} catch (error) {
			throw error;
		}
	};
};

/* reducer 정의 */
export const academyListByAcademyNameReducer = (state = initState, action) => {
	switch (action.type) {
		case FETCH_ACADEMY_LIST_BY_ACADEMY_NAME:
			return {
				...state,
				academyList: action.academyList
			};

		default:
			return state;
	}
};
