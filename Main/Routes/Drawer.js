import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Button } from 'native-base';
import { onLogout } from '../Helpers/AuthFunctions';

export default class Drawer extends Component {
  closeDrawer = () => {
    this.props.navigation.closeDrawer();
  };

  navigate = (screen, params) => {
    this.closeDrawer();
    return this.props.navigation.navigate(screen, params);
  };

  handleLogout = () => {
    const logoutRes = onLogout();
    return this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View>
        <Button
          onPress={() => {
            this.navigate('Home');
          }}
        >
          <Text> Home </Text>
        </Button>
        <Button
          onPress={() => {
            this.navigate('Settings');
          }}
        >
          <Text> Update Profile </Text>
        </Button>

        <Button
          onPress={() => {
            this.navigate('Ads');
          }}
        >
          <Text> My Ads </Text>
        </Button>

        <Button onPress={this.handleLogout}>
          <Text> Logout </Text>
        </Button>
      </View>
    );
  }
}
