import React, { useState, useEffect, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { apiFetchClassroomAppliedCheckedStudentList } from "../redux/fetchClassroomAppliedCheckedStudentList";
import Checkbox from "@mui/material/Checkbox";

const parsingStudentInfo = (student) => {
    const studentId = student.id;
    const fullName = student.account.fullName;
    const schoolName = student.schoolName;
    const schoolYear = student.schoolYear;

    return {
        studentId,
        fullName,
        schoolName,
        schoolYear
    };
};

const ClassroomAppliedStudentList = memo(
    ({ classroomId, appliedStudentList }) => {
        const dispatch = useDispatch();

        const [checked, setChecked] = useState([]);
        const [checkedStudentId, setCheckedStudentId] = useState([]);
        // Checkbox에서 check한 학생의 studentId를 저장한 배열 state

        const checkboxRefs = useRef([]);
        const btnRejectRefs = useRef([]);
        const btnAcceptRefs = useRef([]);

        const authToken = useSelector(
            (state) => state.authTokenReducer.authToken
        );

        useEffect(() => {
            setChecked(
                Array.from({ length: appliedStudentList.length }, () => false)
            );
        }, [appliedStudentList]);

        useEffect(() => {
            dispatch(
                apiFetchClassroomAppliedCheckedStudentList(checkedStudentId)
            );
        }, [checkedStudentId]);

        const onChangeCheckbox = (studentId, refIndex, e) => {
            const checkedArr = [...checked];
            checkedArr[refIndex] = e.target.checked;
            setChecked([...checkedArr]);

            // 클릭한 Checkbox의 해당하는 학생의 studentId를 reducer에 저장
            // check 되어있고, checkedStudentId 배열 state에 studentId가 없는 경우, 추가
            if (checkedArr[refIndex] && !checkedStudentId.includes(studentId)) {
                setCheckedStudentId([...checkedStudentId, studentId]);
            } else if (
                !checkedArr[refIndex] &&
                checkedStudentId.includes(studentId)
            ) {
                const index = checkedStudentId.indexOf(studentId);
                setCheckedStudentId([
                    ...checkedStudentId.slice(0, index),
                    ...checkedStudentId.slice(
                        index + 1,
                        checkedStudentId.length
                    )
                ]);
            }
        };

        const onClickBtnReject = async (studentId, e) => {
            const postRejectStudent = async (studentId) => {
                try {
                    const response = await axios.post(
                        `/v1/students/${studentId}/remove-applied-classroom`,
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
                        alert("학생의 반 가입 요청을 거절 하였습니다.");
                } catch (e) {
                    alert("토큰 만료. 로그인 페이지로 이동");
                    console.log(e);
                }
            };

            let confirmPostRejectStudent = window.confirm(
                "학생의 반 가입 요청을 거절 하시겠습니까?"
            );
            if (confirmPostRejectStudent) {
                await postRejectStudent(studentId);

                // 페이지 새로고침
                window.location.replace(
                    `/teacher/manage_classroom_apply/classroom?id=${classroomId}`
                );
            }
        };

        const onClickBtnAccept = async (studentId, e) => {
            const postAcceptStudent = async (studentId) => {
                try {
                    const response = await axios.post(
                        `/v1/academy/classrooms/${classroomId}/accept-student`,
                        {
                            studentId
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${authToken}`
                            }
                        }
                    );

                    if (response.status === 204)
                        alert("학생을 반에 가입 시켰습니다.");
                } catch (e) {
                    alert("토큰 만료. 로그인 페이지로 이동");
                    console.log(e);
                }
            };

            await postAcceptStudent(studentId);

            // 페이지 새로고침
            window.location.replace(
                `/teacher/manage_classroom_apply/classroom?id=${classroomId}`
            );
        };

        const showAppliedStudentListItems = () => {
            const listItems = [];

            for (let i = 0; i < appliedStudentList.length; i++) {
                const studentInfo = parsingStudentInfo(appliedStudentList[i]);

                const element = (
                    <div className="div__student_list_menu">
                        <li key={studentInfo.studentId}>
                            <div className="div__student_list_checkbox">
                                <Checkbox
                                    onChange={(e) =>
                                        onChangeCheckbox(
                                            studentInfo.studentId,
                                            i,
                                            e
                                        )
                                    }
                                    ref={(elem) =>
                                        (checkboxRefs.current[i] = elem)
                                    }
                                />
                            </div>

                            <div className="div__student_list_info">
                                <span>
                                    {studentInfo.schoolName}{" "}
                                    {studentInfo.schoolYear}학년
                                </span>
                                <span>{studentInfo.fullName}</span>
                            </div>

                            <div className="div__student_list_buttons">
                                <button
                                    className="btn__reject"
                                    onClick={(e) =>
                                        onClickBtnReject(
                                            studentInfo.studentId,
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
                                            studentInfo.studentId,
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
            <div className="classroom_applied_student_list">
                <h2>학생</h2>
                {showAppliedStudentListItems()}
            </div>
        );
    }
);

export default ClassroomAppliedStudentList;
