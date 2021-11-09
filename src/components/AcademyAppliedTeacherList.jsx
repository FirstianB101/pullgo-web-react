import React, { useState, useEffect, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { apiFetchAcademyAppliedCheckedTeacherList } from "../redux/fetchAcademyAppliedCheckedTeacherList";
import Checkbox from "@mui/material/Checkbox";

const AcademyAppliedTeacherList = ({ academyId, appliedTeacherList }) => {
    const dispatch = useDispatch();

    const [checkedAll, setCheckedAll] = useState(false);
    const [checked, setChecked] = useState(
        Array.from({ length: appliedTeacherList.length }, () => false)
    );
    const [checkedTeacherId, setCheckedTeacherId] = useState([]);
    // Checkbox에서 check한 선생님의 teacherId를 저장한 배열 state

    const btnRejectRefs = useRef([]);
    const btnAcceptRefs = useRef([]);

    const authToken = useSelector((state) => state.authTokenReducer.authToken);

    useEffect(() => {
        dispatch(apiFetchAcademyAppliedCheckedTeacherList(checkedTeacherId));
    }, [checkedTeacherId]);

    const onChangeCheckAll = (e) => {
        setCheckedAll(e.target.checked);
    };

    useEffect(() => {
        if (checkedAll) {
            setChecked(
                Array.from({ length: appliedTeacherList.length }, () => true)
            );
            const checkedTeacherIdArr = appliedTeacherList.map(
                (teacher) => teacher.id
            );
            setCheckedTeacherId([...checkedTeacherIdArr]);
        } else {
            setChecked(
                Array.from({ length: appliedTeacherList.length }, () => false)
            );
            setCheckedTeacherId([]);
        }
    }, [checkedAll]);

    const onChangeCheckbox = (teacherId, refIndex, e) => {
        const checkedArr = [...checked];
        checkedArr[refIndex] = e.target.checked;
        setChecked([...checkedArr]);

        // 클릭한 Checkbox의 해당하는 선생님의 teacherId를 reducer에 저장
        // check 되어있고, checkedTeacherId 배열 state에 teacherId가 없는 경우, 추가
        if (checkedArr[refIndex] && !checkedTeacherId.includes(teacherId)) {
            setCheckedTeacherId([...checkedTeacherId, teacherId]);
        } else if (
            !checkedArr[refIndex] &&
            checkedTeacherId.includes(teacherId)
        ) {
            const index = checkedTeacherId.indexOf(teacherId);
            setCheckedTeacherId([
                ...checkedTeacherId.slice(0, index),
                ...checkedTeacherId.slice(index + 1, checkedTeacherId.length)
            ]);
        }
    };

    const onClickBtnReject = async (teacherId, e) => {
        const postRejectTeacher = async (teacherId) => {
            try {
                const response = await axios.post(
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

                if (response.status === 204)
                    alert("선생님의 학원 가입 요청을 거절 하였습니다.");
            } catch (e) {
                alert("토큰 만료. 로그인 페이지로 이동");
                console.log(e);
            }
        };

        let confirmPostRejectTeacher = window.confirm(
            "선생님의 학원 가입 요청을 거절 하시겠습니까?"
        );
        if (confirmPostRejectTeacher) {
            await postRejectTeacher(teacherId);

            // 페이지 새로고침
            window.location.replace(
                `/teacher/manage_academy_apply/academy?id=${academyId}`
            );
        }
    };

    const onClickBtnAccept = async (teacherId, e) => {
        const postAcceptTeacher = async (teacherId) => {
            try {
                const response = await axios.post(
                    `/v1/academies/${academyId}/accept-teacher`,
                    {
                        teacherId
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    }
                );

                if (response.status === 204)
                    alert("선생님을 학원에 가입 시켰습니다.");
            } catch (e) {
                alert("토큰 만료. 로그인 페이지로 이동");
                console.log(e);
            }
        };

        await postAcceptTeacher(teacherId);

        // 페이지 새로고침
        window.location.replace(
            `/teacher/manage_academy_apply/academy?id=${academyId}`
        );
    };

    const showAppliedTeacherListItems = () => {
        const listItems = [];

        for (let i = 0; i < appliedTeacherList.length; i++) {
            const element = (
                <div className="div__teacher_list_menu">
                    <li key={appliedTeacherList[i].id}>
                        <div className="div__teacher_list_checkbox">
                            <Checkbox
                                checked={checked[i]}
                                onChange={(e) =>
                                    onChangeCheckbox(
                                        appliedTeacherList[i].id,
                                        i,
                                        e
                                    )
                                }
                            />
                        </div>

                        <h4>{appliedTeacherList[i].account.fullName}</h4>

                        <div className="div__teacher_list_buttons">
                            <button
                                className="btn__reject"
                                onClick={(e) =>
                                    onClickBtnReject(
                                        appliedTeacherList[i].id,
                                        e
                                    )
                                }
                                ref={(elem) =>
                                    (btnRejectRefs.current[i] = elem)
                                }
                            >
                                거절
                            </button>
                            <button
                                className="btn__accept"
                                onClick={(e) =>
                                    onClickBtnAccept(
                                        appliedTeacherList[i].id,
                                        e
                                    )
                                }
                                ref={(elem) =>
                                    (btnAcceptRefs.current[i] = elem)
                                }
                            >
                                승인
                            </button>
                        </div>
                    </li>
                </div>
            );

            listItems.push(element);
        }

        return listItems;
    };

    return (
        <div className="classroom_applied_teacher_list">
            <Checkbox onChange={onChangeCheckAll} checked={checkedAll} />
            <h2>선생님</h2>
            {showAppliedTeacherListItems()}
        </div>
    );
};

export default AcademyAppliedTeacherList;
