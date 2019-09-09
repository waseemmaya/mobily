import { AsyncStorage } from 'react-native';
import axios from 'axios';
import API from '../API/API';

export const USER_TOKEN = 'UserAuthToken';
export const USER_ID = 'UserID';

export const onSignup = async (signupObj) => {
    return await axios({
        method: 'post',
        url: `${API}register`,
        data: {
            signupObj: signupObj
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const onLogin = (email, password) => {
    return axios({
        method: 'post',
        url: `${API}login`,
        data: {
            loginObj: {
                email,
                password
            }
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const onLogout = async () => {
    try {
        const logoutRes = await AsyncStorage.removeItem(USER_TOKEN);
        const logoutRes2 = await AsyncStorage.removeItem(USER_ID);
        console.log('logoutRes: ', logoutRes);
        console.log('logoutRes2: ', logoutRes2);
        return true;
    } catch (error) {
        console.log('error: ', error);
        return false;
    }
};

export const isLoggedin = async () => {
    let userToken = await AsyncStorage.getItem(USER_TOKEN);
    let userID = await AsyncStorage.getItem(USER_ID);
    return userToken !== null ? true : false;
};

export const getUserID = async () => {
    let userID = await AsyncStorage.getItem(USER_ID);
    return userID;
};

export const getCurrentUser = async () => {
    try {
        let userId = await getUserID();
        let res = await axios({
            method: 'post',
            url: `${API}currentuser`,
            data: {
                userId: userId
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return res.data;
    } catch (error) {
        console.warn('error: ', error);
        return error;
    }
};
