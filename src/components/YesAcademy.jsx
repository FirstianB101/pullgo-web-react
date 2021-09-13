import React, { memo } from "react";
import { useSelector } from "react-redux";

import MenuBar_S from "./MenuBar_S";
import MenuBar_T from "./MenuBar_T";
import LessonCalendar_S from "./LessonCalendar_S";
import LessonCalendar_T from "./LessonCalendar_T";

import "../styles/YesAcademy.css";

const YesAcademy = memo(({ history, match }) => {
	const userType = useSelector((state) => state.userTypeReducer.userType);

	return (
		<div className="yes_academy">
			{userType === "student" ? (
				<>
					<MenuBar_S isJoinedAcademy={true} history={history} />
					<LessonCalendar_S />
				</>
			) : (
				<>
					<MenuBar_T isJoinedAcademy={true} history={history} />
					<LessonCalendar_T history={history} match={match} />
				</>
			)}
		</div>
	);
});

export default YesAcademy;
