import React, { useState, useEffect, useContext } from 'react';
import { View, StatusBar, AsyncStorage } from 'react-native';

import { Root, Toast } from 'native-base';
import Navigator from './src/Navigator';
import AdContext from './src/contexts/AdContext';
import { getLatestAds, fetchMoreAds, searchAds, getTotalAds, searchMoreAds } from './src/config/Helpers/getAds';
import firebase from 'react-native-firebase';
import { getUserID } from './src/config/Helpers/AuthFunctions';
import { getCurrentUser } from './src/config/Helpers/AuthFunctions';
import { ThemeContext } from './src/contexts/ThemeContext';

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
    const [ userID, setuserID ] = useState(null);
    const [ user, setuser ] = useState(null);

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
        setadsArr([]);
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
        let count = n ? n : 20;
        try {
            let latestAds = await getLatestAds(count);
            setadsArr(latestAds.ads);
            setlastId(latestAds.lastId);
            setrefreshing(false);
        } catch (error) {
            console.warn('error: ', error);
            setnoResult(true);
            setrefreshing(false);
        }
    };

    getTotalAdsFromDB = async () => {
        let totalAds = await getTotalAds();
        settotalAds(totalAds);
    };

    getUserIDFromLocal = async () => {
        let id = await getUserID();
        console.warn('id in app.js --->: ', id);
        setuserID(id);
    };

    getToken = async () => {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        // console.warn('before fcmToken: ', fcmToken);
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                console.warn('after fcmToken: ', fcmToken);
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    };

    getUser = async () => {
        console.warn('281');
        let user = await getCurrentUser();
        setuser(user);
    };

    useEffect(() => {
        getTotalAdsFromDB();
        latestFetch();
        getUser();
        getToken();
    }, []);

    let adState = {
        userID: userID,
        user: user,
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
        disableSearch: disableSearch,
        getUser: getUser
    };

    const themeContext = useContext(ThemeContext);
    const { color } = themeContext;

    return (
        <View style={{ flex: 1 }}>
            <Root>
                <AdContext.Provider value={adState}>
                    <StatusBar hidden={false} animated={true} backgroundColor={color} barStyle='dark-content' />
                    <Navigator />
                </AdContext.Provider>
            </Root>
        </View>
    );
}

export default App;
