import React from 'react';
import { Text, TouchableOpacity, Card, Image, View, Caption } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardView from 'react-native-cardview';
import { withNavigation } from 'react-navigation';

function RenderAd(props) {
    let { navigation, ad } = props;
    return (
        <TouchableOpacity
            style={{ marginBottom: 2 }}
            onPress={() => navigation.navigate('ViewAd', { ad: ad.item })}
            key={`${ad.item._id}${ad.item.adNumber}`}
            styleName='flexible'>
            <CardView cardElevation={3} cardMaxElevation={3} cornerRadius={6}>
                <Card styleName='flexible'>
                    <Image
                        styleName='medium-wide'
                        source={{
                            uri: ad.item.adsImages[0].thumb
                        }}
                    />
                    <View styleName='content'>
                        <Text style={{ fontSize: 13, color: 'black' }} numberOfLines={1}>
                            {ad.index} - {ad.item.adNumber} - {ad.item.adTitle}
                        </Text>
                        <View styleName='horizontal space-between'>
                            <Caption style={{ fontSize: 11 }}>
                                <Icon size={15} name='location-on' />

                                {ad.item.location}
                            </Caption>
                            <Caption style={{ fontSize: 11, color: 'black' }}>Rs {ad.item.price}</Caption>
                        </View>
                    </View>
                </Card>
            </CardView>
        </TouchableOpacity>
    );
}

export default withNavigation(RenderAd);
