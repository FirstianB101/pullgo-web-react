import React, { useState, useRef, memo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import PaperComponent from "../material/PaperComponent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

/* student 1개를 인자로 받아서 student 정보 속성들을 파싱해서 객체로 return */
const parsingStudentInfo = (student) => {
    const studentId = student.id;
    const fullName = student.account.fullName;
    const schoolName = student.schoolName;
    const schoolYear = student.schoolYear;
    const phone = student.account.phone;
    const parentPhone = student.parentPhone;

    return {
        studentId,
        fullName,
        schoolName,
        schoolYear,
        phone,
        parentPhone
    };
};

/* "01012345678" 형태의 phone을
    "010-1234-5678" 형태의 parsedPhone 으로 반환 */
const parsingPhone = (phone) => {
    if (phone?.length !== 11) return;

    const parsedPhone =
        phone.slice(0, 3) + "-" + phone.slice(3, 7) + "-" + phone.slice(7, 11);
    return parsedPhone;
};

const ClassroomJoinedStudentList = ({ classroomId, joinedStudentList }) => {
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [selectedStudentInfo, setSelectedStudentInfo] = useState("");
    const [open, setOpen] = useState(false);

    const btnKickStudentRefs = useRef([]);

    const authToken = useSelector((state) => state.authTokenReducer.authToken);

    const showStudentListItems = () => {
        const listItems = [];

        for (let i = 0; i < joinedStudentList.length; i++) {
            const studentInfo = parsingStudentInfo(joinedStudentList[i]);

            const element = (
                <div className="div__student_list_menu">
                    <li key={joinedStudentList[i].id}>
                        {/* 학생 학교, 학년, 이름 */}
                        <div className="student_list_info">
                            <div>
                                <span className="student_name">
                                    {studentInfo.fullName} 학생
                                </span>
                                <button
                                    onClick={(e) =>
                                        onClickBtnKickStudent(
                                            joinedStudentList[i].id,
                                            i,
                                            e
                                        )
                                    }
                                    ref={(elem) =>
                                        (btnKickStudentRefs.current[i] = elem)
                                    }
                                >
                                    ❌
                                </button>
                            </div>

                            <span className="school_name_year">
                                {studentInfo.schoolName}{" "}
                                {studentInfo.schoolYear}학년
                            </span>
                        </div>

                        {/* 학생, 부모님 전화번호 */}
                        <div className="student_list_phone_info">
                            <span className="label_phone">학생 연락처</span>
                            <span className="student_phone">
                                {parsingPhone(studentInfo.phone)}
                            </span>
                            <br />

                            <span className="label_phone">부모님 연락처</span>
                            <span className="parent_phone">
                                {parsingPhone(studentInfo.parentPhone)}
                            </span>
                        </div>
                    </li>
                </div>
            );

            listItems.push(element);
        }

        return listItems;
    };

    const onClickBtnKickStudent = (studentId, refIndex, e) => {
        const studentInfo = parsingStudentInfo(joinedStudentList[refIndex]);

        setSelectedStudentInfo(studentInfo);
        setSelectedStudentId(studentId);
        setOpen(true);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const postKickStudent = async (studentId) => {
            try {
                const response = await axios.post(
                    `/v1/academy/classrooms/${classroomId}/kick-student`,
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
                    alert("학생을 반에서 추방 하였습니다.");
            } catch (e) {
                alert("토큰 만료. 로그인 페이지로 이동");
                console.log(e);
            }
        };

        let confirmPostKickStudent =
            window.confirm("학생을 반에서 추방 하시겠습니까?");
        if (confirmPostKickStudent) {
            await postKickStudent(selectedStudentId);

            // 페이지 새로고침
            window.location.replace(
                `/teacher/manage_student/classroom?id=${classroomId}`
            );
        }
    };

    const handleClose = () => {
        setSelectedStudentInfo("");
        setSelectedStudentId("");
        setOpen(false);
    };

    return (
        <div className="classroom_joined_student_list">
            <ul className="ul__student_list">{showStudentListItems()}</ul>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle
                    style={{ cursor: "move" }}
                    id="draggable-dialog-title"
                >
                    학생 추방
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <form
                            className="classroom_student_kick__form"
                            onSubmit={onSubmitForm}
                        >
                            <div>
                                <span className="classroom_student_kick__form__label">
                                    학생 이름
                                </span>
                                <input
                                    type="text"
                                    name="student_name"
                                    value={selectedStudentInfo.fullName}
                                    readOnly
                                />
                            </div>

                            <div>
                                <span className="classroom_student_kick__form__label">
                                    학교
                                </span>
                                <input
                                    type="text"
                                    name="school_name"
                                    value={selectedStudentInfo.schoolName}
                                    readOnly
                                />

                                <span className="classroom_student_kick__form__label">
                                    학년
                                </span>
                                <input
                                    type="text"
                                    name="school_year"
                                    value={selectedStudentInfo.schoolYear}
                                    readOnly
                                />
                            </div>

                            <div>
                                <span className="classroom_student_kick__form__label">
                                    학생 전화번호
                                </span>
                                <input
                                    type="text"
                                    name="student_phone"
                                    value={parsingPhone(
                                        selectedStudentInfo.phone
                                    )}
                                    readOnly
                                />
                            </div>

                            <div>
                                <span className="classroom_student_kick__form__label">
                                    부모님 전화번호
                                </span>
                                <input
                                    type="text"
                                    name="parent_phone"
                                    value={parsingPhone(
                                        selectedStudentInfo.parentPhone
                                    )}
                                    readOnly
                                />
                            </div>

                            <div className="buttons__kick_cancel">
                                <Button onClick={handleClose} color="primary">
                                    취소
                                </Button>
                                <Button type="submit" color="primary">
                                    추방
                                </Button>
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ClassroomJoinedStudentList;
