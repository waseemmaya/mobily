import React from 'react';
import { StatusBar, View } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import { isLoggedin } from '../Helpers/AuthFunctions';
import { secondaryColor } from '../Constants/Colors';
import firebase from 'react-native-firebase';

export default class AuthLoading extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: secondaryColor,
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
    firebase.auth().signInAnonymously().then((user) => {
    console.log('Firebase user: ', user);
    this.props.navigation.navigate(res ? 'HomeScreen' : 'Login');
  }).catch((err)=> {
    console.log('err: ', err);
  })

  };
}
