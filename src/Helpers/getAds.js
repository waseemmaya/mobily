import axios from 'axios';

export const getLatestAds = async () => {
    let adsAPI = 'https://mobily-pk.herokuapp.com/ads';
    let data = await axios.get(adsAPI);
    let { ads, lastId } = data.data;
    let res = {
        ads,
        lastId
    };
    return res;
};

// const API = 'http://10.0.2.2:3001';

export const getTotalAds = async () => {
    let adsAPI = 'https://mobily-pk.herokuapp.com/ads/adscount';
    let data = await axios.get(adsAPI);
    let { adsLength } = data.data;
    return adsLength;
};

export const fetchMoreAds = async (oldLastId) => {
    let moreAdsApi = `http://10.0.2.2:3001/ads/more/${oldLastId}`;

    let data = await axios.get(moreAdsApi);
    let { ads, lastId } = data.data;
    let res = {
        ads,
        lastId
    };
    return res;
    // this.props.addTask(ads);
};

export const searchAds = async (searchQuery) => {
    console.log('searchQuery: ', searchQuery);
    let searchApi = `https://mobily-pk.herokuapp.com/ads/search/${searchQuery}`;

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
