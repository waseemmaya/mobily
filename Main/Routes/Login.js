import React, { Component } from 'react';
import { View, Text } from 'native-base';

import { StatusBar, Image, ScrollView } from 'react-native';
import { Button, List, Avatar } from 'react-native-paper';
import { onLogin } from '../Helpers/AuthFunctions';
import { TextField } from 'react-native-material-textfield';
import { primaryColor, secondaryColor, lightColor } from '../Constants/Colors';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  render() {
    let { email, password } = this.state;
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: primaryColor,
            }}
          >
            <Image
              style={{ width: 200, height: 200 }}
              source={require('../Assets/logo.png')}
            />
          </View>
          <View
            style={{
              margin: 15,
              marginTop: 18,
              flexDirection: 'column'
            }}
          >
            <TextField
              value={email}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              returnKeyType="next"
              label="Email"
            />

            <TextField
              value={password}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              clearTextOnFocus={true}
              returnKeyType="done"
              label="Password"
            />
            <Button
              style={{
                width: 100,
                marginTop: 15,
                backgroundColor: primaryColor,
              }}
              dark
              mode="contained"
              onPress={() => console.log('Pressed')}
            >
              Login
            </Button>
          </View>
          <View style={{ flex: 1, marginTop: 20 }}>
            {this.renderAuthProvide()}
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'column',
              flexWrap: 'nowrap',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'
            }}
          >
            <Text style={{ fontSize: 13, color: 'grey' }}>
              Dont have an account?
            </Text>
            <Button
              style={{
                marginLeft: -10,
              }}
              mode="text"
              onPress={() => this.props.navigation.navigate('Signup')}
            >
              Sign up here
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }

  renderAuthProvide = () => {
    let data = [
      { name: 'Facebook', color: '#3A5999', src: '../Assets/fb1.png' },
      { name: 'Google', color: primaryColor, src: '../Assets/google1.png' },
    ];
    return data.map(val => {
      return (
        <List.Item
          titleStyle={{ color: 'white' }}
          style={{
            borderRadius: 4,
            backgroundColor: val.color,
            marginTop: 10,
            marginLeft: 15,
            marginRight: 15,
          }}
          title={`Login With ${val.name}`}
          left={props => (
            <Image
              style={{ width: 40, height: 40 }}
              source={
                val.name === 'Facebook'
                  ? require('../Assets/fb1.png')
                  : require('../Assets/google1.png')
              }
            />
          )}
        />
      );
    });
  };

  handleLogin = async () => {
    const res = await onLogin();
    console.log('res login --->: ', res);
    return this.props.navigation.navigate(res ? 'HomeScreen' : 'Signup');
  };
}
