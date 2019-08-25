import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { Card, CardItem, Text } from 'native-base';
import { Block } from 'galio-framework';

class RenderAd extends PureComponent {
    render() {
        let { navigation, ad } = this.props;

        return (
            <Block>
                <Text>
                    {ad.adNumber} - {ad.adTitle}
                </Text>
            </Block>
        );

        // return (
        //     <TouchableOpacity
        //         style={{ marginBottom: 2 }}
        //         onPress={() => navigation.navigate('ViewAd', { ad: ad })}
        //         key={`${ad._id}${ad.adNumber}`}
        //         styleName='flexible'>
        //         <CardView cardElevation={3} cardMaxElevation={3} cornerRadius={6}>
        //             <Card styleName='flexible'>
        //                 <Image
        //                     styleName='medium-wide'
        //                     source={{
        //                         uri: ad.adsImages[0].thumb
        //                     }}
        //                 />
        //                 <View styleName='content'>
        //                     <Text style={{ fontSize: 13, color: 'black' }} numberOfLines={1}>
        //                         {ad.adNumber} - {ad.adTitle}
        //                     </Text>
        //                     <View styleName='horizontal space-between'>
        //                         <Caption style={{ fontSize: 11 }}>
        //                             <Icon size={15} name='location' />
        //                             {ad.location}
        //                         </Caption>
        //                         <Caption style={{ fontSize: 11, color: 'black' }}>Rs {ad.price}</Caption>
        //                     </View>
        //                 </View>
        //             </Card>
        //         </CardView>
        //     </TouchableOpacity>
        // );
    }
}

export default withNavigation(RenderAd);
