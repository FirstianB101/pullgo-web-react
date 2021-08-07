import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import "../styles/FindAccount.css";
import FindIdForm from "../components/FindIdForm";
import FindPwForm from "../components/FindPwForm";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}>
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

// const useStyles = makeStyles((theme) => ({
//     root: {
//         backgroundColor: theme.palette.background.paper,
//         width: 500
//     }
// }));

const findTypeList = {
    0: "id",
    1: "pw"
};

const FindAccount = memo(() => {
    // Tabs
    // const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [findType, setFindType] = useState(findTypeList[0]);

    const onChangeTabs = (event, newValue) => {
        setValue(newValue);
        setFindType(findTypeList[newValue]);
    };

    // FindIdForm에게 props로 전달
    const onSubmitFindIdForm = (e) => {
        alert(`${e.name}, ${e.phone_number}`);
    };

    // FindPwForm에게 props로 전달
    const onSubmitFindPwForm = (e) => {
        alert(`${e.id}, ${e.phone_number}`);
    };

    return (
        <div className="find_account__page">
            <h3>아이디/비밀번호 찾기</h3>

            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={onChangeTabs}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    centered>
                    <Tab label="아이디" {...a11yProps(0)} />
                    <Tab label="비밀번호" {...a11yProps(1)} />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0} dir={theme.direction}>
                <FindIdForm onSubmit={onSubmitFindIdForm} />
            </TabPanel>

            <TabPanel value={value} index={1} dir={theme.direction}>
                <FindPwForm onSubmit={onSubmitFindPwForm} />
            </TabPanel>
        </div>
    );
});

export default connect()(FindAccount);
