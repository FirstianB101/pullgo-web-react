import React, { useState, memo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// Dialog
import PaperComponent from "../material/PaperComponent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { deleteHyphenFromPhoneNum } from "../module/SignUp";

const CreateAcademyDialog = memo(
    ({ createAcademyDialogOpen, setCreateAcademyDialogOpen, match }) => {
        // 학원 추가 Dialog Form 요소 state들
        const [academyName, setAcademyName] = useState("");
        const [academyAddress, setAcademyAddress] = useState("");
        const [phone, setPhone] = useState("");

        const teacherInfo = useSelector(
            (state) => state.teacherInfoReducer.teacherInfo
        );
        const authToken = useSelector(
            (state) => state.authTokenReducer.authToken
        );

        const handleClose = () => {
            // 학원 추가 Dialog form 요소 state들 초기화
            setAcademyName("");
            setAcademyAddress("");
            setPhone("");

            setCreateAcademyDialogOpen(false);
        };

        const onChangeInputAcademyName = (e) => {
            setAcademyName(e.target.value);
        };

        const onChangeInputAcademyAddress = (e) => {
            setAcademyAddress(e.target.value);
        };

        const onChangeInputPhone = (e) => {
            setPhone(deleteHyphenFromPhoneNum(e.target.value));
        };

        const onSubmitForm = async (e) => {
            e.preventDefault();

            if (phone[phone.length - 1] === "-")
                setPhone(phone.substring(0, phone.length - 1));

            if (isNaN(phone)) {
                alert("전화번호는 '-' 없이 숫자만 입력해주세요.");
                return;
            }

            const postCreateAcademy = async () => {
                try {
                    const response = await axios.post(
                        "/v1/academies",
                        {
                            name: academyName,
                            address: academyAddress,
                            phone,
                            ownerId: teacherInfo.id
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

            let confirmCreateAcademy =
                window.confirm("학원을 추가 하시겠습니까?");
            if (confirmCreateAcademy) {
                await postCreateAcademy();

                // 페이지 새로고침
                window.location.replace(match.path);
            }

            // 학원 추가 form state들 초기화
            setAcademyName("");
            setAcademyAddress("");
            setPhone("");

            setCreateAcademyDialogOpen(false);
        };

        return (
            <div className="create_academy_dialog">
                <Dialog
                    open={createAcademyDialogOpen}
                    onClose={handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle
                        style={{ cursor: "move" }}
                        id="draggable-dialog-title"
                    >
                        학원 추가
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            <form
                                className="academy_create__form"
                                onSubmit={onSubmitForm}
                            >
                                <div>
                                    <span className="academy_create__form__label">
                                        학원 이름
                                    </span>
                                    <input
                                        type="text"
                                        name="academy_name"
                                        value={academyName}
                                        onChange={onChangeInputAcademyName}
                                        required
                                    />
                                </div>

                                <div>
                                    <span className="academy_create__form__label">
                                        학원 주소
                                    </span>
                                    <input
                                        type="text"
                                        name="academy_address"
                                        value={academyAddress}
                                        onChange={onChangeInputAcademyAddress}
                                        required
                                    />
                                </div>

                                <div>
                                    <span className="academy_create__form__label">
                                        학원 전화번호
                                    </span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={phone}
                                        onChange={onChangeInputPhone}
                                        required
                                    />
                                </div>

                                <div className="buttons__confirm_cancel">
                                    <Button
                                        onClick={handleClose}
                                        color="primary"
                                    >
                                        취소
                                    </Button>
                                    <Button type="submit" color="primary">
                                        확인
                                    </Button>
                                </div>
                            </form>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
);

export default CreateAcademyDialog;
