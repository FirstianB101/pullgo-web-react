import React, { useState } from "react";
import { connect } from "react-redux";
// index 폴더에서 action import

import "../styles/SignUp.css";
import "../module/SignUp";
import "../components/SignUpStudentForm";
import SignUpStudentForm from "../components/SignUpStudentForm";
import SelectInput from "@material-ui/core/Select/SelectInput";

const SignUpStudent = () => {
    // const [id, setId] = useState("");
    // const [pw, setPw] = useState("");
    // const [pwCheck, setPwCheck] = useState("");
    // const [name, setName] = useState("");
    // const [phoneNum, setPhoneNum] = useState("");
    // const [phoneCertification, setPhoneCertification] = useState("");
    // const [parentPhoneNum, setParentPhoneNum] = useState("");
    // const [schoolName, setSchoolName] = useState("");
    // const [schoolGrade, setSchoolGrade] = useState("");

    const onSubmitForm = (e) => {
        alert(`${e.id}, ${e.pw}, ${e.pw_check}, ${e.name},
        ${e.phone_number}, ${e.phone_certification},
        ${e.parent_phone_number}, ${e.school_name}, ${e.school_grade}`);
    };

    return (
        <div className="sign_up__page">
            {/* 텍스트 제목 or 로고 삽입 */}
            <h1>Firstian</h1>

            {/* <form className="sign_up__form" onSubmit={onSubmitForm}>
            </form> */}

            <SignUpStudentForm onSubmit={onSubmitForm} />
        </div>
    );
};

export default connect()(SignUpStudent);
