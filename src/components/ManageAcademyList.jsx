import React, { memo } from "react";

const ManageAcademyList = ({ joinedAcademyList, history }) => {
    const showAcademyListItems = () => {
        const listItems = [];

        for (let i = 0; i < joinedAcademyList.length; i++) {
            const element = (
                <div className="div__academy_list_menu">
                    <li
                        key={joinedAcademyList[i].id}
                        onClick={() =>
                            history.push(
                                `/teacher/manage_academy_apply/academy?id=${joinedAcademyList[i].id}`
                            )
                        }
                    >
                        <span className="academy_name">
                            {joinedAcademyList[i].name} 학원
                        </span>
                        <span className="academy_address">
                            {joinedAcademyList[i].address}
                        </span>
                    </li>
                </div>
            );

            listItems.push(element);
        }

        return listItems;
    };

    return (
        <div className="manage_academy_list">
            <ul className="ul__academy_list">{showAcademyListItems()}</ul>
        </div>
    );
};

export default ManageAcademyList;
