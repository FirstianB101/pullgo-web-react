import React from "react";
import Checkbox from "@mui/material/Checkbox";

const ClassroomAppliedTeacherList = ({ classroomId, appliedTeacherList }) => {
    const showAppliedTeacherListItems = () => {
        const listItems = [];

        for (let i = 0; i < appliedTeacherList.length; i++) {}

        listItems.push(<Checkbox />);

        return listItems;
    };

    return (
        <div>
            <h2>선생님</h2>

            {appliedTeacherList.map((teacher) => (
                <h4>{teacher.account.fullName}</h4>
            ))}
            {showAppliedTeacherListItems()}
        </div>
    );
};

export default ClassroomAppliedTeacherList;
