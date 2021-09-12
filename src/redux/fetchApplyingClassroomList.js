import axios from "axios";

/* action 정의 */
const FETCH_APPLYING_CLASSROOM_LIST = "FETCH_APPLYING_CLASSROOM_LIST";

/* action 생성 함수 정의 */
export const fetchApplyingClassroomList = (applyingClassroomList) => {
	return {
		type: FETCH_APPLYING_CLASSROOM_LIST,
		applyingClassroomList
	};
};

/* 초기 state 정의 */
const initState = {
	applyingClassroomList: []
};

/* 서버 API로부터 studentId 또는 teacherId로 해당 사용자가 가입된 classroom 목록들 수신 */
export const apiFetchApplyingClassroomList = (userType, userId) => {
	return async (dispatch) => {
		try {
			const response =
				userType === "student"
					? await axios.get("/v1/academy/classrooms?", {
							params: {
								applyingStudentId: userId
							}
					  })
					: await axios.get("/v1/academy/classrooms?", {
							params: {
								applyingTeacherId: userId
							}
					  });
			// action 생성 함수 dispatch
			dispatch(fetchApplyingClassroomList(response.data));
		} catch (error) {
			throw error;
		}
	};
};

/* reducer 정의 */
export const applyingClassroomListReducer = (state = initState, action) => {
	switch (action.type) {
		case FETCH_APPLYING_CLASSROOM_LIST:
			return {
				...state,
				applyingClassroomList: action.applyingClassroomList
			};

		default:
			return state;
	}
};
