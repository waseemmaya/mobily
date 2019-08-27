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
    let url = `${API}ads?lastId=${oldLastId}`;
    console.log('url: ', url);
    let data = await axios.get(url);
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
        (resObj.ads = data.ads), (resObj.lastId = data.lastId), (resObj.totalQueryAds = data.totalQueryAds);
    } catch (error) {
        resObj.status = 404;
        console.log('error: ---->', error);
    }

    return resObj;
};

export const searchMoreAds = async (searchQuery, oldLastId) => {
    console.log('oldLastId: ', oldLastId);
    let resObj = {};

    try {
        let res = await axios.get(`${API}ads/search?query=${searchQuery}&lastId=${oldLastId}`);
        console.log('res: ', res);
        let { status, data } = res;
        resObj.status = status;
        (resObj.ads = data.ads), (resObj.lastId = data.lastId);
    } catch (err) {
        resObj.status = 404;
        console.log('err: ----> ', err);
        console.log('err:  --->', err.message);
    }
    // this.props.addTask(ads);
    return resObj;
};

export const viewIncrement = async (id) => {
    try {
        let response = await axios.get(`${API}ads?id=${id}`);
        return response;
    } catch (error) {
        console.log('error: ', error);
        return error;
    }
};
