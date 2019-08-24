import React, { PureComponent } from 'react';
import {
    Text,
    TouchableOpacity,
    Caption,
    Tile,
    Image,
    View,
    Card,
    ImageBackground,
    Subtitle,
    Row,
    Overlay
} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardView from 'react-native-cardview';
import { withNavigation } from 'react-navigation';
import moment from 'moment';

class RenderAd extends PureComponent {
    render() {
        let { navigation, ad } = this.props;

        // return (
        //     <TouchableOpacity
        //         onPress={() => navigation.navigate('ViewAd', { ad: ad })}
        //         key={`${ad._id}${ad.adNumber}`}
        //         styleName='flexible'>
        //         <Row>
        //             <Image styleName='medium rounded-corners' source={{ uri: ad.adsImages[0].thumb }} />
        //             <View styleName='vertical stretch space-between'>
        //                 <Subtitle>
        //                     {ad.adNumber} -
        //                     {`${ad.adTitle.length > 40 ? ad.adTitle.substring(0, 40 - 3) + '...' : ad.adTitle}`}
        //                 </Subtitle>
        //                 <View styleName='horizontal space-between'>
        //                     <Caption styleName='disclosure'> {moment(ad.postedAt).fromNow()}</Caption>
        //                     <Caption>Rs {ad.price}</Caption>
        //                 </View>
        //             </View>
        //         </Row>
        //     </TouchableOpacity>
        // );

        return (
            <TouchableOpacity
                style={{ marginBottom: 2 }}
                onPress={() => navigation.navigate('ViewAd', { ad: ad })}
                key={`${ad._id}${ad.adNumber}`}
                styleName='flexible'>
                <CardView cardElevation={3} cardMaxElevation={3} cornerRadius={6}>
                    <Card styleName='flexible'>
                        <Image
                            styleName='medium-wide'
                            source={{
                                uri: ad.adsImages[0].thumb
                            }}
                        />
                        <View styleName='content'>
                            <Text style={{ fontSize: 13, color: 'black' }} numberOfLines={1}>
                                {ad.adNumber} - {ad.adTitle}
                            </Text>
                            <View styleName='horizontal space-between'>
                                <Caption style={{ fontSize: 11 }}>
                                    <Icon size={15} name='location' />
                                    {ad.location}
                                </Caption>
                                <Caption style={{ fontSize: 11, color: 'black' }}>Rs {ad.price}</Caption>
                            </View>
                        </View>
                    </Card>
                </CardView>
            </TouchableOpacity>
        );
    }
}

export default withNavigation(RenderAd);
