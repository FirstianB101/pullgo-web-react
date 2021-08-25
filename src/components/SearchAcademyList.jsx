import React, { useState, memo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";

const AlertDialog = memo(({ academyId, academyName }) => {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const studentId = useSelector(
		(state) => state.fetchStudentIdReducer.studentId
	);

	const onClickBtnApplyAcademy = (clickedAcademy) => {
		console.log(clickedAcademy);

		const postApplyAcademy = async () => {
			try {
				const response = await axios.post(
					`/v1/students/${studentId}/apply-academy`,
					{ academyId }
				);

				if (response.status === 204)
					alert("학원 가입 요청이 완료되었습니다.");
				setOpen(false);

				// 학생이 가입 요청한 학원 목록 Store 갱신 (Action Dispatch)
			} catch (e) {
				alert("이미 가입된 학원입니다.");
				console.log(e);
				setOpen(false);
			}
		};

		postApplyAcademy();
	};

	return (
		<div>
			<Button
				variant="outlined"
				color="primary"
				onClick={handleClickOpen}
			>
				{academyName}
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{academyName} 학원에 가입을 요청 하시겠습니까?
				</DialogTitle>
				{/* <DialogContent>
					<DialogContentText id="alert-dialog-description">
						{academyName} 학원에 가입을 요청 하시겠습니까?
					</DialogContentText>
				</DialogContent> */}
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						취소
					</Button>
					<Button
						onClick={() => onClickBtnApplyAcademy(academyName)}
						color="primary"
					>
						확인
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
});

/* SearchAcademyListContainer로부터 redux 전역 state를 props로 전달받음 */
const SearchAcademyList = memo(
	({ academyList, onFetchAcademyListByAcademyName }) => {
		const [academyName, setAcademyName] = useState("");

		const onSubmitForm = (e) => {
			e.preventDefault();

			onFetchAcademyListByAcademyName(academyName);
			console.log(academyList);
		};

		const onChangeInputAcademyName = (e) => {
			setAcademyName(e.target.value);
		};

		return (
			<form className="search_academy_form" onSubmit={onSubmitForm}>
				<div className="search_academy_input">
					<input
						type="text"
						name="academyName"
						value={academyName}
						onChange={onChangeInputAcademyName}
						placeholder="학원 이름 검색"
						required
					/>
					<button type="submit" autoFocus>
						검색
					</button>
				</div>

				<ul className="academy_list">
					{academyList.length !== 0
						? academyList.map((academy) => (
								<div
									key={academy.id}
									className="academy_list_item"
								>
									<AlertDialog
										academyId={academy.id}
										academyName={academy.name}
									/>
									<br />
									<span>주소: {academy.address}</span>
									<span>전화번호: {academy.phone}</span>
								</div>
						  ))
						: ""}
				</ul>
			</form>
		);
	}
);

export default SearchAcademyList;
