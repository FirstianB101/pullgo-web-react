import React from "react";

import MenuBar_S from "./MenuBar_S";
import LessonCalendar_S from "./LessonCalendar_S";

const YesAcademy_S = ({ history }) => {
	return (
		<div className="student_yes_academy">
			<MenuBar_S isJoinedAcademy={true} history={history} />
			<LessonCalendar_S />
		</div>
	);
};

export default YesAcademy_S;
