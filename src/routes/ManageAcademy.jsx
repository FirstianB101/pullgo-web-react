import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchJoinedAcademyList } from "../redux/fetchJoinedAcademyList";
import MenuBar_T from "../components/MenuBar_T";
import AcademyInfo from "./AcademyInfo";
import ManageAcademyList from "../components/ManageAcademyList";

import "../styles/ManageAcademy.css";

const ManageAcademy = ({ history, match }) => {
    const dispatch = useDispatch();
    const onFetchJoinedAcademyList = (userType, userId) => {
        console.log("onFetchJoinedAcademyList()");
        dispatch(apiFetchJoinedAcademyList(userType, userId));
    };

    const userType = useSelector((state) => state.userTypeReducer.userType);
    const teacherId = useSelector((state) => state.teacherIdReducer.teacherId);

    useEffect(() => {
        console.log("ManageAcademy 렌더링");
        onFetchJoinedAcademyList(userType, teacherId);
    }, []);

    const joinedAcademyList = useSelector(
        (state) => state.joinedAcademyListReducer.joinedAcademyList
    );
    const isJoinedAcademy = joinedAcademyList.length !== 0;

    const rightMenu = <i className="fas fa-plus fa-lg"></i>;

    return (
        <div className="manage_academy">
            <MenuBar_T
                centerMenu="학원 관리"
                rightMenu={rightMenu}
                isJoinedAcademy={isJoinedAcademy}
                history={history}
                match={match}
            />

            {isJoinedAcademy ?
                <div className="wrapper__div__manage_academy_list">
                    <ManageAcademyList
                        joinedAcademyList={joinedAcademyList}
                        history={history}
                    />
                </div>
                :
                <AcademyInfo history={history} />
            }
        </div>
    );
};

export default ManageAcademy;
