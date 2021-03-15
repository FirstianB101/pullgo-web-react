import React, { useState } from "react";
import PropTypes from "prop-types";

// ID 형식: 5~16자의 영문 소문자, 숫자, 특수문자(-, _)
const regID = /[^a-zA-Z0-9-_]/;
// PW 형식: 8~16자의 영문 대소문자, 숫자, 특수문자
const regPW = /[^a-zA-Z0-9!@#$%^&*()-_+={}\\|"]/;

// getId, getName ...
const Input = ({ type, name, pw_value, placeholder, label, isLogIn }) => {
    const [value, setValue] = useState("");
    const [isEmptyError, setIsEmptyError] = useState(false);
    const [isIdFormError, setIsIdFormError] = useState(false);
    const [isIdDuplicateError, setIsIdDuplicateError] = useState(false);
    const [isPwFormError, setIsPwFormError] = useState(false);
    const [isPwSameError, setIsPwSameError] = useState(false);

    const onChangeInput = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    };

    // const sendInputValue = () => {
    //     switch (name) {
    //         case "id":
    //             props.getId(value);
    //             break;

    //         case "pw":
    //             props.getPw(value);
    //             break;

    //         case "pw_check":
    //             props.getPwCheck(value);
    //             break;

    //         case "name":
    //             props.getName(value);
    //             break;

    //         case "phone_number":
    //             props.getPhoneNum(value);
    //             break;

    //         case "phone_certification":
    //             props.getPhoneCertification(value);
    //             break;

    //         case "parent_phone_number":
    //             props.getParentPhoneNum(value);
    //             break;

    //         case "school_name":
    //             props.getSchoolName(value);
    //             break;
    //     }
    // };

    const onBlurInput = () => {
        switch (value) {
            case "":
                setIsEmptyError(true);
                break;

            default:
                setIsEmptyError(false);

                // 테스트 코드: 서버에서 ID 정보 fetch해서 비교하기
                if (name === "id") {
                    setIsIdFormError(regID.test(value));

                    // ID 글자 수 부족 or 초과
                    if (value.length < 5 || value.length > 16) {
                        setIsIdFormError(true);
                    }

                    // ID 중복(서버에서 ID 정보 fetch해서 비교할 것)
                    if (value === "dmstjd365") {
                        setIsIdDuplicateError(true);
                    } else {
                        setIsIdDuplicateError(false);
                    }
                } else if (name === "pw") {
                    // props.getPw(value);
                    setIsPwFormError(regPW.test(value));

                    if (value.length < 8 || value.length > 16) {
                        setIsPwFormError(true);
                    }
                } else if (name === "pw_check") {
                    if (pw_value !== value) {
                        setIsPwSameError(true);
                    } else {
                        setIsPwSameError(false);
                    }
                }
        }

        // 휴대전화 입력 칸
        if (name.includes("phone_number")) {
            // 휴대전화 번호에 "-" 포함되어 있으면, 제외하고 숫자만 저장
            if (value.includes("-")) {
                let phoneNumberWithoutHyphen;
                let pos = 0;

                while (true) {
                    let foundPos = value.indexOf("-", pos);
                    phoneNumberWithoutHyphen += value.slice(pos, foundPos);

                    if (foundPos === -1) {
                        phoneNumberWithoutHyphen += value[value.length - 1];
                        break;
                    }

                    pos = foundPos + 1;
                }

                setValue(phoneNumberWithoutHyphen);
            }
        }

        // 학교 이름 입력 칸(학생)
        if (name === "school_name") {
            // ~ "학교" 라고 입력 안한 경우 ex) 광운중
            if (!value.endsWith("학교")) {
                let schoolNameWithForm = value;

                if (value.endsWith("초") || value.endsWith("고")) {
                    schoolNameWithForm += "등학교";
                } else if (value.endsWith("중") || value.endsWith("대")) {
                    schoolNameWithForm += "학교";
                }

                setValue(schoolNameWithForm);
            }
        }

        // sendInputValue();
    };

    const showErrorMessage = () => {
        if (isEmptyError) {
            return "필수 입력 정보 입니다.";
        } else if (isIdFormError) {
            return "5~16 자의 영문 소문자, 숫자, 특수문자(-, _)";
        } else if (isIdDuplicateError) {
            return "중복된 아이디 입니다.";
        } else if (isPwFormError) {
            return "8~16 자의 영문 대소문자, 숫자, 특수문자";
        } else if (isPwSameError) {
            return "비밀번호가 일치하지 않습니다.";
        } else return "";
    };

    return (
        <label className="Input__label">
            <span className="label">{label}</span>
            {isLogIn ? (
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChangeInput}
                    value={value}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChangeInput}
                    value={value}
                    onBlur={onBlurInput}
                />
            )}
            <span
                className={
                    "error_message " +
                    (showErrorMessage().length > 13
                        ? "error_message--long"
                        : "")
                }>
                {showErrorMessage()}
            </span>
        </label>
    );
};

Input.propTypes = {
    type: PropTypes.oneOf(["text", "password", "submit"]),
    name: PropTypes.string.isRequired, // 구분 목적
    placeholder: PropTypes.string,
    label: PropTypes.string,
    pw_value: PropTypes.string, // PW 일치 확인
    isLogIn: PropTypes.bool // LogIn에 사용되는 Input 컴포넌트인지
    // LogIn Input 컴포넌트이면, 에러 메시지 등 출력 X
};

Input.defaultProps = {
    isLogIn: false
};

export default Input;
