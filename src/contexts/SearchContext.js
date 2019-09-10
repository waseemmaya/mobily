import React, { createContext, useState, useEffect } from 'react';

let initialSearchState = {
    searchArr: [],
    searchLastId: '',
    searchQuery: '',
    totalQueryAds: 0,
    noResult: false,
    isFetching: false,
    refreshing: false,
    noResultMessage: '',
    searchEnabled: false
};

export const SearchContext = createContext(initialSearchState);

function SearchContextWrapper(props) {
    let searchState = {
        searchArr: [],
        searchLastId: '',
        searchQuery: '',
        totalQueryAds: 0,
        noResult: false,
        isFetching: false,
        refreshing: false,
        noResultMessage: '',
        searchEnabled: false
    };
    return <SearchContext.Provider value={searchState}>{props.children}</SearchContext.Provider>;
}

export default SearchContextWrapper;
