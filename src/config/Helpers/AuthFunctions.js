import { AsyncStorage } from 'react-native';
import axios from 'axios';
import API from '../API/API';

export const USER_TOKEN = 'UserAuthToken';

export const onSignup = async (signupObj) => {
    try {
        let res = await axios({
            method: 'post',
            url: `${API}/register`,
            data: {
                signupObj: signupObj
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status === 200) {
            await AsyncStorage.setItem(USER_TOKEN, res.data._id);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export const onLogin = async (email, password) => {
    let loginObj = {
        email,
        password
    };
    try {
        let res = await axios({
            method: 'post',
            url: `${API}/login`,
            data: {
                loginObj: loginObj
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 200) {
            await AsyncStorage.setItem(USER_TOKEN, res.data._id);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export const onLogout = async () => {
    const logoutRes = await AsyncStorage.removeItem(USER_TOKEN);
    // console.log('logoutRes: ', logoutRes);
    // return log
};

export const isLoggedin = async () => {
    let userToken = await AsyncStorage.getItem(USER_TOKEN);
    // console.log('userToken: ', userToken);
    return userToken !== null ? true : false;
};
