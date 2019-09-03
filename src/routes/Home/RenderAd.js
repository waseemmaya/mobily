import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { Image, View, Text, Caption, Row } from '@shoutem/ui';
import moment from 'moment';
import { Icon } from 'native-base';
import axios from 'axios';
import { grayColor } from '../../config/Constants/Colors';
import API from '../../config/API/API';
import { getUserID } from '../../config/Helpers/AuthFunctions';
import { withAds } from '../../contexts/AdContext';

class RenderAd extends Component {
    addToFavt = async (_id) => {
        const { getUser, user } = this.props.adState;
        if (!user) {
            return;
        }
        let { favtAds } = user;
        for (let i = 0; i < favtAds.length; i++) {
            if (favtAds[i] === _id) {
                alert('already added WIP');
                return;
            }
        }
        try {
            let userId = await getUserID();
            let res = await axios({
                method: 'post',
                url: `${API}ads/addtofavt`,
                data: {
                    id: _id,
                    userId: userId
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.warn('res: ', res);
            getUser();
        } catch (error) {
            console.warn('error: ', error);
        }
    };
    render() {
        let { ad } = this.props[0];
        let { navigation } = this.props;
        const { user } = this.props.adState;

        console.log('this.props: ', this.props);

        let isMatched = false;

        user &&
            user.favtAds &&
            user.favtAds.map((id) => {
                if (JSON.stringify(id) === JSON.stringify(ad._id)) {
                    isMatched = true;
                }
            });
        let iconName = !isMatched ? 'ios-heart-empty' : 'ios-heart';

        return (
            <View key={`${ad._id}${ad.adNumber}`}>
                <Row>
                    <TouchableOpacity onPress={() => navigation.navigate('ViewAd', { ad: ad })} styleName='flexible'>
                        <Image styleName='medium rounded-corners' source={{ uri: ad.adsImages[0].thumb }} />
                    </TouchableOpacity>
                    <View styleName='vertical stretch space-between'>
                        <Text>
                            {ad.adNumber} - {ad.adTitle}
                        </Text>
                        <View styleName='horizontal space-between'>
                            <Caption>{moment(ad.postedAt).fromNow()}</Caption>
                            <Caption>Rs {ad.price}</Caption>
                            <TouchableOpacity onPress={() => this.addToFavt(ad._id)}>
                                <Icon style={{ fontSize: 21, color: grayColor }} name={iconName} type='Ionicons' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Row>
            </View>
        );
    }
}

export default withAds(withNavigation(RenderAd));
