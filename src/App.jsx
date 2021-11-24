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

/* 반 관리 - 시험 관리, 학생 관리, 요청 관리, 반 수정 및 삭제 */
import ManageClassroom from "./routes/ManageClassroom";
import ManageExam from "./routes/ManageExam";
import ManageClassroomMembers from "./routes/ManageClassroomMembers";
import ManageStudent from "./routes/ManageClassroomMembers";
import ManageClassroomApply from "./routes/ManageClassroomApply";
import EditDeleteClassroom from "./routes/EditDeleteClassroom";

/* 학원 관리 - 요청 관리, // [원장 전용] 구성원 관리, 권한 위임, 학원 수정 및 삭제 */
import ManageAcademy from "./routes/ManageAcademy";
import ManageAcademyApply from "./routes/ManageAcademyApply";
import ManageAcademyMembers from "./routes/ManageAcademyMembers";
import EditDeleteAcademy from "./routes/EditDeleteAcademy";
import CreateAcademy from "./routes/CreateAcademy";

/* 시험 문제 출제 - 반 관리 -> 시험 관리 -> 시험 문제 출제 */
import ManageExamQuestion from "./routes/ManageExamQuestion";

/* [학생] 시험 목록, 시험 응시 */
import AssignedExam from "./routes/AssignedExam";
import TakeExam from "./routes/TakeExam";

/* [학생] 응시완료 시험 목록, 오답노트 */
import CompletedExam from "./routes/CompletedExam";
import ReviewExamNote from "./routes/ReviewExamNote";

/* [선생님] 시험 응시현황 확인 */
import ExamAttenderState from "./routes/ExamAttenderState";

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
                    path="/teacher/manage_classroom_members"
                    component={ManageClassroomMembers}
                />
                <Route
                    path="/teacher/manage_classroom_apply"
                    component={ManageClassroomApply}
                />
                <Route
                    path="/teacher/edit_delete_classroom"
                    component={EditDeleteClassroom}
                />

                {/* 학원 관리 - 요청 관리, // [원장 전용] 구성원 관리, 권한 위임, 학원 수정 및 삭제 */}
                <Route
                    path="/teacher/manage_academy"
                    component={ManageAcademy}
                />
                <Route
                    path="/teacher/manage_academy_apply"
                    component={ManageAcademyApply}
                />
                <Route
                    path="/teacher/manage_academy_members"
                    component={ManageAcademyMembers}
                />
                {/* <Route
                    path="/teacher/권한 위임"
                    // component={}
                /> */}
                <Route
                    path="/teacher/edit_delete_academy"
                    component={EditDeleteAcademy}
                />

                {/* 학원 개설 페이지 */}
                <Route
                    path="/teacher/create_academy"
                    component={CreateAcademy}
                />

                {/* 시험 문제 출제 - 반 관리 -> 시험 관리 -> 시험 문제 출제 */}
                <Route
                    path="/teacher/manage_exam_question"
                    component={ManageExamQuestion}
                />

                {/* [학생] 시험 목록, 시험 응시 */}
                <Route path="/student/assigned_exam" component={AssignedExam} />
                <Route path="/student/take_exam" component={TakeExam} />
                <Route path="/student/take_exam" component={TakeExam} />

                {/* [학생] 응시완료 시험 목록, 오답노트 */}
                <Route
                    path="/student/completed_exam"
                    component={CompletedExam}
                />
                <Route path="/student/review_exam" component={ReviewExamNote} />

                {/* [선생님] 시험 응시현황 확인 */}
                <Route
                    // path="/teacher/attender_state/classroom/exam"
                    path="/teacher/attender_state/"
                    component={ExamAttenderState}
                />

                <LogInContainer />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
