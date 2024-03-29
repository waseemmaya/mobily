import axios from 'axios';
import API from '../API/API';
import { getUserID } from './AuthFunctions';

let warn = console.warn();

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
    let data = await axios.get(url);
    let { ads, lastId } = data.data;
    let res = {
        ads,
        lastId
    };
    return res;
    // this.props.addTask(ads);
};

export const getTotalAds = () => {
    return axios.get(`${API}ads/adscount`);
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
    let resObj = {};

    try {
        let res = await axios.get(`${API}ads/search?query=${searchQuery}&lastId=${oldLastId}`);
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

export const getFavtAds = async () => {
    let userId = await getUserID();

    return await axios.get(`${API}ads/getfavtads?userId=${userId}`);
};
