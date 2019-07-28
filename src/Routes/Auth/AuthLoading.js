import React from 'react';
import { StatusBar, View } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import firebase from 'react-native-firebase';
import { isLoggedin } from '../../Helpers/AuthFunctions';
import { primaryColor } from '../../Constants/Colors';

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
    const res = await isLoggedin();

    console.log('firebase: ', firebase);
    firebase
      .auth()
      .signInAnonymously()
      .then(user => {
        console.log('Firebase user: ', user);
        this.props.navigation.navigate(res ? 'Home' : 'Login');
      })
      .catch(err => {
        console.log('err: ', err);
      });
  };
}
