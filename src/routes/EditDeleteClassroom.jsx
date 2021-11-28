import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import { apiFetchClassroom } from "../redux/fetchClassroom";
import MenuBar_T from "../components/MenuBar_T";
import ManageClassroomMenuChips from "../components/ManageClassroomMenuChips";
import EditClassroomTabPanel from "../components/EditClassroomTabPanel";
import DeleteClassroomTabPanel from "../components/DeleteClassroomTabPanel";

import TabPanel from "../material/TabPanel";
import { a11yProps } from "../material/TabPanel";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import "../styles/EditDeleteClassroom.css";

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
    const onFetchClassroom = (classroomId) => {
        console.log("onFetchClassroom()");
        dispatch(apiFetchClassroom(classroomId));
    };

    const userType = useSelector((state) => state.userTypeReducer.userType);
    const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);

    useEffect(() => {
        console.log("EditDeleteClassroom 렌더링");
        onFetchJoinedAcademyList(userType, teacherId);
    }, []);

    useEffect(() => {
        onFetchClassroom(classroomId);
    }, [classroomId]);

    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const classroom = useSelector((state) => state.classroomReducer.classroom);
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

            <div className="wrapper__div__edit_delete_classroom">
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
                        <EditClassroomTabPanel
                            classroomId={classroomId}
                            beforeEditClassroom={classroom}
                        />
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <DeleteClassroomTabPanel
                            classroomId={classroomId}
                            correctClassroom={classroom}
                        />
                    </TabPanel>
                </Box>
            </div>
        </div>
    );
});

export default EditDeleteClassroom;
