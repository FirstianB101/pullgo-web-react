import React, { memo } from "react";

// import { render } from "@testing-library/react";
import { Field, reduxForm } from "redux-form";
import { regID, regPW, deleteHyphenFromPhoneNum } from "../module/SignUp";

const RenderField = memo(
	({
		input,
		type,
		label,
		placeholder,
		meta: { touched, error },
		min,
		max
	}) => {
		return (
			<div className="render_field">
				<label>{label}</label>
				<input
					{...input}
					type={type}
					placeholder={placeholder}
					required
					min={min}
					max={max}
				/>
				{touched && error && <span className="error">{error}</span>}
			</div>
		);
	}
);

function validate(values) {
	const errors = {};

	// ID 양식 확인
	if (values.id) {
		if (
			regID.test(values.id) ||
			values.id.length < 5 ||
			values.id.length > 16
		) {
			errors.id = "5~16자의 영문 소문자, 숫자, 특수문자(-, _)";
		}
		if (values.id === "dmstjd365") {
			errors.id = "중복된 아이디 입니다!";
		}
	}

	// PW 양식 확인
	if (values.pw) {
		if (
			regPW.test(values.pw) ||
			values.pw.length < 8 ||
			values.pw.length > 16
		) {
			errors.pw = "8~16자의 영문 대소문자, 숫자, 특수문자";
		}
	}

	// PW 불일치 확인
	if (values.pw_check) {
		if (values.pw !== values.pw_check) {
			errors.pw_check = "비밀번호가 일치하지 않습니다!";
		}
	}

	// 전화번호
	if (values.phone_number) {
		if (values.phone_number.includes("-")) {
			values.phone_number = deleteHyphenFromPhoneNum(values.phone_number);
		}
	}

	// 부모님 전화번호
	if (values.parent_phone_number) {
		if (values.parent_phone_number.includes("-")) {
			values.parent_phone_number = deleteHyphenFromPhoneNum(
				values.parent_phone_number
			);
		}
	}

	// 학교
	if (values.school_name) {
		if (!values.school_name.includes("학교")) {
			errors.school_name = `"~학교" 형식으로 입력해주세요. e.g. 광운중학교`;
		}
	}

	return errors;
}

// 부모 컴포넌트 SignUpStudent 로부터 props로 onSubmitForm 받음
const SignUpForm_S = memo(({
	handleSubmit, pristine, submitting
}) => {
	return (
		<form className="sign_up__form" onSubmit={handleSubmit}>
			<Field
				name="id"
				type="text"
				label="아이디"
				placeholder="아이디 입력"
				component={RenderField}
			/>

			<Field
				name="pw"
				type="password"
				label="비밀번호"
				placeholder="비밀번호 입력"
				component={RenderField}
			/>

			<Field
				name="pw_check"
				type="password"
				label="비밀번호 확인"
				placeholder="비밀번호 재입력"
				component={RenderField}
			/>

			<Field
				name="name"
				type="text"
				label="이름"
				placeholder="이름 입력"
				component={RenderField}
			/>

			<div className="phone_field">
				<Field
					name="phone_number"
					type="tel"
					label="휴대전화"
					placeholder="전화번호 입력('-' 없이 입력)"
					component={RenderField}
				/>
				<button
					type="button"
					className="btn__phone_certification_request"
				>
					인증 요청
				</button>
			</div>

			<div className="phone_field">
				<Field
					name="phone_certification"
					type="text"
					placeholder="인증번호 입력"
					component={RenderField}
				/>
				<button
					type="button"
					className="btn__phone_certification_check"
				>
					인증번호 확인
				</button>
			</div>

			<Field
				name="parent_phone_number"
				type="tel"
				label="부모님 휴대전화"
				placeholder="부모님 전화번호 입력('-' 없이 입력)"
				component={RenderField}
			/>

			<Field
				name="school_name"
				type="text"
				label="학교"
				placeholder="학교 이름 입력(e.g. 광운중학교)"
				component={RenderField}
			/>

			<Field
				name="school_grade"
				type="number"
				placeholder="학년 입력"
				min="1"
				max="3"
				component={RenderField}
			/>

			<button type="submit">회원가입</button>
		</form>
	);
});

export default reduxForm({
	form: "SignUpForm_S",
	validate,
	// onSubmit: onSubmitForm
})(SignUpForm_S);
