import React from "react";
import { Link } from "react-router-dom";

import "../styles/SignUpMenu.css";

const SignUpMenu = () => {
	return (
		<div className="sign_up__menu">
			<Link to="/signup_student">학생</Link>
			<Link to="/signup_teacher">선생님</Link>
		</div>
	);
};

export default SignUpMenu;
