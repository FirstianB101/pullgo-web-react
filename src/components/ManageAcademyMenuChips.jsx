import React, { memo } from "react";
import qs from "qs";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PersonIcon from "@mui/icons-material/Person";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import WindowIcon from "@mui/icons-material/Window";

const ManageAcademyMenuChips = memo(
    ({ currentChipLabel, history, location }) => {
        const query = qs.parse(location.search, {
            ignoreQueryPrefix: true
        });

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
                    console.log("요청 관리 페이지로 이동");
                    history.push(
                        `/teacher/manage_academy_apply/academy?id=${query.id}`
                    );
                    break;
                case chipLabels[1]:
                    console.log("구성원 관리 페이지로 이동");
                    alert("학원의 원장 선생님만 사용 가능한 기능 입니다.");
                    history.push(
                        `/teacher/manage_users/academy?id=${query.id}`
                    );
                    break;
                case chipLabels[2]:
                    console.log("권한 위임 페이지로 이동");
                    alert("학원의 원장 선생님만 사용 가능한 기능 입니다.");
                    break;
                case chipLabels[3]:
                    console.log("학원 수정 및 삭제 페이지로 이동");
                    alert("학원의 원장 선생님만 사용 가능한 기능 입니다.");
                    history.push(
                        `/teacher/edit_delete_academy/academy?id=${query.id}`
                    );
                    break;
            }
        };

        const propsChipVariant = (i) => {
            if (currentChipLabel === chipLabels[i]) return "filled";
            else return "outlined";
        };

        return (
            <div className="manage_Academy_menu_chips">
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
