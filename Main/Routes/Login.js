import React, { Component } from 'react';
import { View, Text, Button } from 'native-base';
import { AsyncStorage } from 'react-native';
import { onLogin } from '../Helpers/AuthFunctions';

export default class Login extends Component {
  render() {
    // alert(JSON.stringify(this.props));
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <Text> Login Screen </Text>
        <Button onPress={() => this.props.navigation.navigate('Signup')}>
          <Text> Go to Sign Up </Text>
        </Button>
        <Button onPress={() => this.handleLogin()}>
          <Text> Login </Text>
        </Button>
      </View>
    );
  }

  handleLogin = async () => {
    const res = await onLogin();

    return this.props.navigation.navigate('HomeScreen');
  };
}
