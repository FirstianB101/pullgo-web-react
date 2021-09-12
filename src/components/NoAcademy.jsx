import React, { memo } from "react";
import { useSelector } from "react-redux";
import MenuBar_S from "../components/MenuBar_S";
import "../styles/NoAcademy.css";

const NoAcademy = memo(({ history }) => {
	const userType = useSelector((state) => state.userTypeReducer.userType);
	const studentInfo = useSelector(
		(state) => state.studentInfoReducer.studentInfo
	);
	const teacherInfo = useSelector(
		(state) => state.teacherInfoReducer.teacherInfo
	);

	const fullName =
		userType === "student"
			? studentInfo.account?.fullName
			: teacherInfo.account?.fullName;

	return (
		<div className="no_academy">
			<MenuBar_S isJoinedAcademy={false} history={history} />

			<div className="no_academy_content">
				<h3>
					{fullName} 님,
					<br />
					안녕하세요!
				</h3>

				<div>
					<h1>가입된 학원이 없습니다.</h1>
					<button
						onClick={() =>
							history.push(`/${userType}/apply_academy`)
						}
					>
						학원 가입하기
					</button>
				</div>
			</div>
		</div>
	);
});

export default NoAcademy;
