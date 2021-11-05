import React, { useState, useEffect, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { apiFetchClassroom } from "../redux/fetchClassroom";

const DeleteClassroomTabPanel = ({ classroomId }) => {
    const [classroomName, setClassroomName] = useState("");

    const dispatch = useDispatch();
    const onFetchClassroom = (classroomId) => {
        console.log("onFetchClassroom()");
        dispatch(apiFetchClassroom(classroomId));
    };

    useEffect(() => {
        onFetchClassroom(classroomId);
    }, [classroomId]);

    const correctClassroomName = useSelector(
        (state) => state.classroomReducer.classroom?.name.split(";")[0]
    );
    const authToken = useSelector((state) => state.authTokenReducer.authToken);

    const onChangeInputClassroomName = (e) => {
        setClassroomName(e.target.value);
    };

    const onClickBtnDelete = async (e) => {
        const deleteClassroom = async () => {
            try {
                const response = await axios.delete(
                    `/v1/academy/classrooms/${classroomId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    }
                );

                if (response.status === 204) alert("반 삭제가 완료되었습니다.");
            } catch (e) {
                alert("토큰 만료. 로그인 페이지로 이동");
                console.log(e);
            }
        };

        let confirmDeleteClassroom = window.confirm("반을 삭제 하시겠습니까?");
        if (confirmDeleteClassroom) {
            if (correctClassroomName !== classroomName) {
                alert("반 이름이 일치하지 않습니다.");
                return;
            }

            await deleteClassroom();
            // 페이지 새로고침
            window.location.replace("/teacher/manage_classroom");
        }
    };

    return (
        <div className="delete_classroom_tab_panel">
            <h2>반을 삭제합니다.</h2>

            <p className="delete_classroom_text">
                <h3>반에 대한 모든 정보를 삭제합니다.</h3>
                <span>
                    복구할 수 없으니,
                    <br />
                    삭제하기 전에 다시 한번 확인해주세요.
                </span>
            </p>
            <h3 className="delete_classroom_input__label">
                반 삭제를 위해 반 이름을 정확히 입력해주세요.
            </h3>
            <input
                type="text"
                name="classroom_name"
                value={classroomName}
                onChange={onChangeInputClassroomName}
                placeholder="반 이름 입력"
                required
            />
            <div className="div__btn_wrapper">
                <button
                    onClick={onClickBtnDelete}
                    className="btn__delete_classroom"
                >
                    삭제하기
                </button>
            </div>
        </div>
    );
};

export default DeleteClassroomTabPanel;
