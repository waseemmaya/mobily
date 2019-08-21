import React, { Component } from 'react';
import {
    Screen,
    ImageBackground,
    Tile,
    Title,
    Subtitle,
    Button,
    TouchableOpacity,
    Card,
    Image,
    Row,
    View,
    ListView,
    Icon,
    Divider,
    Caption,
    GridRow,
    NavigationBar
} from '@shoutem/ui';
import { DotIndicator } from 'react-native-indicators';
import moment from 'moment';
import { primaryColor } from '../../Constants/Colors';

export default class Home3 extends Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
    }

    view = (id) => {
        this.props.props.navigation.navigate('ViewAd', { _id: id });
    };

    renderRow(ad) {
        if (!ad) {
            return null;
        }

        return (
            <TouchableOpacity onPress={() => this.view(ad._id)} key={ad._id} styleName='flexible'>
                <Row>
                    <Image styleName='medium rounded-corners' source={{ uri: ad.adsImages[0].thumb }} />
                    <View styleName='vertical stretch space-between'>
                        <Subtitle>
                            {ad.adNumber} -
                            {`${ad.adTitle.length > 40 ? ad.adTitle.substring(0, 40 - 3) + '...' : ad.adTitle}`}
                        </Subtitle>
                        <View styleName='horizontal space-between'>
                            <Caption styleName='disclosure'> {moment(ad.postedAt).fromNow()}</Caption>
                            <Caption>Rs {ad.price}</Caption>
                        </View>
                    </View>
                </Row>
            </TouchableOpacity>
        );

        return (
            <Row>
                <Image styleName='small rounded-corners' source={{ uri: ad.adsImages[0].thumb }} />
                <View styleName='vertical stretch space-between'>
                    <Subtitle>
                        {ad.adNumber} -
                        {`${ad.adTitle.length > 40 ? ad.adTitle.substring(0, 40 - 3) + '...' : ad.adTitle}`}
                    </Subtitle>
                    <View styleName='horizontal'>
                        <Subtitle styleName='md-gutter-right'>${ad.price}</Subtitle>
                        <Caption styleName='disclosure'> {moment(ad.postedAt).fromNow()}</Caption>
                    </View>
                </View>
                <Button styleName='right-icon'>
                    <Icon name='add-to-cart' />
                </Button>
            </Row>
        );
    }

    loadMore = () => {
        this.props.fetchMore();
        console.log('fetchMore');
    };

    render() {
        let { adsArr, isFetching } = this.props;

        return (
            <Screen>
                <ListView onLoadMore={this.loadMore} data={adsArr} renderRow={this.renderRow} />
                {isFetching && <DotIndicator color={primaryColor} size={5} />}
            </Screen>
        );
    }
}
