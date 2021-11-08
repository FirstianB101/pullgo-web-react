import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import MenuBar_S from "../components/MenuBar_S";
import MenuBar_T from "../components/MenuBar_T";
import SearchAcademyListContainer from "../container/SearchAcademyListContainer";
import "../styles/ApplyAcademy.css";

const ApplyAcademy = memo(({ history, match }) => {
    const dispatch = useDispatch();
    const onFetchJoinedAcademyList = (userType, userId) => {
        console.log("onFetchJoinedAcademyList()");
        dispatch(apiFetchJoinedAcademyList(userType, userId));
    };

    const userType = useSelector((state) => state.userTypeReducer.userType);
    const studentId = useSelector((state) => state.studentIdReducer.studentId);
    const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);

    useEffect(() => {
        console.log("ApplyAcademy 렌더링");

        if (userType === "student")
            onFetchJoinedAcademyList(userType, studentId);
        else onFetchJoinedAcademyList(userType, teacherId);
    }, []);

    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const isJoinedAcademy = joinedAcademyList.length !== 0;

    const rightMenu = <i className="fas fa-plus fa-lg"></i>;

    return (
        <div className="apply_academy">
            {userType === "student" ? (
                <MenuBar_S
                    centerMenu="학원 가입요청"
                    isJoinedAcademy={isJoinedAcademy}
                    history={history}
                />
            ) : (
                <MenuBar_T
                    centerMenu="학원 가입요청"
                    rightMenu={rightMenu}
                    isJoinedAcademy={isJoinedAcademy}
                    history={history}
                    match={match}
                />
            )}
            <SearchAcademyListContainer />
        </div>
    );
});

export default ApplyAcademy;
