import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import SearchClassroomList from '../components/SearchClassroomList';

/* SearchClassroomList 컴포넌트(Presenter)를 관리하는 Container */
const SearchClassroomListContainer = () => {
    const classroomList = useSelector();

    const dispatch = useDispatch();

    return <SearchClassroomList />;
}

export default SearchClassroomListContainer;