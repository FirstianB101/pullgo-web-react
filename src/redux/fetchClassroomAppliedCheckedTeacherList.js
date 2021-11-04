/* action 정의 */
const FETCH_CLASSROOM_APPLIED_CHECKED_TEACHER_LIST =
    "FETCH_CLASSROOM_APPLIED_CHECKED_TEACHER_LIST";

/* action 생성 함수 정의 */
export const fetchClassroomAppliedCheckedTeacherList = (checkedTeacherList) => {
    return {
        type: FETCH_CLASSROOM_APPLIED_CHECKED_TEACHER_LIST,
        checkedTeacherList
    };
};

/* 초기 state 정의 */
const initState = {
    checkedTeacherList: []
};

export const apiFetchClassroomAppliedCheckedTeacherList = (
    checkedTeacherList
) => {
    return (dispatch) => {
        // action 생성 함수 dispatch
        dispatch(fetchClassroomAppliedCheckedTeacherList(checkedTeacherList));
    };
};

/* reducer 정의 */
export const classroomAppliedCheckedTeacherListReducer = (
    state = initState,
    action
) => {
    switch (action.type) {
        case FETCH_CLASSROOM_APPLIED_CHECKED_TEACHER_LIST:
            return {
                ...state,
                checkedTeacherList: action.checkedTeacherList
            };

        default:
            return state;
    }
};
