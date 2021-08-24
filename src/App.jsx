import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./styles/App.css";
import LogInContainer from "./container/LogInContainer";
import SignUp_S from "./routes/SignUp_S";
import SignUp_T from "./routes/SignUp_T";
import SignUpMenu from "./routes/SignUpMenu";
import FindAccount from "./routes/FindAccount";

import MainPage_S from "./routes/MainPage_S";
import AcademyInfo_S from "./routes/AcademyInfo_S";
import ApplyAcademy_S from "./routes/ApplyAcademy_S";
import ClassroomInfo_S from "./routes/ClassroomInfo_S";
import ApplyClassroom_S from "./routes/ApplyClassroom_S";

import LessonSchedule_T from "./routes/LessonSchedule_T";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={LogInContainer} exact={true} />
				<Route path="/signup_menu" component={SignUpMenu} />
				<Route path="/signup_student" component={SignUp_S} />
				<Route path="/signup_teacher" component={SignUp_T} />
				<Route path="/find_account" component={FindAccount} />

				<Route path="/student_main" component={MainPage_S} />

				{/* MenuBar의 학원 가입 */}
				<Route path="/student_academy_info" component={AcademyInfo_S} />
				<Route
					path="/student_apply_academy"
					component={ApplyAcademy_S}
				/>

				{/* MenuBar의 반 가입 */}
				<Route
					path="/student_classroom_info"
					component={ClassroomInfo_S}
				/>
				<Route
					path="/student_apply_classroom"
					component={ApplyClassroom_S}
				/>

				<LogInContainer />
			</Switch>
		</BrowserRouter>

		// {/* <LessonSchedule_T /> */}
	);
}

export default App;
