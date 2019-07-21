import React, { Component } from 'react';
import { View, Text, Button } from 'native-base';
import { onSignup } from '../Helpers/AuthFunctions';

export default class Signup extends Component {
  render() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <Text> Sign Up Screen </Text>
        <Button onPress={() => this.props.navigation.navigate('Login')}>
          <Text> Go to Log in </Text>
        </Button>
        <Button onPress={this.handleSignup}>
          <Text> Sign up save token </Text>
        </Button>
      </View>
    );
  }
  handleSignup = async () => {
    const signupRes = await onSignup();
  };
}
