import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
// import storageSession from "redux-persist/lib/storage/session";
// Session Storage에 저장
import storage from "redux-persist/lib/storage";
// Local Storage에 저장
import { reducer as formReducer } from "redux-form";
import { fetchStudentIdReducer } from "./fetchStudentId";
import { fetchStudentJoinedAcademyListReducer } from "./fetchStudentJoinedAcademyList";
import { fetchStudentInfoReducer } from "./fetchStudentInfo";
import { fetchAcademyListReducer } from "./fetchAcademyList";

// reducer들을 rootReducer로 combine
export const rootReducer = combineReducers({
    form: formReducer,
    fetchStudentIdReducer,
    fetchStudentJoinedAcademyListReducer,
    fetchStudentInfoReducer,
    fetchAcademyListReducer
});

export const persistConfig = {
    key: "root",
    // storageSession,
    storage,
    whitelist: ["fetchStudentIdReducer"]
    // blacklist: persist 저장 제외할 것들
};

export default persistReducer(persistConfig, rootReducer);