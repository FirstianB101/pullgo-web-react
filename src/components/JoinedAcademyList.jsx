import React, { memo } from "react";

const JoinedAcademyList = memo(({ joinedAcademyList }) => {
	return (
		<div className="joined_academy_list">
			<h3>가입된 학원 목록</h3>
			<ul>
				{joinedAcademyList.length !== 0 ? (
					joinedAcademyList.map((academy) => (
						<li key={academy.id}>
							<span className="academy_name">{academy.name}</span>
							<span className="academy_address">
								주소: {academy.address}
							</span>
							<span className="academy_phone">
								전화번호: {academy.phone}
							</span>
						</li>
					))
				) : (
					<span className="no_joined_academy">
						가입된 학원이 없습니다!
					</span>
				)}
			</ul>
		</div>
	);
});

export default JoinedAcademyList;
