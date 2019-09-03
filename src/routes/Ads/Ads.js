// import React from 'react';
// import { Text, View } from 'react-native';
// import PushNotification from '../Messages/PushNotification';
// // import StoreScreen from '../StoreScreen/StoreScreen';

// export default function Ads() {
//     return <PushNotification />;
//     return (
//         <View>
//             <Text>My Ads</Text>
//         </View>
//     );
// }

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, TouchableOpacity } from 'react-native';

class Ads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    render() {
        return (
            <ScrollView>
                <View>
                    {this.state.data.map((val) => {
                        return (
                            <View style={styles.container}>
                                <View>
                                    <Image source={{ uri: val.picture.large }} style={styles.photo} />
                                </View>
                                <View style={styles.name}>
                                    <Text style={styles.heading}>{val.name.first}</Text>
                                    <Text style={styles.desc}>{val.name.last}</Text>
                                </View>
                                <View style={styles.buttonView}>
                                    <TouchableOpacity onPress={() => {}}>
                                        <Text style={styles.button}>GET</Text>
                                    </TouchableOpacity>
                                    <Text style={{ color: '#A6A6A8', marginTop: 2, fontSize: 12 }}>
                                        In-App Purchases
                                    </Text>
                                </View>

                                <View style={styles.container2} />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        );
    }

    componentDidMount() {
        const url = `https://randomuser.me/api/?seed=1&page=1&results=10`;
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    data: res.results
                });
            })
            .catch((error) => {});
    }
}

export default Ads;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25,
        marginLeft: 8,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    container2: {
        flex: 1,
        height: 1,
        backgroundColor: 'black'
    },
    buttonView: {
        position: 'absolute',
        right: 0,
        marginRight: 20
    },
    desc: {
        marginLeft: 12,
        fontSize: 16,
        color: '#A6A6A8'
    },
    heading: {
        marginLeft: 12,
        fontSize: 20
    },
    name: {
        marginTop: -25
    },
    photo: {
        height: 70,
        width: 70,
        borderRadius: 7
    },
    button: {
        backgroundColor: '#EDF1F4',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 40,
        color: '#0677F6',
        fontSize: 18,
        width: 100,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 5,
        textAlign: 'center'
    },
    separator: {
        marginTop: 90,
        width: '100%',
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E'
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'black',
        margin: 10
    }
});
