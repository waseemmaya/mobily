import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, Image, View, Text, Caption, Row } from '@shoutem/ui';
import moment from 'moment';

class RenderAd extends PureComponent {
    render() {
        let { navigation, ad } = this.props;

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ViewAd', { ad: ad })}
                key={`${ad._id}${ad.adNumber}`}
                styleName='flexible'>
                <Row>
                    <Image styleName='medium rounded-corners' source={{ uri: ad.adsImages[0].thumb }} />
                    <View styleName='vertical stretch space-between'>
                        <Text>
                            {ad.adNumber} - {ad.adTitle}
                        </Text>
                        <View styleName='horizontal space-between'>
                            <Caption>{moment(ad.postedAt).fromNow()}</Caption>
                            <Caption>Rs {ad.price}</Caption>
                        </View>
                    </View>
                </Row>
            </TouchableOpacity>
        );
    }
}

export default withNavigation(RenderAd);
