import axios from "axios";

/* action 정의 */
const FETCH_CLASSROOM_LIST_BY_ACADEMY_ID_AND_NAME =
	"FETCH_CLASSROOM_LIST_BY_ACADEMY_ID_AND_NAME";

/* action 생성 함수 정의 */
export const fetchClassroomListByAcademyIdAndName = (classroomList) => {
	return {
		type: FETCH_CLASSROOM_LIST_BY_ACADEMY_ID_AND_NAME,
		classroomList
	};
};

/* 초기 state 정의 */
const initState = {
	classroomList: []
};

/* 서버 API로부터 academyName과 관련된 학원들 조회 */
export const apiFetchClassroomListByAcademyIdAndName = (academyId, name) => {
	return async (dispatch) => {
		try {
			const response = await axios.get("/v1/academy/classrooms?", {
				params: {
					academyId: academyId,
					nameLike: name
				}
			});
			// action 생성 함수 dispatch
			dispatch(fetchClassroomListByAcademyIdAndName(response.data));
		} catch (error) {
			throw error;
		}
	};
};

/* reducer 정의 */
export const classroomListByAcademyIdAndNameReducer = (
	state = initState,
	action
) => {
	switch (action.type) {
		case FETCH_CLASSROOM_LIST_BY_ACADEMY_ID_AND_NAME:
			return {
				...state,
				classroomList: action.classroomList
			};

		default:
			return state;
	}
};
