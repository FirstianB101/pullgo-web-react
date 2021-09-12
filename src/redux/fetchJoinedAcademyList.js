import axios from "axios";

/* action 정의 */
const FETCH_JOINED_ACADEMY_LIST = "FETCH_JOINED_ACADEMY_LIST";

/* action 생성 함수 정의 */
export const fetchJoinedAcademyList = (joinedAcademyList) => {
	return {
		type: FETCH_JOINED_ACADEMY_LIST,
		joinedAcademyList
	};
};

/* 초기 state 정의 */
const initState = {
	joinedAcademyList: []
};

/* 서버 API로부터 studentId 또는 teacherId로 해당 사용자가 가입된 academy 목록들 수신 */
export const apiFetchJoinedAcademyList = (userType, userId) => {
	return async (dispatch) => {
		try {
			const response =
				userType === "student"
					? await axios.get("/v1/academies?", {
							params: {
								studentId: userId
							}
					  })
					: await axios.get("/v1/academies?", {
							params: {
								teacherId: userId
							}
					  });
			// action 생성 함수 dispatch
			dispatch(fetchJoinedAcademyList(response.data));
		} catch (error) {
			throw error;
		}
	};
};

/* reducer 정의 */
export const joinedAcademyListReducer = (state = initState, action) => {
	switch (action.type) {
		case FETCH_JOINED_ACADEMY_LIST:
			return {
				...state,
				joinedAcademyList: action.joinedAcademyList
			};

		default:
			return state;
	}
};
