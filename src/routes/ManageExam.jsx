import React, { useState, memo } from "react";

const ManageExam = ({ match }) => {
    const [classroomId, setClassroomId] = useState(match.params.classroomId);

    return (
        <div>
            <h2>Manage Exam</h2>
            <span>classroomId {classroomId} 반의 Exam List ...</span>
        </div>
    );
};

export default ManageExam;