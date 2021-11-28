import React, { memo } from "react";
import { connect } from "react-redux";
import axios from "axios";

import SignUpForm_T from "../components/SignUpForm_T";

import "../styles/SignUp.css";

const SignUp_T = memo(({ history }) => {
	const onSubmitForm = async (e) => {
		// e.preventDefault();

		const postCreateTeacher = async () => {
			try {
				const response = await axios.post(
					"/v1/teachers",
					{
						account: {
							username: e.id,
							password: e.pw,
							fullName: e.name,
							phone: e.phone_number
						}
					}
				);

				if (response.status === 201)
					alert("회원가입 되었습니다.");
			}
			catch (e) {
				alert("회원가입 오류");
				console.log(e);
			}
		};

		await postCreateTeacher();
		history.push("/");
	};

	return (
		<div className="sign_up__page">
			<h1>Firstian</h1>
			<SignUpForm_T onSubmit={onSubmitForm} />
		</div>
	);
});

export default connect()(SignUp_T);
