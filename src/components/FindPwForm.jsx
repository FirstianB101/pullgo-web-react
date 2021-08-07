import React, { memo } from "react";
import { Field, reduxForm } from "redux-form";

import { deleteHyphenFromPhoneNum } from "../module/SignUp";

const RenderField = memo(
    ({ input, type, label, placeholder, meta: { touched, error } }) => {
        return (
            <div className="render_field">
                <label>{label}</label>
                <input
                    {...input}
                    type={type}
                    placeholder={placeholder}
                    required
                />
                {touched && error && <span className="error">{error}</span>}
            </div>
        );
    }
);

function validate(values) {
    const errors = {};

    // 전화번호
    if (values.phone_number) {
        if (values.phone_number.includes("-")) {
            values.phone_number = deleteHyphenFromPhoneNum(values.phone_number);
        }
    }

    return errors;
}

const FindPwForm = memo(({ handleSubmit, pristine, submitting }) => {
    return (
        <form className="find_pw__form" onSubmit={handleSubmit}>
            <Field
                name="id"
                type="text"
                label="아이디"
                placeholder="아이디를 입력해주세요"
                component={RenderField}
            />

            <Field
                name="phone_number"
                type="tel"
                label="휴대전화"
                placeholder="전화번호를 입력해주세요 ('-' 없이 입력)"
                component={RenderField}
            />

            <button type="submit">비밀번호 찾기</button>
        </form>
    );
});

export default reduxForm({
    form: "FindPwForm",
    validate
})(FindPwForm);
