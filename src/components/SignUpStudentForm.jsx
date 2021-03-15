import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
// import { render } from "@testing-library/react";
import { regID, regPW, deleteHyphenFromPhoneNum } from "../module/SignUp";

const renderField = ({
    input,
    type,
    label,
    placeholder,
    meta: { touched, error },
    min,
    max
}) => {
    const [value, setValue] = useState("");
    if (type === "tel" && value.includes("-")) {
        setValue();
    }

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
};

function validate(values) {
    const errors = {};

    // ID 양식 확인
    if (values.id) {
        if (
            regID.test(values.id) ||
            values.id.length < 5 ||
            values.id.length > 16
        ) {
            errors.id = "양식에 맞는 아이디를 입력해주세요!";
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
            errors.pw = "양식에 맞는 비밀번호를 입력해주세요!";
        }
    }

    // PW 불일치 확인
    if (values.pw_check) {
        if (values.pw !== values.pw_check) {
            errors.pw_check = "비밀번호가 일치하지 않습니다!";
        }
    }

    // 전화번호
    if (values.phone_num) {
        if (values.phone_num.includes("-")) {
            values.phone_num = deleteHyphenFromPhoneNum(values.phone_num);
        }
    }

    return errors;
}

// 부모 컴포넌트 SignUpStudent 로부터 props로 onSubmitForm 받음
const SignUpStudentForm = ({ handleSubmit, pristine, submitting }) => {
    return (
        <form className="sign_up__form" onSubmit={handleSubmit}>
            <Field
                name="id"
                type="text"
                label="아이디"
                placeholder="아이디 입력"
                component={renderField}
            />

            <Field
                name="pw"
                type="password"
                label="비밀번호"
                placeholder="비밀번호 입력"
                component={renderField}
            />

            <Field
                name="pw_check"
                type="password"
                label="비밀번호 확인"
                placeholder="비밀번호 재입력"
                component={renderField}
            />

            <Field
                name="name"
                type="text"
                label="이름"
                placeholder="이름 입력"
                component={renderField}
            />

            <Field
                name="phone_number"
                type="tel"
                label="휴대전화"
                placeholder="전화번호 입력('-' 없이 입력)"
                component={renderField}
            />

            <Field
                name="phone_certification"
                type="text"
                placeholder="인증번호 입력"
                component={renderField}
            />

            <Field
                name="parent_phone_number"
                type="tel"
                label="부모님 휴대전화"
                placeholder="부모님 전화번호 입력('-' 없이 입력)"
                component={renderField}
            />

            <Field
                name="school_name"
                type="text"
                label="학교"
                placeholder="학교 이름 입력(e.g. 광운중학교)"
                component={renderField}
            />

            <Field
                name="school_grade"
                type="number"
                placeholder="학년 입력"
                min="1"
                max="3"
                component={renderField}
            />

            <button type="submit">회원가입</button>
        </form>
    );
};

export default reduxForm({
    form: "SignUpStudentForm",
    validate
    // onSubmit: onSubmitForm
})(SignUpStudentForm);
