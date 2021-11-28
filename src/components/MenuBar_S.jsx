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
                    history.push("/student/main");
                    break;

                case "시험 목록":
                    history.push("/student/assigned_exam");
                    break;

                case "오답 노트":
                    history.push("/student/completed_exam");
                    break;

                case "반 가입 요청":
                    history.push("/student/classroom_info");
                    break;

                case "학원 가입 요청":
                    history.push("/student/academy_info");
                    break;

                case "회원정보 수정":
                    editAccountInfo();
                    break;

                case "로그아웃":
                    logOut();
                    history.push("/");
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
                {/* 학생이 가입된 학원이 있는 경우 보여줄 List */}
                {isJoinedAcademy === true ? (
                    <List>
                        {[
                            "수업 일정",
                            "시험 목록",
                            "오답 노트",
                            "반 가입 요청"
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
                    {["학원 가입 요청", "회원정보 수정", "로그아웃"].map(
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

const MenuBar_S = memo(({ centerMenu, isJoinedAcademy, history }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <MenuDrawer
                        isJoinedAcademy={isJoinedAcademy}
                        history={history}
                    />

                    <Button
                        color="inherit"
                        onClick={() => history.push("/student/main")}
                    >
                        <Typography variant="h6" className={classes.title}>
                            {/* Pull-Go */}
                            {centerMenu}
                        </Typography>
                    </Button>

                    {/* <Typography variant="h6" className={classes.title}>
						Pull-Go
					</Typography> */}

                    <Button color="inherit" onClick={logOut}>
                        로그아웃
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
});

export default MenuBar_S;
