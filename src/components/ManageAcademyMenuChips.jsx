import React, { useState, memo } from "react";
import { useSelector } from "react-redux";
import qs from "qs";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PersonIcon from "@mui/icons-material/Person";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import WindowIcon from "@mui/icons-material/Window";

import "../styles/ManageAcademyMenuChips.css";

const ManageAcademyMenuChips = memo(
    ({ currentChipLabel, hasPermission, history, location }) => {
        const query = qs.parse(location.search, {
            ignoreQueryPrefix: true
        });
        const [academyId, setAcademyId] = useState(query.id);

        const chipLabels = [
            "요청 관리",
            "구성원 관리",
            "권한 위임",
            "학원 수정 및 삭제"
        ];

        const onClickChip = (i, e) => {
            if (currentChipLabel === chipLabels[i]) return;

            switch (chipLabels[i]) {
                case chipLabels[0]:
                    history.push(
                        `/teacher/manage_academy_apply/academy?id=${academyId}`
                    );
                    break;
                case chipLabels[1]:
                    if (!hasPermission) {
                        alert("학원의 원장 선생님만 사용 가능한 기능 입니다.");
                        return;
                    }
                    history.push(
                        `/teacher/manage_academy_members/academy?id=${academyId}`
                    );
                    break;
                case chipLabels[2]:
                    if (!hasPermission) {
                        alert("학원의 원장 선생님만 사용 가능한 기능 입니다.");
                        return;
                    }
                    // history.push();
                    break;
                case chipLabels[3]:
                    if (!hasPermission) {
                        alert("학원의 원장 선생님만 사용 가능한 기능 입니다.");
                        return;
                    }
                    history.push(
                        `/teacher/edit_delete_academy/academy?id=${academyId}`
                    );
                    break;
            }
        };

        const propsChipVariant = (i) => {
            if (currentChipLabel === chipLabels[i]) return "filled";
            else return "outlined";
        };

        return (
            <div className="manage_academy_menu_chips">
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

export default ManageAcademyMenuChips;
