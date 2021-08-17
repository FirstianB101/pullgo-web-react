import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as formReducer } from "redux-form";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { fetchStudentIdReducer } from "./fetchStudentId";
import { fetchStudentJoinedAcademyListReducer } from "./fetchStudentJoinedAcademyList";
import { fetchStudentInfoReducer } from "./fetchStudentInfo";
import { fetchAcademyListReducer } from "./fetchAcademyList";

const middleware = [logger, thunk];

// reducer들을 rootReducer로 combine
export const rootReducer = combineReducers({
	form: formReducer,
	fetchStudentIdReducer,
	fetchStudentJoinedAcademyListReducer,
	fetchStudentInfoReducer,
	fetchAcademyListReducer
});

// store 생성
export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);
// 미들웨어 추가하면(applyMiddleware), state 변할 때 console에 로그 찍힘

// console.log(store.getState());
// store에 저장된 초기 state 값 확인
