/* action 정의 */
const FETCH_ACADEMY_APPLIED_CHECKED_TEACHER_LIST =
    "FETCH_ACADEMY_APPLIED_CHECKED_TEACHER_LIST";

/* action 생성 함수 정의 */
export const fetchAcademyAppliedCheckedTeacherList = (checkedTeacherList) => {
    return {
        type: FETCH_ACADEMY_APPLIED_CHECKED_TEACHER_LIST,
        checkedTeacherList
    };
};

/* 초기 state 정의 */
const initState = {
    checkedTeacherList: []
};

export const apiFetchAcademyAppliedCheckedTeacherList = (
    checkedTeacherList
) => {
    return (dispatch) => {
        // action 생성 함수 dispatch
        dispatch(fetchAcademyAppliedCheckedTeacherList(checkedTeacherList));
    };
};

/* reducer 정의 */
export const academyAppliedCheckedTeacherListReducer = (
    state = initState,
    action
) => {
    switch (action.type) {
        case FETCH_ACADEMY_APPLIED_CHECKED_TEACHER_LIST:
            return {
                ...state,
                checkedTeacherList: action.checkedTeacherList
            };

        default:
            return state;
    }
};
