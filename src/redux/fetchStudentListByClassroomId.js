import axios from "axios";

/* action 정의 */
const FETCH_STUDENT_LIST_BY_CLASSROOM_ID = "FETCH_STUDENT_LIST_BY_CLASSROOM_ID";

/* action 생성 함수 정의 */
export const fetchStudentListByClassroomId = (studentList) => {
    return {
        type: FETCH_STUDENT_LIST_BY_CLASSROOM_ID,
        studentList
    };
};

/* 초기 state 정의 */
const initState = {
    studentList: []
};

/* 서버 API로부터 classroomId로 반에 가입된 학생들 조회 */
export const apiFetchStudentListByClassroomId = (classroomId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/v1/students?", {
                params: {
                    classroomId
                }
            });
            // action 생성 함수 dispatch
            dispatch(fetchStudentListByClassroomId(response.data));
        } catch (error) {
            throw error;
        }
    };
};

/* reducer 정의 */
export const studentListByClassroomIdReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_STUDENT_LIST_BY_CLASSROOM_ID:
            return {
                ...state,
                studentList: action.studentList
            };

        default:
            return state;
    }
};
