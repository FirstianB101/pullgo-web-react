import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
// import storageSession from "redux-persist/lib/storage/session";
// Session Storage에 저장
import storage from "redux-persist/lib/storage";
// Local Storage에 저장
import { reducer as formReducer } from "redux-form";
import { fetchStudentIdReducer } from "./fetchStudentId";
import { fetchStudentInfoReducer } from "./fetchStudentInfo";
import { fetchAcademyListByAcademyNameReducer } from "./fetchAcademyListByAcademyName";
import { fetchStudentJoinedAcademyListReducer } from "./fetchStudentJoinedAcademyList";
import { fetchStudentApplyingAcademyListReducer } from "./fetchStudentApplyingAcademyList";
import { fetchStudentJoinedClassroomListReducer } from "./fetchStudentJoinedClassroomList";
import { fetchStudentApplyingClassroomListReducer } from "./fetchStudentApplyingClassroomList";

// reducer들을 rootReducer로 combine
export const rootReducer = combineReducers({
	form: formReducer,
	fetchStudentIdReducer,
	fetchStudentInfoReducer,
	fetchAcademyListByAcademyNameReducer,
	fetchStudentJoinedAcademyListReducer,
	fetchStudentApplyingAcademyListReducer,
	fetchStudentJoinedClassroomListReducer,
	fetchStudentApplyingClassroomListReducer
});

export const persistConfig = {
	key: "root",
	// storageSession,
	storage,
	whitelist: [
		"fetchStudentIdReducer",
		"fetchStudentInfoReducer",
		"fetchStudentJoinedAcademyListReducer",
		"fetchStudentApplyingAcademyListReducer",
		"fetchStudentJoinedClassroomListReducer",
		"fetchStudentApplyingClassroomListReducer"
	]
	// blacklist: persist 저장 제외할 것들
};

export default persistReducer(persistConfig, rootReducer);
