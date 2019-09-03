import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import { getFavtAds } from '../../config/Helpers/getAds';
import RenderFavtAd from './RenderFavtAd';
import Loader from '../../components/Loader/Loader';
import { primaryColor } from '../../config/Constants/Colors';
import NetworkError from '../../components/Error/NetworkError';
import { Block, Text } from 'galio-framework';

class Ads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favtAds: null
        };
    }
    async componentDidMount() {
        try {
            let favtAds = await getFavtAds();
            console.warn('asd: ', favtAds);
            this.setState({
                favtAds: favtAds.data.ads
            });
        } catch (err) {
            this.setState({
                favtAds: []
            });
        }
    }
    render() {
        const { favtAds } = this.state;
        if (favtAds === null) {
            return <Loader color={primaryColor} />;
        }
        if (favtAds.length === 0) {
            return <NetworkError message={'There is not any favorite ad'} iconName='magnify-close' />;
        }

        return (
            <Block style={{ flex: 1 }}>
                <Block style={{ height: 60, backgroundColor: primaryColor }}>
                    <Block center>
                        <Text style={{ fontSize: 20, color: 'white', marginTop: 20 }}>Favourite Ads</Text>
                    </Block>
                </Block>
                <ScrollView style={{ flex: 1 }}>
                    {favtAds.map((val) => {
                        return <RenderFavtAd key={val._id} ad={val} />;
                    })}
                </ScrollView>
            </Block>
        );
    }
}

export default Ads;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
