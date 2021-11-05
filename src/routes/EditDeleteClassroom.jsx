import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import MenuBar_T from "../components/MenuBar_T";
import ManageClassroomMenuChips from "../components/ManageClassroomMenuChips";
import EditClassroomTabPanel from "../components/EditClassroomTabPanel";
import DeleteClassroomTabPanel from "../components/DeleteClassroomTabPanel";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import "../styles/EditDeleteClassroom.css";
import "../styles/ManageClassroomMenuChips.css";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

const EditDeleteClassroom = memo(({ history, match, location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    const [classroomId, setClassroomId] = useState(query.id);
    const [value, setValue] = useState(0);

    const dispatch = useDispatch();
    const onFetchJoinedAcademyList = (userType, userId) => {
        console.log("onFetchJoinedAcademyList()");
        dispatch(apiFetchJoinedAcademyList(userType, userId));
    };

    const userType = useSelector((state) => state.userTypeReducer.userType);
    const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);
    const authToken = useSelector((state) => state.authTokenReducer.authToken);

    useEffect(() => {
        console.log("EditDeleteClassroom 렌더링");
        onFetchJoinedAcademyList(userType, teacherId);
    }, []);

    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const isJoinedAcademy = joinedAcademyList.length !== 0;

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="edit_delete_classroom">
            <MenuBar_T
                centerMenu="반 수정 및 삭제"
                isJoinedAcademy={isJoinedAcademy}
                history={history}
                match={match}
            />

            <ManageClassroomMenuChips
                currentChipLabel="반 수정 및 삭제"
                history={history}
                location={location}
            />

            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="수정" {...a11yProps(0)} />
                        <Tab label="삭제" {...a11yProps(1)} />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    <EditClassroomTabPanel classroomId={classroomId} />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <DeleteClassroomTabPanel classroomId={classroomId} />
                </TabPanel>
            </Box>
        </div>
    );
});

export default EditDeleteClassroom;
