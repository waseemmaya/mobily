import React, { Component } from 'react';
import { View, Text, Button } from 'native-base';
import { onLogout } from '../../config/Helpers/AuthFunctions';

export default class Settings extends Component {
    render() {
        return (
            <View>
                <Text> Settings </Text>
                <Button onPress={this.handleLogout}>
                    <Text> Logout </Text>
                </Button>
            </View>
        );
    }

    handleLogout = () => {
        const logoutRes = onLogout();
        // this.props.navigation.navigate('ViewAd');
        return this.props.navigation.navigate('Login');
    };
}
