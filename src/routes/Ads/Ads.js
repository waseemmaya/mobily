import React from 'react';
import { ScrollView } from 'react-native';
import { getFavtAds } from '../../config/Helpers/getAds';
import Loader from '../../components/Loader/Loader';
import { primaryColor } from '../../config/Constants/Colors';
import NetworkError from '../../components/Error/NetworkError';
import { Block, Text } from 'galio-framework';
import RenderAd from '../Home/RenderAd';

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
    removeFromFavt = (_id) => {
        const { favtAds } = this.state;
        let filteredArr = favtAds.filter((val) => val._id !== _id);
        this.setState({
            favtAds: filteredArr
        });
    };
    render() {
        return (
            <Block style={{ flex: 1 }}>
                <Block style={{ height: 60, backgroundColor: primaryColor }}>
                    <Block center>
                        <Text style={{ fontSize: 20, color: 'white', marginTop: 20 }}>Favourite Ads</Text>
                    </Block>
                </Block>
                {this.MainAdRednder()}
            </Block>
        );
    }

    MainAdRednder = () => {
        const { favtAds } = this.state;
        if (favtAds === null) {
            return <Loader color={primaryColor} />;
        }
        if (favtAds.length === 0) {
            return <NetworkError message={'You have not added any ad in favorite.'} iconName='magnify-close' />;
        }

        return (
            <ScrollView style={{ flex: 1 }}>
                {favtAds.map((val) => {
                    return <RenderAd removeFromFavt={this.removeFromFavt} key={val._id} ad={val} />;
                })}
            </ScrollView>
        );
    };
}

export default Ads;
