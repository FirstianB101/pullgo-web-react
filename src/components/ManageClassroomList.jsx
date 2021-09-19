import React, { useEffect, memo } from "react";

const showClassroomListItems = (classroomList) => {
    const listItems = [];


};

const ManageClassroomList = ({ joinedClassroomList, history }) => {
    return (
        <>
            <h2>반 관리</h2>
            <h4>반 개수: {joinedClassroomList.length}</h4>
        </>
    );
};

export default ManageClassroomList;