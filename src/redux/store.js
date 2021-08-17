import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const middleware = [logger, thunk];

// store 생성
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

// console.log(store.getState());
// store에 저장된 초기 state 값 확인

export const persistor = persistStore(store);

export default { store, persistor };