import axios from "axios";

/* action 정의 */
const FETCH_USER_TYPE = "FETCH_USER_TYPE";

/* action 생성 함수 정의 */
export const fetchUserType = (userType) => {
	return {
		type: FETCH_USER_TYPE,
		userType
	};
};

/* 초기 state 정의 */
const initState = {
	userType: undefined
};

/* 로그인 과정에서 userType(student / teacher) 저장 */
export const apiFetchUserType = (userType) => {
	return (dispatch) => {
		dispatch(fetchUserType(userType));
	};
};

/* reducer 정의 */
export const userTypeReducer = (state = initState, action) => {
	switch (action.type) {
		case FETCH_USER_TYPE:
			return {
				...state,
				userType: action.userType
			};

		default:
			return state;
	}
};
