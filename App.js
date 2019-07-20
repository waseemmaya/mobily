import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Text, View, Button } from 'react-native';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() => navigate('Profile', { name: 'Jane' })}
      />
    );
  }
}

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Jane's profile"
        onPress={() => navigate('Profile', { name: 'Jane' })}
      />
    );
  }
}

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
});

const App = createAppContainer(MainNavigator);

export default App;
