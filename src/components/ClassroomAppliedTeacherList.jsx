import React, { useState, useEffect, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { apiFetchClassroomAppliedCheckedTeacherList } from "../redux/fetchClassroomAppliedCheckedTeacherList";
import Checkbox from "@mui/material/Checkbox";

const ClassroomAppliedTeacherList = ({ classroomId, appliedTeacherList }) => {
    const dispatch = useDispatch();

    const [checked, setChecked] = useState([]);
    const [checkedTeacherId, setCheckedTeacherId] = useState([]);
    // Checkbox에서 check한 선생님의 teacherId를 저장한 배열 state

    const checkboxRefs = useRef([]);
    const btnRejectRefs = useRef([]);
    const btnAcceptRefs = useRef([]);

    const authToken = useSelector((state) => state.authTokenReducer.authToken);

    useEffect(() => {
        setChecked(
            Array.from({ length: appliedTeacherList.length }, () => false)
        );
    }, [appliedTeacherList]);

    useEffect(() => {
        dispatch(apiFetchClassroomAppliedCheckedTeacherList(checkedTeacherId));
    }, [checkedTeacherId]);

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
                    `/v1/teachers/${teacherId}/remove-applied-classroom`,
                    {
                        classroomId
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    }
                );

                if (response.status === 204)
                    alert("선생님의 반 가입 요청을 거절 하였습니다.");
            } catch (e) {
                alert("토큰 만료. 로그인 페이지로 이동");
                console.log(e);
            }
        };

        let confirmPostRejectTeacher = window.confirm(
            "선생님의 반 가입 요청을 거절 하시겠습니까?"
        );
        if (confirmPostRejectTeacher) {
            await postRejectTeacher(teacherId);

            // 페이지 새로고침
            window.location.replace(
                `/teacher/manage_classroom_apply/classroom?id=${classroomId}`
            );
        }
    };

    const onClickBtnAccept = async (teacherId, e) => {
        const postAcceptTeacher = async (teacherId) => {
            try {
                const response = await axios.post(
                    `/v1/academy/classrooms/${classroomId}/accept-teacher`,
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
                    alert("선생님을 반에 가입 시켰습니다.");
            } catch (e) {
                alert("토큰 만료. 로그인 페이지로 이동");
                console.log(e);
            }
        };

        await postAcceptTeacher(teacherId);

        // 페이지 새로고침
        window.location.replace(
            `/teacher/manage_classroom_apply/classroom?id=${classroomId}`
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
                                onChange={(e) =>
                                    onChangeCheckbox(
                                        appliedTeacherList[i].id,
                                        i,
                                        e
                                    )
                                }
                                ref={(elem) => (checkboxRefs.current[i] = elem)}
                            />
                        </div>

                        {/* <div className="div__teacher_list_info"> */}
                        <h4>{appliedTeacherList[i].account.fullName}</h4>
                        {/* </div> */}

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
        <div>
            <h2>선생님</h2>

            {showAppliedTeacherListItems()}
        </div>
    );
};

export default ClassroomAppliedTeacherList;
