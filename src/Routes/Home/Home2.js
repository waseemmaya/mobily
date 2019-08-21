import React, { Component } from 'react';
import {
    Screen,
    ImageBackground,
    Tile,
    Title,
    Text,
    Subtitle,
    Row,
    TouchableOpacity,
    Card,
    Image,
    View,
    ListView,
    Divider,
    Caption,
    GridRow,
    NavigationBar
} from '@shoutem/ui';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CardView from 'react-native-cardview';
import Grid from 'react-native-infinite-scroll-grid';
import { primaryColor } from '../../Constants/Colors';
import { FlatList } from 'react-native';

export default class Home2 extends Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
    }
    render() {
        const { adsArr } = this.props;
        return (
            <Screen>
                <Grid
                    numColumns={2}
                    data={adsArr}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={(ad) => this.renderAd(ad)}
                    // onRefresh={() => this.props.initialSearch()}
                    // refreshing={this.props.isFetching}
                    onEndReached={() => this.props.fetchMore()}
                    loadingMore={this.props.isFetching}
                    marginExternal={6}
                    marginInternal={6}
                />
                {/* <FlatList
                    onEndThreshold={0}
                    onEndReached={this.props.fetchMore}
                    // onLoadMore={this.props.fetchMore}
                    data={adsArr}
                    renderItem={(ad) => this.renderAd(ad)}
                /> */}
                {/* <ListView
                    onEndThreshold={0}
                    onEndReached={this.props.fetchMore}
                    data={adsData}
                    // onLoadMore={this.props.fetchMore}
                    renderRow={this.renderRow}
                /> */}
            </Screen>
        );
    }

    renderAd = (ad) => {
        // alert(ad);
        // return (
        //     <TouchableOpacity onPress={() => this.view(ad.item._id)} key={ad.item._id} styleName='flexible'>
        //         <Row>
        //             <Image styleName='medium rounded-corners' source={{ uri: ad.item.adsImages[0].thumb }} />
        //             <View styleName='vertical stretch space-between'>
        //                 <Subtitle>
        //                     {ad.item.adNumber} -
        //                     {`${ad.item.adTitle.length > 40
        //                         ? ad.item.adTitle.substring(0, 40 - 3) + '...'
        //                         : ad.item.adTitle}`}
        //                 </Subtitle>
        //                 <View styleName='horizontal space-between'>
        //                     <Caption styleName='disclosure'> {moment(ad.item.postedAt).fromNow()}</Caption>
        //                     <Caption>Rs {ad.item.price}</Caption>
        //                 </View>
        //             </View>
        //         </Row>
        //     </TouchableOpacity>
        // );

        return (
            <TouchableOpacity
                style={{ marginBottom: 2 }}
                onPress={() => this.view(ad.item._id)}
                key={ad.item._id}
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
                                {ad.item.adNumber} - {ad.item.adTitle}
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
    };

    view = (id) => {
        this.props.props.navigation.navigate('ViewAd', { _id: id });
    };

    renderRow(rowData, sectionId, index) {
        const cellViews = rowData.map((ad, id) => {
            return (
                <TouchableOpacity
                    style={{ marginBottom: 2 }}
                    onPress={() => this.view(ad._id)}
                    key={ad._id}
                    styleName='flexible'>
                    <CardView cardElevation={3} cardMaxElevation={3} cornerRadius={6}>
                        <Card styleName='flexible'>
                            <Image styleName='medium-wide' source={{ uri: ad.adsImages[0].thumb }} />
                            <View styleName='content'>
                                <Text style={{ fontSize: 13, color: 'black' }} numberOfLines={1}>
                                    {ad.adNumber} - {ad.adTitle}
                                </Text>
                                <View styleName='horizontal space-between'>
                                    <Caption style={{ fontSize: 11 }}>
                                        <Icon size={15} name='location-on' />

                                        {ad.location}
                                    </Caption>
                                    <Caption style={{ fontSize: 11, color: 'black' }}>Rs {ad.price}</Caption>
                                </View>
                            </View>
                        </Card>
                    </CardView>
                </TouchableOpacity>
            );
        });

        return <GridRow columns={2}>{cellViews}</GridRow>;
    }
}
