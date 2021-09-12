import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchClassroomListByAcademyIdAndName } from "../redux/fetchClassroomListByAcademyIdAndName";
import SearchClassroomList from "../components/SearchClassroomList";

/* SearchClassroomList 컴포넌트(Presenter)를 관리하는 Container */
const SearchClassroomListContainer = memo(() => {
	const dispatch = useDispatch();
	const classroomList = useSelector(
		(state) => state.classroomListByAcademyIdAndNameReducer.classroomList
	);

	const onFetchClassroomListByAcademyIdAndName = (academyId, name) => {
		console.log("onFetchClassroomListByAcademyIdAndName()");
		dispatch(apiFetchClassroomListByAcademyIdAndName(academyId, name));
	};

	return (
		<SearchClassroomList
			classroomList={classroomList}
			onFetchClassroomListByAcademyIdAndName={
				onFetchClassroomListByAcademyIdAndName
			}
		/>
	);
});

export default SearchClassroomListContainer;
