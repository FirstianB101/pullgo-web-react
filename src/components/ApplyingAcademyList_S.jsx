import React, { memo } from "react";

const ApplyingAcademyList_S = memo(({ studentApplyingAcademyList }) => {
	return (
		<div className="student_applying_academy_list">
			<h3>가입 신청한 학원 목록</h3>
			<ul>
				{studentApplyingAcademyList.length !== 0
					? studentApplyingAcademyList.map((academy) => (
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

export default ApplyingAcademyList_S;
