import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import appConfig from '../../../app.json';
import NotificationService from '../../config/Helpers/NotificationService';

export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            senderId: appConfig.senderID
        };
        this.notif = new NotificationService(this.onRegister.bind(this), this.onNotif.bind(this));
    }
    onRegister(token) {
        Alert.alert('Registered !', JSON.stringify(token));
        console.log(token);
        this.setState({ registerToken: token.token, gcmRegistered: true });
    }

    onNotif(notif) {
        console.log(notif);
        Alert.alert(notif.title, notif.message);
    }

    handlePerm(perms) {
        Alert.alert('Permissions', JSON.stringify(perms));
    }
    render() {
        return (
            <View>
                <Text> Messages </Text>
                <TouchableOpacity
                    onPress={() => {
                        this.notif.localNotif();
                    }}>
                    <Text>Local Notification (now)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.notif.scheduleNotif();
                    }}>
                    <Text>Schedule Notification in 30s</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.notif.cancelNotif();
                    }}>
                    <Text>Cancel last notification (if any)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.notif.cancelAll();
                    }}>
                    <Text>Cancel all notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.notif.checkPermission(this.handlePerm.bind(this));
                    }}>
                    <Text>Check Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
