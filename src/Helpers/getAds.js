import axios from 'axios';

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

// const API = 'http://10.0.2.2:3001';

export const fetchMoreAds = async (oldLastId) => {
    let moreAdsApi = `https://mobily-pk.herokuapp.com/ads?lastId=${oldLastId}`;

    let data = await axios.get(moreAdsApi);
    console.log('data: ', data);
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
    console.log('searchQuery: ', searchQuery);
    // let searchApi = `https://mobily-pk.herokuapp.com/ads/search/${searchQuery}`;
    let searchApi = `https://mobily-pk.herokuapp.com/ads/search?query=${searchQuery}`;

    try {
        let data = await axios.get(searchApi);
        // console.log('data: ', data);
        // if (!data.ads) {
        //     let err = {
        //         message: data.data.message
        //     };
        //     return err;
        // }
        let { ads, lastId } = data.data;
        let res = {
            ads,
            lastId
        };
        return res;
    } catch (error) {
        console.log('error: ', error);
    }
};

export const searchMoreAds = async (searchQuery, oldLastId) => {
    let searchApi = `https://mobily-pk.herokuapp.com/ads/search?query=${searchQuery}&lastId=${oldLastId}`;
    let data = await axios.get(searchApi);
    console.log('searchMore: ', data);
    let { ads, lastId } = data.data;
    let res = {
        ads,
        lastId
    };
    return res;
    // this.props.addTask(ads);
};
