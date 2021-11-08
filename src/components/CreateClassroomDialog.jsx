import React, { useState, useEffect, useRef, memo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// Dialog
import PaperComponent from "../material/PaperComponent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// Select
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

/* joinedAcademyList를 <option> 태그에 담아서 return */
const getOptionTag = (academyList) => {
    return academyList.map((academy) => (
        <option value={academy.name}>{academy.name}</option>
    ));
};

/* joinedAcademyList에서 academyName에 해당하는 academyId return */
const getAcademyId = (academyList, academyName) => {
    return academyList.filter((academy) => academy.name === academyName)[0].id;
};

const weekArrKR = ["일", "월", "화", "수", "목", "금", "토"];

/* checkedWeek (요일 체크 state 배열)을 인자로 받아서 체크된 요일들 문자열로 return */
const getCheckedWeekStr = (checkedWeek) => {
    let checkedWeekStr = "";
    for (let i = 1; i < weekArrKR.length; i++) {
        if (checkedWeek[i]) checkedWeekStr += weekArrKR[i];
    }
    if (checkedWeek[0]) checkedWeekStr += weekArrKR[0];

    return checkedWeekStr;
};

const CreateClassroomDialog = ({
    createClassroomDialogOpen,
    setCreateClassroomDialogOpen,
    match
}) => {
    const classes = useStyles();
    const weekArr = [
        "week_sunday",
        "week_monday",
        "week_tuesday",
        "week_wednesday",
        "week_thursday",
        "week_friday",
        "week_saturday"
    ];

    // 반 추가 Dialog form 요소 stat들
    const [classroomName, setClassroomName] = useState("");
    const [checkedWeek, setCheckedWeek] = useState(
        Array.from({ length: 7 }, () => false)
    ); // 요일 체크 state 배열
    const [academyName, setAcademyName] = useState("");

    const weekLabelRefs = useRef([]);

    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const teacherInfo = useSelector(
        (state) => state.teacherInfoReducer.teacherInfo
    );
    const authToken = useSelector((state) => state.authTokenReducer.authToken);

    const handleClose = () => {
        // 반 추가 Dialog form 요소 state들 초기화
        setClassroomName("");
        setCheckedWeek(Array.from({ length: 7 }, () => false));
        setAcademyName("");

        setCreateClassroomDialogOpen(false);
    };

    const onChangeInputClassroomName = (e) => {
        setClassroomName(e.target.value);
    };

    const onChangeInputCheckedWeek = (e) => {
        const clickedIndex = weekArr.indexOf(e.target.name);
        setCheckedWeek([
            ...checkedWeek.slice(0, clickedIndex),
            e.target.checked,
            ...checkedWeek.slice(clickedIndex + 1, checkedWeek.length)
        ]);
    };

    const onChangeSelectAcademyName = (e) => {
        setAcademyName(e.target.value);
    };

    /* 반 추가 Dialog Form Submit */
    const onSubmitForm = async (e) => {
        e.preventDefault();

        const postCreateClassroom = async () => {
            const checkedWeekStr = getCheckedWeekStr(checkedWeek);

            const name = `${classroomName};${teacherInfo.account.fullName};${checkedWeekStr}`;
            const academyId = getAcademyId(joinedAcademyList, academyName);
            const creatorId = teacherInfo.id;

            try {
                const response = await axios.post(
                    "/v1/academy/classrooms",
                    {
                        name,
                        academyId,
                        creatorId
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    }
                );

                if (response.status === 201) alert("반 추가가 완료되었습니다.");
            } catch (e) {
                alert("토큰 만료. 로그인 페이지로 이동");
                console.log(e);
            }
        };

        let confirmCreateClassroom = window.confirm("반을 추가 하시겠습니까?");
        if (confirmCreateClassroom) {
            await postCreateClassroom();

            // 페이지 새로고침
            window.location.replace(match.path);
        }

        // 반 추가 form state들 초기화
        setClassroomName("");
        setCheckedWeek(Array.from({ length: 7 }, () => false));
        setAcademyName("");

        setCreateClassroomDialogOpen(false);
    };

    /* checkedWeek 배열 state가 변경되면, label 색 변경하여 선택한 요일 표시 */
    useEffect(() => {
        if (weekLabelRefs.current.length === 0) return;

        for (let i = 0; i < checkedWeek.length; i++) {
            if (checkedWeek[i])
                weekLabelRefs.current[i].style.backgroundColor = "#E2E4FF";
            else weekLabelRefs.current[i].style.backgroundColor = "";
        }
    }, [checkedWeek]);

    return (
        <div className="create_classroom_dialog">
            <Dialog
                open={createClassroomDialogOpen}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle
                    style={{ cursor: "move" }}
                    id="draggable-dialog-title"
                >
                    반 추가
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <form
                            className="classroom_create__form"
                            onSubmit={onSubmitForm}
                        >
                            <div>
                                <span className="classroom_create__form__label">
                                    반 이름
                                </span>
                                <input
                                    type="text"
                                    name="classroom_name"
                                    value={classroomName}
                                    onChange={onChangeInputClassroomName}
                                    required
                                />
                            </div>

                            <div className="div__check_week">
                                <span className="classroom_create__form__label">
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
                                        ref={(elem) =>
                                            (weekLabelRefs.current[0] = elem)
                                        }
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
                                        ref={(elem) =>
                                            (weekLabelRefs.current[1] = elem)
                                        }
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
                                        ref={(elem) =>
                                            (weekLabelRefs.current[2] = elem)
                                        }
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
                                        ref={(elem) =>
                                            (weekLabelRefs.current[3] = elem)
                                        }
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
                                        ref={(elem) =>
                                            (weekLabelRefs.current[4] = elem)
                                        }
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
                                        ref={(elem) =>
                                            (weekLabelRefs.current[5] = elem)
                                        }
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
                                        ref={(elem) =>
                                            (weekLabelRefs.current[6] = elem)
                                        }
                                    >
                                        토
                                    </label>
                                </div>
                            </div>

                            <div className="div__select_academy">
                                <span className="classroom_create__form__label">
                                    학원 선택
                                </span>
                                <div className="academy_name">
                                    <FormControl
                                        className={classes.formControl}
                                        required
                                    >
                                        <InputLabel htmlFor="academy_name-native-helper">
                                            학원
                                        </InputLabel>
                                        <NativeSelect
                                            value={academyName}
                                            onChange={onChangeSelectAcademyName}
                                            inputProps={{
                                                name: "academyName",
                                                id: "academy_name-native-helper"
                                            }}
                                        >
                                            <option
                                                aria-label="None"
                                                value=""
                                            />
                                            {getOptionTag(joinedAcademyList)}
                                        </NativeSelect>
                                        <FormHelperText>
                                            가입된 학원을 선택해주세요!
                                        </FormHelperText>
                                    </FormControl>
                                </div>
                            </div>

                            <div className="buttons__confirm_cancel">
                                <Button onClick={handleClose} color="primary">
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
};

export default CreateClassroomDialog;
