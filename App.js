import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Root, Toast } from 'native-base';
import Navigator from './src/Navigator';
import AdContext from './src/contexts/AdContext';
import { getLatestAds, fetchMoreAds, searchAds, getTotalAds, searchMoreAds } from './src/config/Helpers/getAds';

function App(props) {
    const [ adsArr, setadsArr ] = useState([]);
    const [ lastId, setlastId ] = useState('');
    const [ noResult, setnoResult ] = useState(false);
    const [ isFetching, setisFetching ] = useState(false);
    const [ searchQuery, setsearchQuery ] = useState('');
    const [ totalQueryAds, settotalQueryAds ] = useState(0);
    const [ noResultMessage, setnoResultMessage ] = useState('');
    const [ searchLastId, setsearchLastId ] = useState('');
    const [ refreshing, setrefreshing ] = useState(false);
    const [ searchEnabled, setsearchEnabled ] = useState(false);
    const [ totalAds, settotalAds ] = useState(0);

    cancelSearch = () => {
        setlastId('');
        setsearchQuery('');
        setnoResult(false);
        settotalQueryAds(0);
        setsearchLastId('');
        latestFetch(100);
    };

    enableSearch = () => {
        setsearchEnabled(true);
    };

    disableSearch = () => {
        setsearchEnabled(false);
    };

    handleSearchQuery = (e) => {
        setsearchQuery(e);
    };

    search = async () => {
        console.log('initial search ------->');
        if (!searchQuery) {
            Toast.show({
                text: 'Please enter something!',
                buttonText: 'Okay',
                duration: 2000,
                type: 'danger'
            });
            return;
        }
        setisFetching(true);
        let res = await searchAds(searchQuery);

        if (res.status !== 200) {
            Toast.show({
                text: 'No result found!',
                buttonText: 'Okay',
                duration: 2000,
                type: 'danger'
            });
            setisFetching(false);
            setnoResult(true);
            setnoResultMessage(`No ad found containing "${searchQuery}"`);
            return;
        }
        setadsArr([]);
        settotalQueryAds(res.totalQueryAds);
        setadsArr(res.ads);
        setsearchLastId(res.lastId);
        setlastId('');
        setisFetching(false);
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

    searchMore = async () => {
        let cloneAds = [ ...adsArr ];
        setisFetching(true);
        let res = await searchMoreAds(searchQuery, searchLastId);

        if (res.status !== 200) {
            Toast.show({
                text: `No more ${searchQuery} ads found!`,
                buttonText: 'Okay',
                duration: 2000,
                type: 'danger'
            });
            setisFetching(false);
            return;
        }

        let newArr = cloneAds.concat(res.ads);
        setadsArr(newArr);
        setsearchLastId(res.lastId);
        setisFetching(false);
    };

    latestFetch = async (n) => {
        setadsArr([]);
        setlastId('');
        setrefreshing(true);
        setsearchQuery('');
        let count = n ? n : 66;
        try {
            let latestAds = await getLatestAds(count);
            setadsArr(latestAds.ads);
            setlastId(latestAds.lastId);
            setrefreshing(false);
        } catch (error) {
            console.log('error: ', error);
            setnoResult(true);
            setrefreshing(false);
        }
    };

    getTotalAdsFromDB = async () => {
        let totalAds = await getTotalAds();
        settotalAds(totalAds);
    };

    useEffect(() => {
        getTotalAdsFromDB();
        latestFetch();
    }, []);

    let adState = {
        adsArr: adsArr,
        totalAds: totalAds,
        lastId: lastId,
        searchLastId: searchLastId,
        isFetching: isFetching,
        searchQuery: searchQuery,
        totalQueryAds: totalQueryAds,
        noResult: noResult,
        latestFetch: latestFetch,
        fetchMore: fetchMore,
        search: search,
        cancelSearch: cancelSearch,
        handleSearchQuery: handleSearchQuery,
        totalQueryAds: totalQueryAds,
        noResultMessage: noResultMessage,
        refreshing: refreshing,
        searchMore: searchMore,
        searchEnabled: searchEnabled,
        enableSearch: enableSearch,
        disableSearch: disableSearch
    };
    console.warn('searchEnabled: ', searchEnabled);

    return (
        <View style={{ flex: 1 }}>
            <Root>
                <AdContext.Provider value={adState}>
                    <Navigator />
                </AdContext.Provider>
            </Root>
        </View>
    );
}

export default App;
