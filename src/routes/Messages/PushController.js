import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {
    componentDidMount() {
        console.warn('PushController');
        PushNotification.configure({
            onNotification: function(notification) {
                console.warn('NOTIFICATION:', notification);
            }
        });
    }

    render() {
        return null;
    }
}
