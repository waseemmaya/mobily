import React, { Component } from 'react';
import { View, Text, Button } from 'native-base';

export default class Signup extends Component {
  render() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <Text> Sign Up Screen </Text>
        <Button onPress={() => this.props.navigation.navigate('Login')}>
          <Text> Go to Log in </Text>
        </Button>
      </View>
    );
  }
}
