import React, { useState, memo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import MenuBar_T from "../components/MenuBar_T";
import AddressSearch from "../components/AddressSearch";
import { deleteHyphenFromPhoneNum } from "../module/SignUp";
import "../styles/CreateAcademy.css";

const CreateAcademy = ({ history, match, location }) => {
    // 학원 추가 Dialog Form 요소 state들
    const [academyName, setAcademyName] = useState("");
    const [phone, setPhone] = useState("");
    const [academyAddress, setAcademyAddress] = useState("");
    const [academyDetailAddress, setAcademyDetailAddress] = useState("");
    // address 관련 state: AddressSearch 컴포넌트에 props로 전달

    const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);
    const authToken = useSelector((state) => state.authTokenReducer.authToken);
    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const isJoinedAcademy = joinedAcademyList.length !== 0;

    const onChangeInputAcademyName = (e) => {
        setAcademyName(e.target.value);
    };

    const onChangeInputPhone = (e) => {
        setPhone(deleteHyphenFromPhoneNum(e.target.value));
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        if (academyAddress == "") {
            alert("주소를 입력해주세요.");
            return;
        }

        if (phone[phone.length - 1] === "-")
            setPhone(phone.substring(0, phone.length - 1));

        if (isNaN(phone)) {
            alert("전화번호는 '-' 없이 숫자만 입력해주세요.");
            return;
        }

        const postCreateAcademy = async () => {
            const address =
                academyDetailAddress != ""
                    ? `${academyAddress} ${academyDetailAddress}`
                    : academyAddress;

            try {
                const response = await axios.post(
                    "/v1/academies",
                    {
                        name: academyName,
                        address,
                        phone,
                        ownerId: teacherId
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    }
                );

                if (response.status === 201)
                    alert("학원 추가가 완료되었습니다.");
            } catch (e) {
                alert("토큰 만료. 로그인 페이지로 이동");
                console.log(e);
            }
        };

        let confirmCreateAcademy = window.confirm("학원을 추가 하시겠습니까?");
        if (confirmCreateAcademy) {
            await postCreateAcademy();

            // 페이지 새로고침
            window.location.replace(match.path);
        }

        // 학원 추가 form state들 초기화
        setAcademyName("");
        setAcademyAddress("");
        setAcademyDetailAddress("");
        setPhone("");
    };

    return (
        <div className="create_academy">
            <MenuBar_T
                centerMenu="학원 개설"
                isJoinedAcademy={isJoinedAcademy}
                history={history}
                match={match}
            />

            <div>
                <p>
                    <h2>학원을 개설합니다.</h2>
                    <span>
                        학원을 개설한 선생님이 학원의 원장 선생님으로
                        등록됩니다.
                    </span>
                </p>

                <form className="academy_create__form" onSubmit={onSubmitForm}>
                    <table>
                        <tbody>
                            <tr>
                                <td className="academy_create__form__label">
                                    학원 이름
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="academy_name"
                                        value={academyName}
                                        onChange={onChangeInputAcademyName}
                                        required
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td className="academy_create__form__label">
                                    학원 주소
                                </td>
                                <td>
                                    <AddressSearch
                                        academAddress={academyAddress}
                                        setAcademyAddress={setAcademyAddress}
                                        academDetailAddress={
                                            academyDetailAddress
                                        }
                                        setAcademyDetailAddress={
                                            setAcademyDetailAddress
                                        }
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td className="academy_create__form__label">
                                    학원 전화번호
                                </td>
                                <td>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={phone}
                                        onChange={onChangeInputPhone}
                                        placeholder="'-'를 제외하고 입력해주세요."
                                        required
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="div__btn__create_academy">
                        <button className="btn__create_academy" type="submit">
                            학원 개설
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAcademy;
