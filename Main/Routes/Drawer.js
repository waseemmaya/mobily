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
        <TouchableOpacity
          onPress={() => {
            this.navigate('ProfileSettings');
          }}
        >
          <Text>Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.navigate('ProfileSettings');
          }}
        >
          <Button onPress={this.handleLogout}>
            <Text> Logout </Text>
          </Button>
        </TouchableOpacity>
      </View>
    );
  }
}
