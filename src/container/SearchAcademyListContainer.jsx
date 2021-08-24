import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiFetchAcademyListByAcademyName } from "../redux/fetchAcademyListByAcademyName";
import SearchAcademyList from "../components/SearchAcademyList";

/* SearchAcademyList 컴포넌트(Presenter)를 관리하는 Container */
const SearchAcademyListContainer = memo(() => {
	const academyList = useSelector(
		(state) => state.fetchAcademyListByAcademyNameReducer.academyList
	);

	const dispatch = useDispatch();

	const onFetchAcademyListByAcademyName = (academyName) => {
		console.log("onFetchAcademyListByAcademyName()");
		dispatch(apiFetchAcademyListByAcademyName(academyName));
	};

	return (
		<SearchAcademyList
			academyList={academyList}
			onFetchAcademyListByAcademyName={onFetchAcademyListByAcademyName}
		/>
	);
});

export default SearchAcademyListContainer;
