import React, { memo } from "react";
import MenuBarStudent from "../components/MenuBarStudent";
import NoAcademyStudentContent from "../components/NoAcademyStudentContent";

import "../styles/NoAcademyStudent.css";

const NoAcademyStudent = memo(({ history }) => {
	return (
		<div className="student_no_academy">
			<MenuBarStudent isJoinedAcademy={false} />
			<NoAcademyStudentContent history={history} />
		</div>
	);
});

export default NoAcademyStudent;
