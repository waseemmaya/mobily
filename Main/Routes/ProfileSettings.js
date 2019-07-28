import React, { Component } from 'react';
import { View, Text, Button } from 'native-base';
import { onLogout } from '../Helpers/AuthFunctions';

export default class ProfileSettings extends Component {
  render() {
    return (
      <View>
        <Text> ProfileSettings </Text>
        <Button onPress={this.handleLogout}>
          <Text> Logout </Text>
        </Button>
      </View>
    );
  }

  handleLogout = () => {
    const logoutRes = onLogout();
    return this.props.navigation.navigate('Login');
  };
}
