import React from "react";
import LogIn from "../routes/LogIn";

/* LogIn 라우터(Presenter)를 관리하는 Container */
/* history props: 로그인 -> 메인 화면 링크 이동을 위해 전달 */
const LogInContainer = ({ history, match }) => {
    return <LogIn history={history} match={match} />;
};

export default LogInContainer;
