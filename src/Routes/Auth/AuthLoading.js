import React from 'react';
import { StatusBar, View } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import firebase from 'react-native-firebase';
import { isLoggedin } from '../../Helpers/AuthFunctions';
import { primaryColor } from '../../Constants/Colors';
import {
  requestCameraPermission,
  requestGalleryPermission,
} from '../../Helpers/androidPermissions';

export default class AuthLoading extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: primaryColor,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {/* <StatusBar hidden backgroundColor={primaryColor} barStyle="light-content" /> */}
        <StatusBar hidden />
        <DotIndicator color="white" size={10} />
      </View>
    );
  }

  componentDidMount = async () => {
    let camPerm = await requestGalleryPermission();
    let camPerm2 = await requestCameraPermission();
    console.log('camPerm2: ', camPerm2);
    console.log('camPerm: ', camPerm);

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
