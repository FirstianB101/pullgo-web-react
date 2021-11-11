import React, { useState, memo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const DeleteAcademyTabPanel = ({ academyId, correctAcademyName }) => {
    const [academyName, setAcademyName] = useState("");

    const authToken = useSelector((state) => state.authTokenReducer.authToken);

    const onChangeInputAcademyName = (e) => {
        setAcademyName(e.target.value);
    };

    const onClickBtnDelete = async (e) => {
        const deleteAcademy = async () => {
            try {
                const response = await axios.delete(
                    `/v1/academies/${academyId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    }
                );

                if (response.status === 204)
                    alert("학원 삭제가 완료되었습니다.");
            } catch (e) {
                alert("토큰 만료. 로그인 페이지로 이동");
                console.log(e);
            }
        };

        let confirmDeleteAcademy = window.confirm("학원을 삭제 하시겠습니까?");
        if (confirmDeleteAcademy) {
            if (correctAcademyName !== academyName) {
                alert("학원 이름이 일치하지 않습니다.");
                return;
            }

            await deleteAcademy();
            // 페이지 새로고침
            window.location.replace("/teacher/manage_academy");
        }
    };

    return (
        <div className="delete_academy_tab_panel">
            <h2>학원을 삭제합니다.</h2>

            <p className="delete_academy_text">
                <h3>학원에 대한 모든 정보를 삭제합니다.</h3>
                <span>
                    복구할 수 없으니,
                    <br />
                    삭제하기 전에 다시 한번 확인해주세요.
                </span>
            </p>
            <h3 className="delete_academy_input__label">
                학원 삭제를 위해 학원 이름을 정확히 입력해주세요.
            </h3>
            <input
                type="text"
                name="academy_name"
                value={academyName}
                onChange={onChangeInputAcademyName}
                placeholder="학원 이름 입력"
                required
            />
            <div className="div__btn_wrapper">
                <button
                    onClick={onClickBtnDelete}
                    className="btn__delete_academy"
                >
                    삭제하기
                </button>
            </div>
        </div>
    );
};

export default DeleteAcademyTabPanel;
