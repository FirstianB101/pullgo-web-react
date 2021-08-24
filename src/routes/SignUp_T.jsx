import React, { memo } from "react";
import { connect } from "react-redux";
// index 폴더에서 action import

import "../styles/SignUp.css";
import SignUpForm_T from "../components/SignUpForm_T";

const SignUp_T = memo(() => {
	const onSubmitForm = (e) => {
		alert(`${e.id}, ${e.pw}, ${e.pw_check}, ${e.name},
        ${e.phone_number}, ${e.phone_certification}`);
	};

	return (
		<div className="sign_up__page">
			<h1>Firstian</h1>
			<SignUpForm_T onSubmit={onSubmitForm} />
		</div>
	);
});

export default connect()(SignUp_T);
