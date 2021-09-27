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
import { examListReducer } from "./fetchExamList";

import { studentIdReducer } from "./student/fetchStudentId";
import { studentInfoReducer } from "./student/fetchStudentInfo";

import { teacherIdReducer } from "./teacher/fetchTeacherId";
import { teacherInfoReducer } from "./teacher/fetchTeacherInfo";

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
	examListReducer,

	/* 학생 */
	studentIdReducer,
	studentInfoReducer,

	/* 선생님 */
	teacherIdReducer,
	teacherInfoReducer
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
		"examListReducer",

		"studentIdReducer",
		"studentInfoReducer",

		"teacherIdReducer",
		"teacherInfoReducer"
	]
	// blacklist: persist 저장 제외할 것들
};

export default persistReducer(persistConfig, rootReducer);
