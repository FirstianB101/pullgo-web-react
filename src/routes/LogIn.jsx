import React, { useState, memo } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { saveUserType } from "../redux/fetchUserType";
import { saveAuthToken } from "../redux/fetchAuthToken";
import { saveTeacherId } from "../redux/teacher/fetchTeacherId";
import { saveStudentId } from "../redux/student/fetchStudentId";
import Banner from "../components/Banner";
import Logo from "../components/Logo";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import "../styles/LogIn.css";

/* Date 객체를 인자로 받아서 "2021-08" 형식(년, 월)의 string으로 반환 */
const dateToYearMonthStr = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    return year + "-" + month;
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: theme.palette.background.paper
        // width: 500
    }
}));

const userTypeList = {
    0: "student",
    1: "teacher"
};

/* LoginContainer로부터 redux 전역 state를 props로 전달받음 */
const LogIn = memo(({ history }) => {
    const dispatch = useDispatch();

    // Tabs
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [userType, setUserType] = useState(userTypeList[0]);

    // input(id, pw)
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const onChangeTabs = (event, newValue) => {
        setValue(newValue);
        setUserType(userTypeList[newValue]);
    };

    const onChangeInputId = (e) => {
        setId(e.target.value);
    };

    const onChangeInputPw = (e) => {
        setPw(e.target.value);
    };

    const onSubmitForm = async (e) => {
        // 서버에 id, pw 전달
        e.preventDefault();
        alert(`id: ${id} pw: ${pw}, userType: ${userType}`);

        dispatch(saveUserType(userType));

        let status = null;
        let teacherId = null;
        let studentId = null;

        // username(id), password(pw)로 authToken 발급
        const postAuthToken = async () => {
            try {
                const response = await axios.post("/v1/auth/token", {
                    username: id,
                    password: pw
                });

                // redux store에 token 저장
                dispatch(saveAuthToken(response.data.token, response.status));

                status = response.status;
                if (response.data.teacher !== null)
                    teacherId = response.data.teacher.id;
                else if (response.data.student !== null)
                    studentId = response.data.student.id;
            } catch (e) {
                alert("아이디 또는 패스워드를 잘못 입력하였습니다.");
                console.log(e);
                // status: 의미적으로는 401, 403 코드
                // 실제 status 변수값은 null (post 에러 발생하면, status에 값 대입 안됨)
            }
        };

        await postAuthToken();

        // status에 따라 로그인 실패, 성공 판단
        if (status === 200) {
            alert("로그인 성공");

            if (teacherId !== null) {
                dispatch(saveTeacherId(teacherId));
            } else if (studentId !== null) {
                dispatch(saveStudentId(studentId));
            }

            const yearMonthStr = dateToYearMonthStr(new Date());

            // 링크 이동 => 사용자 타입(student, teacher)에 따라서
            userType === "student"
                ? history.push("/student/main")
                : history.push(`/teacher/main/calendar/${yearMonthStr}`);
        }
    };

    return (
        <div className={`login__page ${classes.root}`}>
            <Banner />

            <div className="login__form__container">
                <Logo />
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={onChangeTabs}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        centered
                    >
                        <Tab label="학생" {...a11yProps(0)} />
                        <Tab label="선생님" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>

                <form className="login__form" onSubmit={onSubmitForm}>
                    <input
                        type="text"
                        name="id"
                        placeholder="아이디"
                        value={id}
                        onChange={onChangeInputId}
                    />
                    <input
                        type="password"
                        name="pw"
                        placeholder="비밀번호"
                        value={pw}
                        onChange={onChangeInputPw}
                    />

                    <button type="submit">로그인</button>
                </form>

                <Link to="/signup_menu">회원 가입</Link>
                <Link to="/find_account">계정 찾기</Link>
            </div>
        </div>
    );
});

export default LogIn;
