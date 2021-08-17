import React, { memo } from "react";
import { useSelector } from "react-redux";

const NoAcademyStudentContent = memo(({ history }) => {
	const studentInfo = useSelector(
		(state) => state.fetchStudentInfoReducer.studentInfo
	);

	let fullName =
		studentInfo.account !== undefined ? studentInfo.account.fullName : "";

	const applyAcademy = () => {
		// 학원 가입 요청 페이지로 이동
		history.push("/student_apply_academy");
	};

	return (
		<div className="no_academy_student_content">
			<h3>
				{fullName} 님,
				<br />
				안녕하세요!
			</h3>

			<div>
				<h1>가입된 학원이 없습니다.</h1>
				<button onClick={applyAcademy}>학원 가입하기</button>
			</div>
		</div>
	);
});

export default NoAcademyStudentContent;
