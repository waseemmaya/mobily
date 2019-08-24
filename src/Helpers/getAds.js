import axios from 'axios';
// const API = 'http://10.0.2.2:3001';
// let url = `https://mobily-pk.herokuapp.com/ads?id=${_id}`;

export const getLatestAds = async (no) => {
    let count = no ? no : 30;
    let adsAPI = `https://mobily-pk.herokuapp.com/ads?count=${count}`;
    let data = await axios.get(adsAPI);
    let { ads, lastId } = data.data;
    let res = {
        ads,
        lastId
    };
    return res;
};

export const fetchMoreAds = async (oldLastId) => {
    let moreAdsApi = `https://mobily-pk.herokuapp.com/ads?lastId=${oldLastId}`;

    let data = await axios.get(moreAdsApi);
    let { ads, lastId } = data.data;
    let res = {
        ads,
        lastId
    };
    return res;
    // this.props.addTask(ads);
};

export const getTotalAds = async () => {
    let adsAPI = 'https://mobily-pk.herokuapp.com/ads/adscount';
    let data = await axios.get(adsAPI);
    let { adsLength } = data.data;
    return adsLength;
};

export const searchAds = async (searchQuery) => {
    console.log('in');
    // let searchApi = `https://mobily-pk.herokuapp.com/ads/search/${searchQuery}`;
    let searchApi = `https://mobily-pk.herokuapp.com/ads/search?query=${searchQuery}`;
    let resObj = {};
    try {
        let res = await axios.get(searchApi);
        const { status, data } = res;
        resObj.status = status;
        (resObj.ads = data.ads), (resObj.lastId = data.lastId);
    } catch (error) {
        resObj.status = 404;
        console.log('error: ---->', error);
    }

    console.log('resObj: ', resObj);
    return resObj;
};

export const searchMoreAds = async (searchQuery, oldLastId) => {
    console.log('searchQuery: ', searchQuery);
    console.log('in');
    let searchApi = `https://mobily-pk.herokuapp.com/ads/search?query=${searchQuery}&lastId=${oldLastId}`;
    try {
        let data = await axios.get(searchApi);
        let { ads, lastId } = data.data;
        let res = {
            ads,
            lastId
        };
        return res;
    } catch (err) {
        console.log('err: ----> ', err);
        console.log('err:  --->', err.message);
    }
    // this.props.addTask(ads);
};
