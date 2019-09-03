import React from 'react';
import { View, Subtitle, Caption, Image, Button, Row, Text } from '@shoutem/ui';
import { Icon } from 'native-base';
import { withNavigation } from 'react-navigation';
import { grayColor } from '../../config/Constants/Colors';
import { TouchableOpacity } from 'react-native';

function RenderFavtAd(props) {
    const { ad, navigation } = props;

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ViewAd', { ad: ad })}>
            <Row>
                <Image styleName='small rounded-corners' source={{ uri: ad.adsImages[0].thumb }} />
                <View styleName='vertical stretch space-between'>
                    <Subtitle>
                        {ad.adNumber} - {ad.adTitle}
                    </Subtitle>
                    <Caption>
                        <Icon style={{ fontSize: 15, color: grayColor }} name='ios-pin' type='Ionicons' /> Karachi
                    </Caption>
                </View>
                <Button styleName='right-icon'>
                    <Text>RS : {ad.price}</Text>
                </Button>
            </Row>
        </TouchableOpacity>
    );
}

export default withNavigation(RenderFavtAd);
