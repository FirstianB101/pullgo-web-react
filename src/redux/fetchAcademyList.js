import axios from "axios";

/* action 정의 */
const FETCH_ACADEMY_LIST = "fetchAcademyList/FETCH_ACADEMY_LIST";

/* action 생성 함수 정의 */
export const fetchAcademyList = (academyList) => {
	return {
		type: FETCH_ACADEMY_LIST,
		academyList
	};
};

/* 초기 state 정의 */
const initState = {
	academyList: []
};

/* 서버 API로부터 academyName과 관련된 학원들 조회 */
export const apiFetchAcademyList = (academyName) => {
	return async (dispatch) => {
		try {
			const response = await axios({
				method: "GET",
				url: `/v1/academies?nameLike=${academyName}`
			});
			// action 생성 함수 dispatch
			dispatch(fetchAcademyList(response.data));
		} catch (error) {
			throw error;
		}
	};
};

/* reducer 정의 */
export const fetchAcademyListReducer = (state = initState, action) => {
	switch (action.type) {
		case FETCH_ACADEMY_LIST:
			return {
				...state,
				academyList: action.academyList
			};

		default:
			return state;
	}
};
