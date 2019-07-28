import React, { Component } from 'react';
import { Text } from 'react-native';
import { primaryColor } from '../../Constants/Colors';
import { Block } from 'galio-framework';

export default class ViewAd extends Component {
  render() {
    return (
      <Block>
        <Block style={{ height: 70, backgroundColor: primaryColor }}>
          <Text> ViewAd </Text>
        </Block>
      </Block>
    );
  }
}
