import React, { Component } from 'react';
import { Block, Text } from 'galio-framework';
import { ScrollView, RefreshControl } from 'react-native';

import { Icon } from 'native-base';
import { grayColor } from '../../config/Constants/Colors';

export default class NetworkError extends Component {
    state = {
        refreshing: false
    };
    render() {
        const { refreshing } = this.state;
        const { message, iconName, cancelSearch } = this.props;
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={async () => {
                            this.setState({ refreshing: true });
                            await cancelSearch();
                            console.log('refreshing false');
                            this.setState({ refreshing: false });
                        }}
                    />
                }>
                <Block center style={{ marginTop: '70%' }}>
                    <Icon type='MaterialCommunityIcons' name={!iconName ? iconName : 'cloud-off-outline'} />
                    <Text style={{ color: grayColor }}>
                        {message ? message : 'Network Error, Turn on Wifi or Mobile Data'}
                    </Text>
                    <Text style={{ color: grayColor }}>Pull to refresh</Text>
                </Block>
            </ScrollView>
        );
    }
}

// latestFetch
