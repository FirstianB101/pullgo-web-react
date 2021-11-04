/* action 정의 */
const FETCH_CLASSROOM_APPLIED_CHECKED_STUDENT_LIST =
    "FETCH_CLASSROOM_APPLIED_CHECKED_STUDENT_LIST";

/* action 생성 함수 정의 */
export const fetchClassroomAppliedCheckedStudentList = (checkedStudentList) => {
    return {
        type: FETCH_CLASSROOM_APPLIED_CHECKED_STUDENT_LIST,
        checkedStudentList
    };
};

/* 초기 state 정의 */
const initState = {
    checkedStudentList: []
};

export const apiFetchClassroomAppliedCheckedStudentList = (
    checkedStudentList
) => {
    return (dispatch) => {
        // action 생성 함수 dispatch
        dispatch(fetchClassroomAppliedCheckedStudentList(checkedStudentList));
    };
};

/* reducer 정의 */
export const classroomAppliedCheckedStudentListReducer = (
    state = initState,
    action
) => {
    switch (action.type) {
        case FETCH_CLASSROOM_APPLIED_CHECKED_STUDENT_LIST:
            return {
                ...state,
                checkedStudentList: action.checkedStudentList
            };

        default:
            return state;
    }
};
