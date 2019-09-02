import React from 'react';
import { StatusBar, View } from 'react-native';
import { Spinner } from 'native-base';
// import firebase from 'react-native-firebase';
import { isLoggedin } from '../../config/Helpers/AuthFunctions';
import { primaryColor } from '../../config/Constants/Colors';
import {
    requestCameraPermission,
    requestGalleryPermission,
    checkFirebasePermission
} from '../../config/Helpers/androidPermissions';
import Loader from '../../components/Loader/Loader';
import {} from '../../config/Helpers/androidPermissions';

export default class AuthLoading extends React.Component {
    render() {
        return <Loader color={primaryColor} />;
    }

    componentDidMount = async () => {
        let camPerm = await requestGalleryPermission();
        let camPerm2 = await requestCameraPermission();
        let messagePermision = await checkFirebasePermission();
        console.warn('messagePermision: ', messagePermision);

        this.props.navigation.navigate('Home');
        // this.props.navigation.navigate(res ? 'Home' : 'Login');
        const res = await isLoggedin();

        // if (res) {

        // }

        //   console.log('firebase: ', firebase);
        //   firebase
        //     .auth()
        //     .signInAnonymously()
        //     .then(user => {
        //       console.log('Firebase user: ', user);
        //     })
        //     .catch(err => {
        //       console.log('err: ', err);
        //     });
        // };
    };
}
