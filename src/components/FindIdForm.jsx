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

const FindIdForm = ({ onSubmitFindIdForm, pristine, submitting }) => {
    return (
        <form className="find_id__form" onSubmit={onSubmitFindIdForm}>
            <Field
                name="name"
                type="text"
                label="이름"
                placeholder="이름을 입력해주세요"
                component={RenderField}
            />

            <Field
                name="phone_number"
                type="tel"
                label="휴대전화"
                placeholder="전화번호를 입력해주세요 ('-' 없이 입력)"
                component={RenderField}
            />

            <button type="submit">아이디 찾기</button>
        </form>
    );
};

export default reduxForm({
    form: "FindIdForm",
    validate
})(FindIdForm);
