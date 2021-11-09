/* action 정의 */
const FETCH_ACADEMY_APPLIED_CHECKED_STUDENT_LIST =
    "FETCH_ACADEMY_APPLIED_CHECKED_STUDENT_LIST";

/* action 생성 함수 정의 */
export const fetchAcademyAppliedCheckedStudentList = (checkedStudentList) => {
    return {
        type: FETCH_ACADEMY_APPLIED_CHECKED_STUDENT_LIST,
        checkedStudentList
    };
};

/* 초기 state 정의 */
const initState = {
    checkedStudentList: []
};

export const apiFetchAcademyAppliedCheckedStudentList = (
    checkedStudentList
) => {
    return (dispatch) => {
        // action 생성 함수 dispatch
        dispatch(fetchAcademyAppliedCheckedStudentList(checkedStudentList));
    };
};

/* reducer 정의 */
export const academyAppliedCheckedStudentListReducer = (
    state = initState,
    action
) => {
    switch (action.type) {
        case FETCH_ACADEMY_APPLIED_CHECKED_STUDENT_LIST:
            return {
                ...state,
                checkedStudentList: action.checkedStudentList
            };

        default:
            return state;
    }
};
