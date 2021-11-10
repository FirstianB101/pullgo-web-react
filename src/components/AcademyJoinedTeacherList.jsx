import React, { useState, useRef, memo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import PaperComponent from "../material/PaperComponent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

/* "01012345678" 형태의 phone을
    "010-1234-5678" 형태의 parsedPhone 으로 반환 */
const parsingPhone = (phone) => {
    if (phone?.length !== 11) return;

    const parsedPhone =
        phone.slice(0, 3) + "-" + phone.slice(3, 7) + "-" + phone.slice(7, 11);
    return parsedPhone;
};

const AcademyJoinedTeacherList = ({
    academyId,
    joinedTeacherList,
    teacherId
}) => {
    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [selectedTeacherInfo, setSelectedTeacherInfo] = useState("");
    const [open, setOpen] = useState(false);

    const btnKickTeacherRefs = useRef([]);

    const authToken = useSelector((state) => state.authTokenReducer.authToken);

    const showTeacherListItems = () => {
        const listItems = [];

        for (let i = 0; i < joinedTeacherList.length; i++) {
            const element = (
                <div className="div__teacher_list_menu">
                    <li key={joinedTeacherList[i].id}>
                        <div className="teacher_list_info">
                            <div>
                                <span className="teacher_name">
                                    {joinedTeacherList[i].account.fullName}{" "}
                                    선생님
                                </span>
                                {teacherId != joinedTeacherList[i].id ? (
                                    <button
                                        onClick={(e) =>
                                            onClickBtnKickTeacher(
                                                joinedTeacherList[i].id,
                                                i,
                                                e
                                            )
                                        }
                                        ref={(elem) =>
                                            (btnKickTeacherRefs.current[i] =
                                                elem)
                                        }
                                    >
                                        ❌
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="teacher_list_phone_info">
                                <span className="label_phone">
                                    선생님 연락처
                                </span>
                                <span className="teacher_phone">
                                    {parsingPhone(
                                        joinedTeacherList[i].account.phone
                                    )}
                                </span>
                            </div>
                        </div>
                    </li>
                </div>
            );

            listItems.push(element);
        }

        return listItems;
    };

    const onClickBtnKickTeacher = (teacherId, refIndex, e) => {
        setSelectedTeacherInfo(joinedTeacherList[refIndex]);
        setSelectedTeacherId(teacherId);
        setOpen(true);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const postKickTeacher = async (teacherId) => {
            try {
                const response = await axios.post(
                    `/v1/academies/${academyId}/kick-teacher`,
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
                    alert("선생님을 학원에서 추방 하였습니다.");
            } catch (e) {
                alert("토큰 만료. 로그인 페이지로 이동");
                console.log(e);
            }
        };

        let confirmPostKickTeacher = window.confirm(
            "선생님을 학원에서 추방 하시겠습니까?"
        );
        if (confirmPostKickTeacher) {
            await postKickTeacher(selectedTeacherId);

            // 페이지 새로고침
            window.location.replace(
                `/teacher/manage_academy_members/academy?id=${academyId}`
            );
        }
    };

    const handleClose = () => {
        setSelectedTeacherInfo("");
        setSelectedTeacherId("");
        setOpen(false);
    };

    return (
        <div className="academy_joined_teacher_list">
            <h2>선생님</h2>
            <ul className="ul__teacher_list">{showTeacherListItems()}</ul>

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
                    선생님 추방
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <form
                            className="academy_teacher_kick__form"
                            onSubmit={onSubmitForm}
                        >
                            <div>
                                <span className="academy_teacher_kick__form__label">
                                    선생님 이름
                                </span>
                                <input
                                    type="text"
                                    name="teacher_name"
                                    value={
                                        selectedTeacherInfo.account?.fullName
                                    }
                                    readOnly
                                />
                            </div>

                            <div>
                                <span className="academy_teacher_kick__form__label">
                                    선생님 전화번호
                                </span>
                                <input
                                    type="tel"
                                    name="teacher_phone"
                                    value={parsingPhone(
                                        selectedTeacherInfo.account?.phone
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

export default AcademyJoinedTeacherList;
