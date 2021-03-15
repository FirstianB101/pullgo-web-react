import React, { memo } from "react";
import { connect } from "react-redux";
// index 폴더에서 action import

import "../styles/SignUp.css";
import "../module/SignUp";
import "../components/SignUpStudentForm";
import SignUpStudentForm from "../components/SignUpStudentForm";

const SignUpStudent = memo(() => {
    const onSubmitForm = (e) => {
        alert(`${e.id}, ${e.pw}, ${e.pw_check}, ${e.name},
        ${e.phone_number}, ${e.phone_certification},
        ${e.parent_phone_number}, ${e.school_name}, ${e.school_grade}`);
    };

    return (
        <div className="sign_up__page">
            <h1>Firstian</h1>
            <SignUpStudentForm onSubmit={onSubmitForm} />
        </div>
    );
});

export default connect()(SignUpStudent);
