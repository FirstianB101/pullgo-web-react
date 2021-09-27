import axios from "axios";

/* action 정의 */
const FETCH_EXAM_LIST = "FETCH_EXAM_LIST";

/* action 생성 함수 정의 */
export const fetchExamList = (examList) => {
	return {
		type: FETCH_EXAM_LIST,
		examList
	};
};

/* 초기 state 정의 */
const initState = {
	examList: []
};

/* 서버 API로부터 classroomId로 해당 반의 exam 목록들 수신 */
export const apiFetchExamList = (classroomId) => {
	return async (dispatch) => {
		try {
			const response = await axios.get("/v1/exams?", {
				params: {
					classroomId: classroomId,
					size: 100
				}
			});
			// action 생성 함수 dispatch
			dispatch(fetchExamList(response.data));
		} catch (error) {
			throw error;
		}
	};
};

/* reducer 정의 */
export const examListReducer = (state = initState, action) => {
	switch (action.type) {
		case FETCH_EXAM_LIST:
			return {
				...state,
				examList: action.examList
			};

		default:
			return state;
	}
};
