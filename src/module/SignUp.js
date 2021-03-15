// ID 형식: 5~16자의 영문 소문자, 숫자, 특수문자(-, _)
export const regID = /[^a-zA-Z0-9-_]/;
// PW 형식: 8~16자의 영문 대소문자, 숫자, 특수문자
export const regPW = /[^a-zA-Z0-9!@#$%^&*()-_+={}\\|"]/;

// 전화번호 "-" 제거
export const deleteHyphenFromPhoneNum = (phoneNum) => {
    let phoneNumberWithoutHyphen = "";
    let pos = 0;

    while (true) {
        let foundPos = phoneNum.indexOf("-", pos);
        phoneNumberWithoutHyphen += phoneNum.slice(pos, foundPos);

        if (foundPos === -1) {
            phoneNumberWithoutHyphen += phoneNum[phoneNum.length - 1];
            break;
        }

        pos = foundPos + 1;
    }

    return phoneNumberWithoutHyphen;
};

// ~ "학교" 추가
export const addSchool = (schoolName) => {
    let schoolNameWithForm = schoolName;

    if (schoolName.endsWith("초") || schoolName.endsWith("고")) {
        schoolNameWithForm += "등학교";
    } else if (schoolName.endsWith("중") || schoolName.endsWith("대")) {
        schoolNameWithForm += "학교";
    }

    return schoolNameWithForm;
};
