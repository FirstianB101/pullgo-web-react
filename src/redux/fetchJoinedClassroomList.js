import axios from "axios";

/* action 정의 */
const FETCH_JOINED_CLASSROOM_LIST = "FETCH_JOINED_CLASSROOM_LIST";

/* action 생성 함수 정의 */
export const fetchJoinedClassroomList = (joinedClassroomList) => {
	return {
		type: FETCH_JOINED_CLASSROOM_LIST,
		joinedClassroomList
	};
};

/* 초기 state 정의 */
const initState = {
	joinedClassroomList: []
};

/* 서버 API로부터 studentId 또는 teacherId로 해당 사용자가 가입된 classroom 목록들 수신 */
export const apiFetchJoinedClassroomList = (userType, userId) => {
	return async (dispatch) => {
		try {
			const response =
				userType === "student"
					? await axios.get("/v1/academy/classrooms?", {
							params: {
								studentId: userId
							}
					  })
					: await axios.get("/v1/academy/classrooms?", {
							params: {
								teacherId: userId
							}
					  });
			// action 생성 함수 dispatch
			dispatch(fetchJoinedClassroomList(response.data));
		} catch (error) {
			throw error;
		}
	};
};

/* reducer 정의 */
export const joinedClassroomListReducer = (state = initState, action) => {
	switch (action.type) {
		case FETCH_JOINED_CLASSROOM_LIST:
			return {
				...state,
				joinedClassroomList: action.joinedClassroomList
			};

		default:
			return state;
	}
};
