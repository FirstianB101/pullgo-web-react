import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import LogIn from "./routes/LogIn";
import SignUpStudent from "./routes/SignUpStudent";
import SignUpTeacher from "./routes/SignUpTeacher";
import SignUpMenu from "./routes/SignUpMenu";
import FindAccount from "./routes/FindAccount";

import LessonScheduleTeacher from "./routes/LessonScheduleTeacher";

function App() {
    return (
        <Provider store={store}>
            {/* <BrowserRouter>
                <Switch>
                    <Route path="/" component={LogIn} exact={true} />
                    <Route path="/signup_menu" component={SignUpMenu} />
                    <Route path="/signup_student" component={SignUpStudent} />
                    <Route path="/signup_teacher" component={SignUpTeacher} />
                    <Route path="/find_account" component={FindAccount} />

                    <LogIn />
                </Switch>
            </BrowserRouter> */}

            <LessonScheduleTeacher />
        </Provider>
    );
}

export default App;
