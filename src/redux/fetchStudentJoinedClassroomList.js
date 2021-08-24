import axios from "axios";

/* action 정의 */
const FETCH_STUDENT_JOINED_CLASSROOM_LIST =
	"FETCH_STUDENT_JOINED_CLASSROOM_LIST";

/* action 생성 함수 정의 */
export const fetchStudentJoinedClassroomList = (studentJoinedClassroomList) => {
	return {
		type: FETCH_STUDENT_JOINED_CLASSROOM_LIST,
		studentJoinedClassroomList
	};
};

/* 초기 state 정의 */
const initState = {
	studentJoinedClassroomList: []
};

/* 서버 API로부터 studentId로 해당 학생이 가입된 classroom 목록들 수신 */
export const apiFetchStudentJoinedClassroomList = (studentId) => {
	return async (dispatch) => {
		try {
			const response = await axios({
				method: "GET",
				url: `/v1/academy/classrooms?studentId=${studentId}`
			});
			// action 생성 함수 dispatch
			dispatch(fetchStudentJoinedClassroomList(response.data));
		} catch (error) {
			throw error;
		}
	};
};

/* reducer 정의 */
export const fetchStudentJoinedClassroomListReducer = (
	state = initState,
	action
) => {
	switch (action.type) {
		case FETCH_STUDENT_JOINED_CLASSROOM_LIST:
			return {
				...state,
				studentJoinedClassroomList: action.studentJoinedClassroomList
			};

		default:
			return state;
	}
};
