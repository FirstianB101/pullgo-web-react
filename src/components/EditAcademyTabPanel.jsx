import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import AddressSearch from "./AddressSearch";
import { deleteHyphenFromPhoneNum } from "../module/SignUp";

const EditAcademyTabPanel = ({ academyId, beforeEditAcademy }) => {
    const [isClickedEdit, setIsClickedEdit] = useState(false);
    const [editedAcademyName, setEditedAcademyName] = useState("");
    const [editedAcademyPhone, setEditedAcademyPhone] = useState("");
    // AddressSearch 컴포넌트의 props로 전달할 주소 관련 state들
    const [editedAcademyAddress, setEditedAcademyAddress] = useState("");
    const [editedAcademyDetailAddress, setEditedAcademyDetailAddress] =
        useState("");

    const authToken = useSelector((state) => state.authTokenReducer.authToken);

    /* 수정 전 기존 학원 이름 표시 */
    useEffect(() => {
        if (beforeEditAcademy == null) return;

        setEditedAcademyName(beforeEditAcademy.name);
        setEditedAcademyPhone(beforeEditAcademy.phone);
    }, [beforeEditAcademy]);

    const onChangeInputEditedAcademyName = (e) => {
        setEditedAcademyName(e.target.value);
    };

    const onChangeInputEditedAcademyPhone = (e) => {
        setEditedAcademyPhone(deleteHyphenFromPhoneNum(e.target.value));
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        if (editedAcademyAddress == "") {
            alert("주소를 입력해주세요.");
            return;
        }

        if (editedAcademyPhone[editedAcademyPhone.length - 1] === "-")
            setEditedAcademyPhone(
                editedAcademyPhone.substring(0, editedAcademyPhone.length - 1)
            );

        if (isNaN(editedAcademyPhone)) {
            alert("전화번호는 '-' 없이 숫자만 입력해주세요.");
            return;
        }

        const address =
            editedAcademyDetailAddress != ""
                ? `${editedAcademyAddress} ${editedAcademyDetailAddress}`
                : editedAcademyAddress;

        const patchAcademy = async () => {
            try {
                const response = await axios.patch(
                    `/v1/academies/${academyId}`,
                    {
                        name: editedAcademyName,
                        phone: editedAcademyPhone,
                        address
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    }
                );

                if (response.status === 200)
                    alert("학원 정보가 수정되었습니다.");
            } catch (e) {
                alert("토큰 만료. 로그인 페이지로 이동");
                console.log(e);
            }
        };

        if (
            beforeEditAcademy.name === editedAcademyName &&
            beforeEditAcademy.phone === editedAcademyPhone &&
            beforeEditAcademy.address === address
        ) {
            alert("수정된 사항이 없습니다.");
            return;
        }

        let confirmEditAcademy =
            window.confirm("학원 정보를 수정 하시겠습니까?");
        if (confirmEditAcademy) {
            await patchAcademy();

            // 페이지 새로고침
            window.location.replace(
                `/teacher/edit_delete_academy/academy?id=${academyId}`
            );
        }
    };

    const onClickBtnCancelEdit = (e) => {
        setEditedAcademyName(beforeEditAcademy.name);
        setEditedAcademyPhone(beforeEditAcademy.phone);

        setIsClickedEdit(false);
    };

    return (
        <div className="edit_academy_tab_panel">
            <h2>학원 정보를 수정합니다.</h2>

            <form className="edit_academy__form" onSubmit={onSubmitForm}>
                <table>
                    <tbody>
                        <tr>
                            <td className="academy_edit__form__label">
                                학원 이름
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="academy_name"
                                    value={editedAcademyName}
                                    onChange={onChangeInputEditedAcademyName}
                                    readOnly={!isClickedEdit}
                                    placeholder="학원 이름을 입력해주세요."
                                    required
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="academy_edit__form__label">
                                학원 주소
                            </td>
                            <td>
                                {isClickedEdit ? (
                                    <AddressSearch
                                        address={editedAcademyAddress}
                                        setAddress={setEditedAcademyAddress}
                                        detailAddress={
                                            editedAcademyDetailAddress
                                        }
                                        setDetailAddress={
                                            setEditedAcademyDetailAddress
                                        }
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        name="academy_address"
                                        value={beforeEditAcademy?.address}
                                        readOnly
                                    />
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td className="academy_edit__form__label">
                                학원 전화번호
                            </td>
                            <td>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editedAcademyPhone}
                                    onChange={onChangeInputEditedAcademyPhone}
                                    readOnly={!isClickedEdit}
                                    placeholder="'-'를 제외하고 입력해주세요."
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {!isClickedEdit ? (
                    <div className="div__btn__on_edit_academy">
                        <button onClick={() => setIsClickedEdit(true)}>
                            수정하기
                        </button>
                    </div>
                ) : null}

                {isClickedEdit ? (
                    <div className="div__btn__edit_academy">
                        <button className="btn__edit_academy" type="submit">
                            확인
                        </button>
                        <button
                            className="btn__cancel_edit_academy"
                            onClick={onClickBtnCancelEdit}
                        >
                            취소
                        </button>
                    </div>
                ) : null}
            </form>
        </div>
    );
};

export default EditAcademyTabPanel;
