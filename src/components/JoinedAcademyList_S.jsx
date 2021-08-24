import React, { memo } from "react";

const JoinedAcademyList_S = memo(({ studentJoinedAcademyList }) => {
	return (
		<div className="student_joined_academy_list">
			<h3>가입된 학원 목록</h3>
			<ul>
				{studentJoinedAcademyList.length !== 0
					? studentJoinedAcademyList.map((academy) => (
							<div key={academy.id} className="academy_list_item">
								<li>{academy.name}</li>
								<span>주소: {academy.address}</span>
								<span>전화번호: {academy.phone}</span>
								<br />
							</div>
					  ))
					: ""}
			</ul>
		</div>
	);
});

export default JoinedAcademyList_S;
