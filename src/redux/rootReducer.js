import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
    // 다른 reducer들 추가
    form: formReducer
});

export default rootReducer;
