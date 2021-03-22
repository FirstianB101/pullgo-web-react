import React, { memo } from "react";
import { connect } from "react-redux";
// index 폴더에서 action import

import "../styles/SignUp.css";
import SignUpTeacherForm from "../components/SignUpTeacherForm";

const SignUpTeacher = memo(() => {
    const onSubmitForm = (e) => {
        alert(`${e.id}, ${e.pw}, ${e.pw_check}, ${e.name},
        ${e.phone_number}, ${e.phone_certification}`);
    };

    return (
        <div className="sign_up__page">
            <h1>Firstian</h1>
            <SignUpTeacherForm onSubmit={onSubmitForm} />
        </div>
    );
});

export default connect()(SignUpTeacher);
