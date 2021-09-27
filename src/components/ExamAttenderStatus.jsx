import React from "react";

const ExamAttenderStatus = ({ examId, examName }) => {
	return (
		<div>
			<h4>
				{examName} (examId {examId}번) 시험 응시 현황
			</h4>
		</div>
	);
};

export default ExamAttenderStatus;
