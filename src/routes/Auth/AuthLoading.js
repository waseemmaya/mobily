import React from 'react';
import { isLoggedin } from '../../config/Helpers/AuthFunctions';
import {
    requestCameraPermission,
    requestGalleryPermission,
    checkFirebasePermission
} from '../../config/Helpers/androidPermissions';
import Loader from '../../components/Loader/Loader';
import { ThemeContext } from '../../contexts/ThemeContext';
import AuthTab from './AuthTab';

export default class AuthLoading extends React.Component {
    render() {
        let colorContext = this.context;
        let { color } = colorContext;
        return <Loader color={color} />;
    }

    componentDidMount = async () => {
        let camPerm = await requestGalleryPermission();
        let camPerm2 = await requestCameraPermission();
        let messagePermision = await checkFirebasePermission();
        let { navigate } = this.props.navigation;

        const res = await isLoggedin();
        console.log('isLoggedin ---> : ', res);

        navigate(res ? 'Home' : 'Auth');
    };
}

AuthLoading.contextType = ThemeContext;
