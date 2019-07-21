import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { isLoggedin } from '../Helpers/AuthFunctions';

export default class AuthLoading extends React.Component {
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  componentDidMount = async () => {
    const res = await isLoggedin();
    this.props.navigation.navigate(res ? 'HomeScreen' : 'Login');
  };
}
