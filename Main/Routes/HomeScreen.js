import React, { Component } from 'react';
import { View, Text, Icon } from 'native-base';

export default class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: null,
      headerLeft: (
        <Icon
          onPress={() => navigation.toggleDrawer()}
          ios="ios-menu"
          android="md-menu"
          style={{ fontSize: 20, color: 'red' }}
        />
      ),
    };
  };
  render() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <Text> Home Screen </Text>
      </View>
    );
  }
}
