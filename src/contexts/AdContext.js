import React, { createContext, useState, useEffect } from 'react';
import { getLatestAds, fetchMoreAds, getTotalAds } from '../config/Helpers/getAds';
import { getCurrentUser } from '../config/Helpers/AuthFunctions';

let adState = {
    adsArr: [],
    totalAds: 0,
    lastId: '',
    isFetching: false,
    refreshing: false
};

export const AdContext = createContext(adState);

function AdContextWrapper(props) {
    const [ adsArr, setadsArr ] = useState([]);
    const [ lastId, setlastId ] = useState('');
    const [ isFetching, setisFetching ] = useState(false);
    const [ refreshing, setrefreshing ] = useState(false);
    const [ totalAds, settotalAds ] = useState(0);
    const [ user, setuser ] = useState(null);

    getTotalAdsFromDB = async () => {
        let totalAds = await getTotalAds();
        let { adsLength } = totalAds.data;
        settotalAds(adsLength);
    };

    latestFetch = async (n) => {
        setlastId('');
        setrefreshing(true);
        let count = n ? n : 20;
        try {
            let latestAds = await getLatestAds(count);
            setadsArr([]);
            setadsArr(latestAds.ads);
            setlastId(latestAds.lastId);
            setrefreshing(false);
        } catch (error) {
            setrefreshing(false);
        }
    };

    fetchMore = async () => {
        let cloneAds = [ ...adsArr ];
        setisFetching(true);
        let moreAds = await fetchMoreAds(lastId);
        let updatedArr = cloneAds.concat(moreAds.ads);
        setadsArr(updatedArr);
        setlastId(moreAds.lastId);
        setisFetching(false);
    };

    getUser = async () => {
        let user = await getCurrentUser();
        setuser(user);
    };

    useEffect(() => {
        getTotalAdsFromDB();
        latestFetch();
        getUser();
    }, []);

    let adState = {
        user: user,
        adsArr: adsArr,
        totalAds: totalAds,
        lastId: lastId,
        isFetching: isFetching,
        latestFetch: latestFetch,
        fetchMore: fetchMore,
        refreshing: refreshing,
        getUser: getUser
    };

    return <AdContext.Provider value={adState}>{props.children}</AdContext.Provider>;
}

export default AdContextWrapper;
