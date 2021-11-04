import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./styles/App.css";
import LogInContainer from "./container/LogInContainer";
import SignUp_S from "./routes/SignUp_S";
import SignUp_T from "./routes/SignUp_T";
import SignUpMenu from "./routes/SignUpMenu";
import FindAccount from "./routes/FindAccount";

import AcademyInfo from "./routes/AcademyInfo";
import ApplyAcademy from "./routes/ApplyAcademy";
import ClassroomInfo from "./routes/ClassroomInfo";
import ApplyClassroom from "./routes/ApplyClassroom";

import MainPage from "./routes/MainPage";
import ManageClassroom from "./routes/ManageClassroom";
import ManageExam from "./routes/ManageExam";
import ManageStudent from "./routes/ManageStudent";
import ManageClassroomApply from "./routes/ManageClassroomApply";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={LogInContainer} exact={true} />
                <Route path="/signup_menu" component={SignUpMenu} />
                <Route path="/signup_student" component={SignUp_S} />
                <Route path="/signup_teacher" component={SignUp_T} />
                <Route path="/find_account" component={FindAccount} />

                {/* MenuBar의 학원 가입 요청 */}
                <Route path="/student/academy_info" component={AcademyInfo} />
                <Route path="/teacher/academy_info" component={AcademyInfo} />
                <Route path="/student/apply_academy" component={ApplyAcademy} />
                <Route path="/teacher/apply_academy" component={ApplyAcademy} />

                {/* MenuBar의 반 가입 요청 */}
                <Route
                    path="/student/classroom_info"
                    component={ClassroomInfo}
                />
                <Route
                    path="/teacher/classroom_info"
                    component={ClassroomInfo}
                />
                <Route
                    path="/student/apply_classroom"
                    component={ApplyClassroom}
                />
                <Route
                    path="/teacher/apply_classroom"
                    component={ApplyClassroom}
                />

                {/* Main 메뉴 => YesAcademy 또는 NoAcademy */}
                <Route path="/student/main" component={MainPage} />
                <Route
                    path="/teacher/main/calendar/:year_month"
                    component={MainPage}
                />

                {/* 반 관리 - 시험 관리, 학생 관리, 요청 관리, 반 수정 및 삭제 */}
                <Route
                    path="/teacher/manage_classroom"
                    component={ManageClassroom}
                />
                <Route path="/teacher/manage_exam" component={ManageExam} />
                <Route
                    path="/teacher/manage_student"
                    component={ManageStudent}
                />
                <Route
                    path="/teacher/manage_classroom_apply"
                    component={ManageClassroomApply}
                />

                <LogInContainer />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
