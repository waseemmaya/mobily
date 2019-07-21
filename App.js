import React, { Component } from 'react';
import Navigator from './Main/Navigators/Navigator';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {
  primaryColor,
  secondaryColor,
  lightColor,
} from './Main/Constants/Colors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
    text: primaryColor,
    accent: secondaryColor,
  },
};

export default class App extends Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <Navigator />
      </PaperProvider>
    );
  }
}
