import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
// import storageSession from "redux-persist/lib/storage/session";
// Session Storage에 저장
import storage from "redux-persist/lib/storage";
// Local Storage에 저장

import { reducer as formReducer } from "redux-form";
import { userTypeReducer } from "./fetchUserType";
import { joinedAcademyListReducer } from "./fetchJoinedAcademyList";
import { applyingAcademyListReducer } from "./fetchApplyingAcademyList";
import { academyListByAcademyNameReducer } from "./fetchAcademyListByAcademyName";
import { classroomListByAcademyIdAndNameReducer } from "./fetchClassroomListByAcademyIdAndName";
import { joinedClassroomListReducer } from "./fetchJoinedClassroomList";
import { applyingClassroomListReducer } from "./fetchApplyingClassroomList";

import { lessonListReducer } from "./fetchLessonList";

/* 반 관리 - 시험 관리, 학생 관리, 요청 관리, 반 수정 및 삭제 */
import { examListReducer } from "./fetchExamList";
import { classroomJoinedStudentListReducer } from "./fetchClassroomJoinedStudentList";
import { classroomJoinedTeacherListReducer } from "./fetchClassroomJoinedTeacherList";
import { classroomAppliedStudentListReducer } from "./fetchClassroomAppliedStudentList";
import { classroomAppliedTeacherListReducer } from "./fetchClassroomAppliedTeacherList";
import { classroomAppliedCheckedStudentListReducer } from "./fetchClassroomAppliedCheckedStudentList";
import { classroomAppliedCheckedTeacherListReducer } from "./fetchClassroomAppliedCheckedTeacherList";
import { classroomReducer } from "./fetchClassroom";

/* 학원 관리 - 요청 관리, 구성원 관리, 권한 위임, 학원 수정 및 삭제 */
import { academyAppliedStudentListReducer } from "./fetchAcademyAppliedStudentList";
import { academyAppliedTeacherListReducer } from "./fetchAcademyAppliedTeacherList";
import { academyAppliedCheckedStudentListReducer } from "./fetchAcademyAppliedCheckedStudentList";
import { academyAppliedCheckedTeacherListReducer } from "./fetchAcademyAppliedCheckedTeacherList";
import { academyJoinedStudentListReducer } from "./fetchAcademyJoinedStudentList";
import { academyJoinedTeacherListReducer } from "./fetchAcademyJoinedTeacherList";

import { studentIdReducer } from "./student/fetchStudentId";
import { studentInfoReducer } from "./student/fetchStudentInfo";
import { teacherIdReducer } from "./teacher/fetchTeacherId";
import { teacherInfoReducer } from "./teacher/fetchTeacherInfo";
import { authTokenReducer } from "./fetchAuthToken";

// reducer들을 rootReducer로 combine
export const rootReducer = combineReducers({
    form: formReducer,
    userTypeReducer,
    joinedAcademyListReducer,
    applyingAcademyListReducer,
    joinedClassroomListReducer,
    applyingClassroomListReducer,
    academyListByAcademyNameReducer,
    classroomListByAcademyIdAndNameReducer,

    lessonListReducer,

    /* 반 관리 - 시험 관리, 학생 관리, 요청 관리, 반 수정 및 삭제 */
    examListReducer,
    classroomJoinedStudentListReducer,
    classroomJoinedTeacherListReducer,
    classroomAppliedStudentListReducer,
    classroomAppliedTeacherListReducer,
    classroomAppliedCheckedStudentListReducer,
    classroomAppliedCheckedTeacherListReducer,
    classroomReducer,

    /* 학원 관리 - 요청 관리, 구성원 관리, 권한 위임, 학원 수정 및 삭제 */
    academyAppliedStudentListReducer,
    academyAppliedTeacherListReducer,
    academyAppliedCheckedStudentListReducer,
    academyAppliedCheckedTeacherListReducer,
    academyJoinedStudentListReducer,
    academyJoinedTeacherListReducer,

    /* 학생 */
    studentIdReducer,
    studentInfoReducer,

    /* 선생님 */
    teacherIdReducer,
    teacherInfoReducer,

    authTokenReducer
});

export const persistConfig = {
    key: "root",
    // storageSession,
    storage,
    whitelist: [
        "userTypeReducer",
        "joinedAcademyListReducer",
        "applyingAcademyListReducer",
        "joinedClassroomListReducer",
        "applyingClassroomListReducer",

        "lessonListReducer",

        /* 반 관리 - 시험 관리, 학생 관리, 요청 관리, 반 수정 및 삭제 */
        "examListReducer",
        "classroomJoinedStudentListReducer",
        "classroomJoinedTeacherListReducer",
        "classroomAppliedStudentListReducer",
        "classroomAppliedTeacherListReducer",
        // "classroomAppliedCheckedStudentListReducer",

        /* 학원 관리 - 요청 관리, 구성원 관리, 권한 위임, 학원 수정 및 삭제 */
        "academyAppliedStudentListReducer",
        "academyAppliedTeacherListReducer",
        "academyJoinedStudentListReducer",
        "academyJoinedTeacherListReducer",

        "studentIdReducer",
        "studentInfoReducer",

        "teacherIdReducer",
        "teacherInfoReducer",

        "authTokenReducer"
    ]
    // blacklist: persist 저장 제외할 것들
};

export default persistReducer(persistConfig, rootReducer);
