import React, { useState, memo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

/* SelectAcademy */
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
/* AlertDialog */
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	}
}));

const AlertDialog = memo(({ classroomId, classroomName }) => {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const studentId = useSelector((state) => state.studentIdReducer.studentId);

	const onClickBtnApplyClassroom = (clickedClassroom) => {
		console.log(clickedClassroom);

		const postApplyClassroom = async () => {
			try {
				const response = await axios.post(
					`/v1/students/${studentId}/apply-classroom`,
					{ classroomId }
				);

				if (response.status === 204)
					alert("반 가입 요청이 완료되었습니다.");
				setOpen(false);

				// 사용자가 가입 요청한 반 목록 Store 갱신 (Action Dispatch)
			} catch (e) {
				alert("이미 가입된 반입니다.");
				console.log(e);
				setOpen(false);
			}
		};

		postApplyClassroom();
	};

	return (
		<div>
			<Button
				variant="outlined"
				color="primary"
				onClick={handleClickOpen}
			>
				{classroomName}
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{classroomName} 반에 가입을 요청 하시겠습니까?
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
						onClick={() => onClickBtnApplyClassroom(classroomName)}
						color="primary"
					>
						확인
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
});

/* SearchClassroomListContainer로부터 redux 전역 state를 props로 전달받음 */
const SearchClassroomList = memo(
	({ classroomList, onFetchClassroomListByAcademyIdAndName }) => {
		// 반 이름 or 선생님 이름으로 반 검색
		const [searchName, setSearchName] = useState("");

		const joinedAcademyList = useSelector(
			(state) => state.joinedAcademyListReducer.joinedAcademyList
		);

		const onSubmitForm = (e) => {
			e.preventDefault();

			onFetchClassroomListByAcademyIdAndName(
				selectedAcademyId,
				searchName
			);
		};

		const onChangeInputSearchName = (e) => {
			setSearchName(e.target.value);
		};

		/* 학원 Select 컴포넌트 */
		const classes = useStyles();
		const [selectedAcademyId, setSelectedAcademyId] = useState("");

		const onChangeSelectAcademy = (e) => {
			setSelectedAcademyId(e.target.value);
		};

		return (
			<form className="search_classroom_form" onSubmit={onSubmitForm}>
				{/* 가입된 학원 select */}
				<div className="select_academy">
					<FormControl className={classes.formControl}>
						<InputLabel id="select-helper-label">학원</InputLabel>
						<Select
							labelId="select-helper-label"
							id="select-helper"
							value={selectedAcademyId}
							onChange={onChangeSelectAcademy}
							required
						>
							{/* <MenuItem value="">
								<em>None</em>
							</MenuItem> */}

							{joinedAcademyList.length !== 0
								? joinedAcademyList.map((academy) => (
										<MenuItem value={academy.id}>
											{academy.name}
										</MenuItem>
								  ))
								: ""}
						</Select>
						<FormHelperText>학원 선택</FormHelperText>
					</FormControl>
				</div>

				<div className="search_classroom_input">
					<input
						type="text"
						name="classroomName_or_teacherName"
						value={searchName}
						onChange={onChangeInputSearchName}
						placeholder="반 이름 또는 선생님 이름 입력"
						// required
					/>
					<button type="submit" autoFocus>
						검색
					</button>
				</div>

				<ul className="classroom_list">
					{classroomList.length !== 0
						? classroomList.map((classroom) => (
								<div
									key={classroom.id}
									className="classroom_list_item"
								>
									<AlertDialog
										classroomId={classroom.id}
										classroomName={classroom.name}
									/>
								</div>
						  ))
						: ""}
				</ul>
			</form>
		);
	}
);

export default SearchClassroomList;
