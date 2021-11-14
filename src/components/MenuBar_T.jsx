import React, { useState, memo } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import CreateExamDialog from "./CreateExamDialog";
import CreateClassroomDialog from "./CreateClassroomDialog";
import "../styles/MenuBar.css";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

const editAccountInfo = () => {
    alert("회원정보 수정");
};

const logOut = () => {
    alert("로그아웃");
};

/* Date 객체를 인자로 받아서 "2021-08" 형식(년, 월)의 string으로 반환 */
const dateToYearMonthStr = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    return year + "-" + month;
};

const MenuDrawer = memo(({ isJoinedAcademy, history }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        )
            return;

        setIsDrawerOpen(open);
    };

    const menuList = () => {
        const onClickBtn = (btnText) => {
            switch (btnText) {
                case "수업 일정":
                    const yearMonthStr = dateToYearMonthStr(new Date());
                    history.push(`/teacher/main/calendar/${yearMonthStr}`);
                    break;

                case "반 관리":
                    history.push("/teacher/manage_classroom");
                    break;

                case "반 가입 요청":
                    history.push("/teacher/classroom_info");
                    break;

                case "학원 관리":
                    history.push("/teacher/manage_academy");
                    break;

                case "학원 가입 요청":
                    history.push("/teacher/academy_info");
                    break;

                case "회원정보 수정":
                    editAccountInfo();
                    break;

                case "로그아웃":
                    logOut();
                    break;
            }
        };

        return (
            <div
                className="div-menu_list"
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                {/* 선생님이 가입된 학원이 있는 경우 보여줄 List */}
                {isJoinedAcademy === true ? (
                    <List>
                        {["수업 일정", "반 관리", "반 가입 요청"].map(
                            (text) => (
                                <ListItem
                                    button
                                    key={text}
                                    onClick={() => onClickBtn(text)}
                                >
                                    <ListItemText primary={text} />
                                </ListItem>
                            )
                        )}
                    </List>
                ) : (
                    ""
                )}

                <Divider />

                {/* 선생님이 가입된 학원이 있는 경우 보여줄 List */}
                {isJoinedAcademy === true ? (
                    <List>
                        {[
                            "학원 관리", // 원장만 가능하도록
                            "학원 가입 요청"
                        ].map((text) => (
                            <ListItem
                                button
                                key={text}
                                onClick={() => onClickBtn(text)}
                            >
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    ""
                )}

                <Divider />

                <List>
                    {["회원정보 수정", "로그아웃"].map((text) => (
                        <ListItem
                            button
                            key={text}
                            onClick={() => onClickBtn(text)}
                        >
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    };

    return (
        <div>
            <Button onClick={toggleDrawer("left", true)}>
                {/* <MenuIcon fontSize="large" /> */}
                <MenuIcon style={{ fontSize: "2.5rem" }} />
            </Button>
            <Drawer
                anchor={"left"}
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
            >
                {menuList()}
            </Drawer>
        </div>
    );
});

const MenuBar_T = memo(
    ({ centerMenu, rightMenu, isJoinedAcademy, history, match, location }) => {
        const classes = useStyles();
        const yearMonthStr = dateToYearMonthStr(new Date());

        const [createClassroomDialogOpen, setCreateClassroomDialogOpen] =
            useState(false);
        const [createExamDialogOpen, setCreateExamDialogOpen] = useState(false);

        const onClickBtnRightMenu = (e) => {
            if (centerMenu === "학원 관리" || centerMenu === "학원 가입요청")
                history.push("/teacher/create_academy");
            else if (centerMenu === "반 관리" || centerMenu === "반 가입요청")
                setCreateClassroomDialogOpen(true);
            else if (centerMenu === "시험 관리") setCreateExamDialogOpen(true);
        };

        return (
            <>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <MenuDrawer
                                isJoinedAcademy={isJoinedAcademy}
                                history={history}
                            />

                            <Button
                                color="inherit"
                            // onClick={() =>
                            // 	history.push(
                            // 		`/teacher/main/calendar/${yearMonthStr}`
                            // 	)
                            // }
                            >
                                <Typography
                                    variant="h6"
                                    className={classes.title}
                                >
                                    {/* Pull-Go */}
                                    {centerMenu}
                                </Typography>
                            </Button>

                            <Button
                                color="inherit"
                                onClick={onClickBtnRightMenu}
                            >
                                {rightMenu}
                            </Button>

                            {/* <Button color="inherit" onClick={logOut}>
							로그아웃
						</Button> */}
                        </Toolbar>
                    </AppBar>
                </div>

                {/* 자식 컴포넌트에게 props로 함수 전달하여 자식이 부모의 state 변경 */}
                <CreateExamDialog
                    createExamDialogOpen={createExamDialogOpen}
                    setCreateExamDialogOpen={setCreateExamDialogOpen}
                    match={match}
                    location={location}
                />

                <CreateClassroomDialog
                    createClassroomDialogOpen={createClassroomDialogOpen}
                    setCreateClassroomDialogOpen={setCreateClassroomDialogOpen}
                    match={match}
                />
            </>
        );
    }
);

export default MenuBar_T;
