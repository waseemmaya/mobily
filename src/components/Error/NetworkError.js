import React, { Component } from 'react';
import { Block, Text } from 'galio-framework';
import { Icon } from 'native-base';
import { grayColor } from '../../config/Constants/Colors';

export default class NetworkError extends Component {
    render() {
        const { message, iconName } = this.props;
        return (
            <Block block middle style={{ marginTop: '70%' }}>
                <Icon type='MaterialCommunityIcons' name={!iconName ? iconName : 'cloud-off-outline'} />
                <Text style={{ color: grayColor }}>
                    {message ? message : 'Network Error, Turn on Wifi or Mobile Data'}
                </Text>
            </Block>
        );
    }
}
