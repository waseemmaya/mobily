import React, { createContext } from 'react';

let adState = {
    adsArr: [],
    totalAds: 0,
    lastId: '',
    searchLastId: '',
    searchQuery: '',
    totalQueryAds: 0,
    noResult: false,
    isFetching: false,
    refreshing: false,
    noResultMessage: '',
    searchEnabled: false
};

const AdContext = createContext(adState);

export const withAds = (Component) => (...props) => {
    return (
        <AdContext.Consumer>
            {(adState) => {
                return <Component adState={adState} {...props} />;
            }}
        </AdContext.Consumer>
    );
};

export default AdContext;
