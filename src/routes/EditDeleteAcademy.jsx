import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import MenuBar_T from "../components/MenuBar_T";
import ManageAcademyMenuChips from "../components/ManageAcademyMenuChips";
import EditAcademyTabPanel from "../components/EditAcademyTabPanel";
import DeleteAcademyTabPanel from "../components/DeleteAcademyTabPanel";

import TabPanel from "../material/TabPanel";
import { a11yProps } from "../material/TabPanel";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import "../styles/EditDeleteAcademy.css";

const EditDeleteAcademy = ({ history, match, location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    const [academyId, setacAdemyId] = useState(query.id);
    const [academy, setAcademy] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [value, setValue] = useState(0);

    const dispatch = useDispatch();
    const onFetchJoinedAcademyList = (userType, userId) => {
        console.log("onFetchJoinedAcademyList()");
        dispatch(apiFetchJoinedAcademyList(userType, userId));
    };

    const userType = useSelector((state) => state.userTypeReducer.userType);
    const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);

    useEffect(() => {
        console.log("EditDeleteAcademy 렌더링");
        onFetchJoinedAcademyList(userType, teacherId);
    }, []);

    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const isJoinedAcademy = joinedAcademyList.length !== 0;

    useEffect(() => {
        if (joinedAcademyList.length === 0) return;

        const currentAcademy = joinedAcademyList.find(
            (academy) => academy.id == academyId
        );
        if (currentAcademy != undefined) setAcademy(currentAcademy);
    }, [academyId, joinedAcademyList]);

    useEffect(() => {
        if (academy === null) return;
        setHasPermission(teacherId == academy.ownerId);
    }, [joinedAcademyList, academyId, teacherId]);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="edit_delete_academy">
            <MenuBar_T
                centerMenu="학원 수정 및 삭제"
                isJoinedAcademy={isJoinedAcademy}
                history={history}
                match={match}
            />

            <ManageAcademyMenuChips
                currentChipLabel="학원 수정 및 삭제"
                hasPermission={hasPermission}
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
                    <EditAcademyTabPanel
                        academyId={academyId}
                        beforeEditAcademy={academy}
                    />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <DeleteAcademyTabPanel
                        academyId={academyId}
                        correctAcademy={academy}
                    />
                </TabPanel>
            </Box>
        </div>
    );
};

export default EditDeleteAcademy;
