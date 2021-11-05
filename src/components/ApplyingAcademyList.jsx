import React, { memo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ApplyingAcademyList = memo(
    ({ applyingAcademyList, userType, studentId, teacherId }) => {
        const authToken = useSelector(
            (state) => state.authTokenReducer.authToken
        );

        /* 학원 가입신청 철회(❌) button 클릭 */
        const onClickBtnRemoveAppliedAcademy = async (academyId, e) => {
            const postRemoveAppliedAcademy = async (academyId) => {
                try {
                    let response;
                    if (userType === "student") {
                        response = await axios.post(
                            `/v1/students/${studentId}/remove-applied-academy`,
                            {
                                academyId
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${authToken}`
                                }
                            }
                        );
                    } else {
                        response = await axios.post(
                            `/v1/teachers/${teacherId}/remove-applied-academy`,
                            {
                                academyId
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${authToken}`
                                }
                            }
                        );
                    }

                    if (response.status === 204)
                        alert("학원 가입신청이 철회되었습니다.");
                } catch (e) {
                    alert("토큰 만료. 로그인 페이지로 이동");
                    console.log(e);
                }
            };

            let confirmPostRemoveAppliedAcademy = window.confirm(
                "학원 가입요청을 철회 하시겠습니까?"
            );
            if (confirmPostRemoveAppliedAcademy) {
                await postRemoveAppliedAcademy(academyId);

                // 페이지 새로고침
                window.location.replace(`/${userType}/academy_info`);
            }
        };

        return (
            <div className="applying_academy_list">
                <h3>가입 신청한 학원 목록</h3>
                <ul>
                    {applyingAcademyList.length !== 0 ? (
                        applyingAcademyList.map((academy, index) => (
                            <div
                                className="applying_academy_list_menu"
                                key={academy.id}
                            >
                                <li>
                                    <span className="academy_name">
                                        {academy.name}
                                    </span>
                                    <span className="academy_address">
                                        주소: {academy.address}
                                    </span>
                                    <span className="academy_phone">
                                        전화번호: {academy.phone}
                                    </span>
                                </li>

                                <button
                                    onClick={(e) =>
                                        onClickBtnRemoveAppliedAcademy(
                                            academy.id,
                                            // index,
                                            e
                                        )
                                    }
                                >
                                    ❌
                                </button>
                            </div>
                        ))
                    ) : (
                        <span className="no_applying_academy">
                            가입 신청한 학원이 없습니다!
                        </span>
                    )}
                </ul>
            </div>
        );
    }
);

export default ApplyingAcademyList;
