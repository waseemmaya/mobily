import React, { Component } from 'react';
import { Block, Text } from 'galio-framework';
import { grayColor } from '../Constants/Colors';
import { Icon } from 'native-base';

export default class NetworkError extends Component {
    render() {
        const { message } = this.props;
        return (
            <Block block middle style={{ marginTop: '70%' }}>
                <Icon type='MaterialCommunityIcons' name='cloud-off-outline' />
                <Text style={{ color: grayColor }}>{message ? message : 'Network Error'}</Text>
            </Block>
        );
    }
}
