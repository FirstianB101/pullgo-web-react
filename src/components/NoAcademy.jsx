import React, { useState, memo } from "react";
import { useSelector } from "react-redux";
import MenuBar_S from "../components/MenuBar_S";
import MenuBar_T from "./MenuBar_T";

import CreateAcademyDialog from "./CreateAcademyDialog";
import "../styles/NoAcademy.css";

const NoAcademy = memo(({ history, match }) => {
    const [createAcademyDialogOpen, setCreateAcademyDialogOpen] =
        useState(false);

    const userType = useSelector((state) => state.userTypeReducer.userType);
    const studentInfo = useSelector(
        (state) => state.studentInfoReducer.studentInfo
    );
    const teacherInfo = useSelector(
        (state) => state.teacherInfoReducer.teacherInfo
    );

    const fullName =
        userType === "student"
            ? studentInfo.account?.fullName
            : teacherInfo.account?.fullName;

    const onClickBtnCreateAcademy = (e) => {
        setCreateAcademyDialogOpen(true);
    };

    return (
        <div className="no_academy">
            {userType === "student" ? (
                <>
                    <MenuBar_S isJoinedAcademy={false} history={history} />
                    <div className="no_academy_content">
                        <h3>
                            {fullName} 님,
                            <br />
                            안녕하세요!
                        </h3>

                        <div>
                            <h1>가입된 학원이 없습니다.</h1>
                            <button
                                onClick={() =>
                                    history.push(`/${userType}/apply_academy`)
                                }
                            >
                                학원 가입하기
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <MenuBar_T
                        isJoinedAcademy={false}
                        history={history}
                        match={match}
                    />
                    <div className="no_academy_content">
                        <h3>
                            {fullName} 님,
                            <br />
                            안녕하세요!
                        </h3>

                        <div>
                            <h1>가입된 학원이 없습니다.</h1>
                            <button
                                onClick={() =>
                                    history.push(`/${userType}/apply_academy`)
                                }
                            >
                                학원 가입하기
                            </button>
                            <button onClick={onClickBtnCreateAcademy}>
                                학원 개설하기
                            </button>
                        </div>
                    </div>

                    {/* 자식 컴포넌트에게 props로 함수 전달하여 자식이 부모의 state 변경 */}
                    <CreateAcademyDialog
                        createAcademyDialogOpen={createAcademyDialogOpen}
                        setCreateAcademyDialogOpen={setCreateAcademyDialogOpen}
                        match={match}
                    />
                </>
            )}
        </div>
    );
});

export default NoAcademy;
