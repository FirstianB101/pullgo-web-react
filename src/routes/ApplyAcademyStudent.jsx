import React, { memo } from "react";

import MenuBarStudent from "../components/MenuBarStudent";
import SearchAcademyListContainer from "../container/SearchAcademyListContainer";
import "../styles/ApplyAcademyStudent.css";

const ApplyAcademyStudent = memo(() => {
	return (
		<div>
			<MenuBarStudent isJoinedAcademy={false} />
			<SearchAcademyListContainer />
		</div>
	);
});

export default ApplyAcademyStudent;
