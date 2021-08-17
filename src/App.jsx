import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/index";

import "./styles/App.css";
import LogInContainer from "./container/LogInContainer";
import SignUpStudent from "./routes/SignUpStudent";
import SignUpTeacher from "./routes/SignUpTeacher";
import SignUpMenu from "./routes/SignUpMenu";
import FindAccount from "./routes/FindAccount";

import StudentMain from "./routes/StudentMain";
import ApplyAcademyStudent from "./routes/ApplyAcademyStudent";

import LessonScheduleTeacher from "./routes/LessonScheduleTeacher";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path="/" component={LogInContainer} exact={true} />
					<Route path="/signup_menu" component={SignUpMenu} />
					<Route path="/signup_student" component={SignUpStudent} />
					<Route path="/signup_teacher" component={SignUpTeacher} />
					<Route path="/find_account" component={FindAccount} />

					<Route path="/student_main" component={StudentMain} />
					<Route
						path="/student_apply_academy"
						component={ApplyAcademyStudent}
					/>

					<LogInContainer />
				</Switch>
			</BrowserRouter>

			{/* <LessonScheduleTeacher /> */}
		</Provider>
	);
}

export default App;
