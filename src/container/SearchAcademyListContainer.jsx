import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchAcademyList } from "../redux/fetchAcademyList";
import SearchAcademyList from "../components/SearchAcademyList";

/* SearchAcademyList 컴포넌트(Presenter)를 관리하는 Container */
const SearchAcademyListContainer = memo(() => {
	const academyList = useSelector(
		(state) => state.fetchAcademyListReducer.academyList
	);

	const dispatch = useDispatch();

	const onFetchAcademyList = (academyName) => {
		console.log("onFetchAcademyList()");
		dispatch(apiFetchAcademyList(academyName));
	};

	return (
		<SearchAcademyList
			academyList={academyList}
			onFetchAcademyList={onFetchAcademyList}
		/>
	);
});

export default SearchAcademyListContainer;
