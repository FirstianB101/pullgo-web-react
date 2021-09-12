import React, { memo } from "react";

const ApplyingAcademyList = memo(({ applyingAcademyList }) => {
	return (
		<div className="applying_academy_list">
			<h3>가입 신청한 학원 목록</h3>
			<ul>
				{applyingAcademyList.length !== 0 ? (
					applyingAcademyList.map((academy) => (
						<div key={academy.id} className="academy_list_item">
							<li>{academy.name}</li>
							<span>주소: {academy.address}</span>
							<span>전화번호: {academy.phone}</span>
							<br />
						</div>
					))
				) : (
					<span className="no_applying_academy">
						가입 신청한 학원이 없습니다!
					</span>
				)}
			</ul>
		</div>
	);
});

export default ApplyingAcademyList;
