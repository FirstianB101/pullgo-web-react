import React, { useState, useEffect, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { apiFetchClassroom } from "../redux/fetchClassroom";

const weekArrKR = ["일", "월", "화", "수", "목", "금", "토"];
const weekArr = [
    "week_sunday",
    "week_monday",
    "week_tuesday",
    "week_wednesday",
    "week_thursday",
    "week_friday",
    "week_saturday"
];

/* checkedWeek (요일 체크 state 배열)을 인자로 받아서 체크된 요일들 문자열로 return */
const getCheckedWeekStr = (checkedWeek) => {
    let checkedWeekStr = "";
    for (let i = 1; i < weekArrKR.length; i++) {
        if (checkedWeek[i]) checkedWeekStr += weekArrKR[i];
    }
    if (checkedWeek[0]) checkedWeekStr += weekArrKR[0];

    return checkedWeekStr;
};

const EditClassroomTabPanel = ({ classroomId }) => {
    const [editedClassroomName, setEditedClassroomName] = useState();
    const [checkedWeek, setCheckedWeek] = useState(
        Array.from({ length: 7 }, () => false)
    ); // 요일 체크 state 배열

    const weekLabelRefs = useRef([]);

    const dispatch = useDispatch();
    const onFetchClassroom = (classroomId) => {
        console.log("onFetchClassroom()");
        dispatch(apiFetchClassroom(classroomId));
    };

    useEffect(() => {
        onFetchClassroom(classroomId);
    }, [classroomId]);

    // 수정 전 classroom 객체
    // classroom.name: "반이름;담당 선생님 이름;요일" 형태
    const beforeEditClassroom = useSelector(
        (state) => state.classroomReducer.classroom
    );
    const authToken = useSelector((state) => state.authTokenReducer.authToken);

    /* 수정 전 기존 반 이름 표시 */
    useEffect(() => {
        if (beforeEditClassroom == null) return;

        setEditedClassroomName(beforeEditClassroom.name.split(";")[0]);

        const weekStrKR = beforeEditClassroom.name.split(";")[2];
        const checkedWeekArr = Array.from({ length: 7 }, () => false);
        for (let i = 0; i < weekStrKR.length; i++) {
            const index = weekArrKR.indexOf(weekStrKR[i]);
            checkedWeekArr[index] = true;
        }

        setCheckedWeek([...checkedWeekArr]);
    }, [beforeEditClassroom]);

    /* checkedWeek 배열 state가 변경되면, label 색 변경하여 선택한 요일 표시 */
    useEffect(() => {
        if (weekLabelRefs.current.length === 0) return;

        for (let i = 0; i < checkedWeek.length; i++) {
            if (checkedWeek[i])
                weekLabelRefs.current[i].style.backgroundColor = "#E2E4FF";
            else weekLabelRefs.current[i].style.backgroundColor = "";
        }
    }, [checkedWeek]);

    const onChangeInputEditedClassroomName = (e) => {
        setEditedClassroomName(e.target.value);
    };

    const onChangeInputCheckedWeek = (e) => {
        const clickedIndex = weekArr.indexOf(e.target.name);
        setCheckedWeek([
            ...checkedWeek.slice(0, clickedIndex),
            e.target.checked,
            ...checkedWeek.slice(clickedIndex + 1, checkedWeek.length)
        ]);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const checkedWeekStr = getCheckedWeekStr(checkedWeek);
        const teacherName = beforeEditClassroom.name.split(";")[1];

        const name = `${editedClassroomName};${teacherName};${checkedWeekStr}`;

        const patchClassroom = async () => {
            try {
                const response = await axios.patch(
                    `/v1/academy/classrooms/${classroomId}`,
                    {
                        name
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    }
                );

                if (response.status === 200) alert("반 정보가 수정되었습니다.");
            } catch (e) {
                alert("토큰 만료. 로그인 페이지로 이동");
                console.log(e);
            }
        };

        if (beforeEditClassroom.name === name) {
            alert("수정된 사항이 없습니다.");
            return;
        }

        let confirmEditClassroom =
            window.confirm("반 정보를 수정 하시겠습니까?");
        if (confirmEditClassroom) {
            await patchClassroom();

            // 페이지 새로고침
            window.location.replace(
                `/teacher/edit_delete_classroom/classroom?id=${classroomId}`
            );
        }
    };

    return (
        <div className="edit_classroom_tab_panel">
            <h2>반 정보를 수정합니다.</h2>

            <form className="edit_classroom__form" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    name="edited_classroom_name"
                    value={editedClassroomName}
                    onChange={onChangeInputEditedClassroomName}
                    placeholder="반 이름을 입력해주세요."
                    required
                />

                <div className="div__check_week">
                    <span className="edited_classroom_week__label">
                        요일을 선택해주세요.
                    </span>
                    <div>
                        <input
                            type="checkbox"
                            id={weekArr[0]}
                            name={weekArr[0]}
                            checked={checkedWeek[0]}
                            onChange={onChangeInputCheckedWeek}
                            // required
                        />
                        <label
                            className="sunday"
                            htmlFor={weekArr[0]}
                            ref={(elem) => (weekLabelRefs.current[0] = elem)}
                        >
                            일
                        </label>

                        <input
                            type="checkbox"
                            id={weekArr[1]}
                            name={weekArr[1]}
                            checked={checkedWeek[1]}
                            onChange={onChangeInputCheckedWeek}
                            // required
                        />
                        <label
                            htmlFor={weekArr[1]}
                            ref={(elem) => (weekLabelRefs.current[1] = elem)}
                        >
                            월
                        </label>

                        <input
                            type="checkbox"
                            id={weekArr[2]}
                            name={weekArr[2]}
                            checked={checkedWeek[2]}
                            onChange={onChangeInputCheckedWeek}
                            // required
                        />
                        <label
                            htmlFor={weekArr[2]}
                            ref={(elem) => (weekLabelRefs.current[2] = elem)}
                        >
                            화
                        </label>

                        <input
                            type="checkbox"
                            id={weekArr[3]}
                            name={weekArr[3]}
                            checked={checkedWeek[3]}
                            onChange={onChangeInputCheckedWeek}
                            // required
                        />
                        <label
                            htmlFor={weekArr[3]}
                            ref={(elem) => (weekLabelRefs.current[3] = elem)}
                        >
                            수
                        </label>

                        <input
                            type="checkbox"
                            id={weekArr[4]}
                            name={weekArr[4]}
                            checked={checkedWeek[4]}
                            onChange={onChangeInputCheckedWeek}
                            // required
                        />
                        <label
                            htmlFor={weekArr[4]}
                            ref={(elem) => (weekLabelRefs.current[4] = elem)}
                        >
                            목
                        </label>

                        <input
                            type="checkbox"
                            id={weekArr[5]}
                            name={weekArr[5]}
                            checked={checkedWeek[5]}
                            onChange={onChangeInputCheckedWeek}
                            // required
                        />
                        <label
                            htmlFor={weekArr[5]}
                            ref={(elem) => (weekLabelRefs.current[5] = elem)}
                        >
                            금
                        </label>

                        <input
                            type="checkbox"
                            id={weekArr[6]}
                            name={weekArr[6]}
                            checked={checkedWeek[6]}
                            onChange={onChangeInputCheckedWeek}
                            // required
                        />
                        <label
                            className="saturday"
                            htmlFor={weekArr[6]}
                            ref={(elem) => (weekLabelRefs.current[6] = elem)}
                        >
                            토
                        </label>
                    </div>
                </div>

                <div className="div__btn_wrapper">
                    <button type="submit" className="btn__edit_classroom">
                        수정하기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditClassroomTabPanel;
