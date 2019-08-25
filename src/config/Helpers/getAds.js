import axios from 'axios';
import API from '../API/API';

// const LocalAPI = 'http://10.0.2.2:3001/';
// const CloudAPI = `https://mobily-pk.herokuapp.com/`;

export const getLatestAds = async (no) => {
    let count = no ? no : 30;
    let latestAds = await axios.get(`${API}ads?count=${count}`);
    let { ads, lastId } = latestAds.data;
    let res = {
        ads,
        lastId
    };
    return res;
};

export const fetchMoreAds = async (oldLastId) => {
    let data = await axios.get(`${API}Id=${oldLastId}`);
    let { ads, lastId } = data.data;
    let res = {
        ads,
        lastId
    };
    return res;
    // this.props.addTask(ads);
};

export const getTotalAds = async () => {
    let data = await axios.get(`${API}ads/adscount`);
    let { adsLength } = data.data;
    return adsLength;
};

export const searchAds = async (searchQuery) => {
    console.log('in');
    let resObj = {};
    try {
        let res = await axios.get(`${API}ads/search?query=${searchQuery}`);
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
    try {
        let data = await axios.get(`${API}ads/search?query=${searchQuery}&lastId=${oldLastId}`);
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
