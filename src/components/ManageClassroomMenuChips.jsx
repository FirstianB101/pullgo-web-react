import React, { memo } from "react";
import qs from "qs";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PersonIcon from "@mui/icons-material/Person";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import WindowIcon from "@mui/icons-material/Window";

const ManageClassroomMenuChips = memo(
    ({ currentChipLabel, history, location }) => {
        const query = qs.parse(location.search, {
            ignoreQueryPrefix: true
        });

        const chipLabels = [
            "시험 관리",
            "학생 관리",
            "요청 관리",
            "반 수정 및 삭제"
        ];

        const onClickChip = (i, e) => {
            if (currentChipLabel === chipLabels[i]) return;

            // console.log(e.target.parentNode);
            // console.log(e.target.parentNode.parentNode);
            // console.log(e.target.innerText);

            switch (chipLabels[i]) {
                case chipLabels[0]:
                    console.log("시험 관리 페이지로 이동");
                    history.push(
                        `/teacher/manage_exam/classroom?id=${query.id}`
                    );
                    break;
                case chipLabels[1]:
                    console.log("학생 관리 페이지로 이동");
                    history.push(
                        `/teacher/manage_student/classroom?id=${query.id}`
                    );
                    break;
                case chipLabels[2]:
                    console.log("요청 관리 페이지로 이동");
                    history.push(
                        `/teacher/manage_classroom_apply/classroom?id=${query.id}`
                    );
                    break;
                case chipLabels[3]:
                    console.log("반 수정 및 삭제 페이지로 이동");
                    history.push(
                        `/teacher/edit_delete_classroom/classroom?id=${query.id}`
                    );
                    break;
            }
        };

        const propsChipVariant = (i) => {
            if (currentChipLabel === chipLabels[i]) return "filled";
            else return "outlined";
        };

        return (
            <div className="manage_classroom_menu_chips">
                <Stack direction="row" spacing={2}>
                    <Chip
                        label={chipLabels[0]}
                        icon={<BorderColorIcon />}
                        onClick={(e) => onClickChip(0, e)}
                        color="primary"
                        variant={propsChipVariant(0)}
                        // component="a"
                        // href="www.naver.com"
                        // clickable
                    />
                    <Chip
                        label={chipLabels[1]}
                        icon={<PersonIcon />}
                        onClick={(e) => onClickChip(1, e)}
                        color="primary"
                        variant={propsChipVariant(1)}
                        // color="secondary"
                        // component="a"
                        // href=""
                        // clickable
                    />
                    <Chip
                        label={chipLabels[2]}
                        icon={<HowToRegIcon />}
                        onClick={(e) => onClickChip(2, e)}
                        color="primary"
                        variant={propsChipVariant(2)}
                        // color="info"
                        // component="a"
                        // href=""
                        // clickable
                    />
                    <Chip
                        label={chipLabels[3]}
                        icon={<WindowIcon />}
                        onClick={(e) => onClickChip(3, e)}
                        color="primary"
                        variant={propsChipVariant(3)}
                        // color="error"
                        // component="a"
                        // href=""
                        // clickable
                    />
                </Stack>
            </div>
        );
    }
);

export default ManageClassroomMenuChips;
