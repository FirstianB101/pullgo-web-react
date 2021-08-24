import React, { memo } from "react";
import MenuBar_S from "../components/MenuBar_S";
import NoAcademyContent_S from "../components/NoAcademyContent_S";

import "../styles/NoAcademy_S.css";

const NoAcademy_S = memo(({ history }) => {
	return (
		<div className="student_no_academy">
			<MenuBar_S isJoinedAcademy={false} history={history} />
			<NoAcademyContent_S history={history} />
		</div>
	);
});

export default NoAcademy_S;
