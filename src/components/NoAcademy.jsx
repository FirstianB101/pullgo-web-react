import React, { useState, memo } from "react";
import { useSelector } from "react-redux";
import MenuBar_S from "../components/MenuBar_S";
import MenuBar_T from "./MenuBar_T";

import "../styles/NoAcademy.css";

const NoAcademy = memo(({ history, match }) => {
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

                            {userType === "teacher" ? (
                                <button
                                    onClick={() =>
                                        history.push("/teacher/create_academy")
                                    }
                                >
                                    학원 개설하기
                                </button>
                            ) : null}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
});

export default NoAcademy;
