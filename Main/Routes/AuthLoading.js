import React from 'react';
import { StatusBar, View } from 'react-native';
import { isLoggedin } from '../Helpers/AuthFunctions';
import { secondaryColor } from '../Constants/Colors';
import DotIndicator from '../Components/DotIndicator';

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
        <DotIndicator />
      </View>
    );
  }

  componentDidMount = async () => {
    const res = await isLoggedin();
    this.props.navigation.navigate(res ? 'HomeScreen' : 'Login');
  };
}
