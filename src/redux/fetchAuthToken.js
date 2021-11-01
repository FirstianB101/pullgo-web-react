import axios from "axios";

/* action 정의 */
const FETCH_AUTH_TOKEN = "FETCH_AUTH_TOKEN";

/* action 생성 함수 정의 */
export const fetchAuthToken = (authToken, status) => {
    return {
        type: FETCH_AUTH_TOKEN,
        authToken,
        status
    };
};

/* 초기 state 정의 */
const initState = {
    authToken: ""
};

/* 서버 API로부터 authToken 수신 */
export const apiFetchAuthToken = (username, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("/v1/auth/token", {
                username,
                password
            });

            dispatch(fetchAuthToken(response.data.token, response.status));
        } catch (error) {
            throw error;
        }
    };
};

export const saveAuthToken = (authToken, status) => {
    return (dispatch) => {
        try {
            dispatch(fetchAuthToken(authToken, status));
        } catch (error) {
            throw error;
        }
    };
};

/* reducer 정의 */
export const authTokenReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_AUTH_TOKEN:
            return {
                ...state,
                authToken: action.authToken,
                status: action.status
            };

        default:
            return state;
    }
};
