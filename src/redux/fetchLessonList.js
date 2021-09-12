import axios from "axios";

/* action 정의 */
const FETCH_LESSON_LIST = "FETCH_LESSON_LIST";

/* action 생성 함수 정의 */
export const fetchLessonList = (lessonList) => {
	return {
		type: FETCH_LESSON_LIST,
		lessonList
	};
};

/* 초기 state 정의 */
const initState = {
	lessonList: []
};

/* 서버 API로부터 studentId 또는 teacherId로 해당 사용자의 등록된 lesson 목록들 수신 */
export const apiFetchLessonList = (userType, userId, sinceDate, untilDate) => {
	return async (dispatch) => {
		try {
			const response =
				userType === "student"
					? await axios.get("/v1/academy/classroom/lessons?", {
							params: {
								studentId: userId,
								sinceDate,
								untilDate,
								size: 100
							}
					  })
					: await axios.get("/v1/academy/classroom/lessons?", {
							params: {
								teacherId: userId,
								sinceDate,
								untilDate,
								size: 100
							}
					  });
			// action 생성 함수 dispatch
			dispatch(fetchLessonList(response.data));
		} catch (error) {
			throw error;
		}
	};
};

/* reducer 정의 */
export const lessonListReducer = (state = initState, action) => {
	switch (action.type) {
		case FETCH_LESSON_LIST:
			return {
				...state,
				lessonList: action.lessonList
			};

		default:
			return state;
	}
};
