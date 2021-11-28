import React, { memo } from "react";
import { connect } from "react-redux";
import axios from "axios";

import SignUpForm_S from "../components/SignUpForm_S";

import "../styles/SignUp.css";

const SignUp_S = memo(({ history }) => {
	const onSubmitForm = async (e) => {
		// e.preventDefault();

		const postCreateStudent = async () => {
			try {
				const response = await axios.post(
					"/v1/students",
					{
						account: {
							username: e.id,
							password: e.pw,
							fullName: e.name,
							phone: e.phone_number
						},
						parentPhone: e.parent_phone_number,
						schoolName: e.school_name,
						schoolYear: e.school_grade
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

		await postCreateStudent();
		history.push("/");
	};

	return (
		<div className="sign_up__page">
			<h1>Firstian</h1>
			<SignUpForm_S onSubmit={onSubmitForm} />
		</div>
	);
});

export default connect()(SignUp_S);
