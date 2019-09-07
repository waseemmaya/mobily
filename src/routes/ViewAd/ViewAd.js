import React, { Component } from 'react';
import { Block } from 'galio-framework';
import {
    ScrollView,
    RefreshControl,
    Button,
    Text,
    InlineGallery,
    Caption,
    Divider,
    Row,
    View,
    Subtitle
} from '@shoutem/ui';
import moment from 'moment';
import ImagesViewer from './ImagesViewer';
import { Linking, StatusBar } from 'react-native';
import { viewIncrement } from '../../config/Helpers/getAds';

export default class ViewAd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adObj: null,
            refreshing: false,
            showModal: false
        };
    }

    toggleModal = () => {
        this.setState({
            showModal: true
        });
    };

    hideModal = () => {
        this.setState({
            showModal: false
        });
    };

    async componentDidMount() {
        const { _id } = this.props.navigation.state.params.ad;
        let adViewIncRes = await viewIncrement(_id);
        console.log('adViewIncRes: ', adViewIncRes);
    }

    RenderBottom = () => {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    marginBottom: 1
                }}>
                <View styleName='horizontal'>
                    <Button
                        onPress={() => {
                            Linking.openURL(`sms:03123767311?body=hello`);
                        }}
                        styleName='confirmation secondary'>
                        <Text>SMS</Text>
                    </Button>
                    <Button
                        onPress={() => {
                            Linking.openURL(`tel:03123767311`);
                        }}
                        styleName='confirmation secondary'>
                        <Text>CALL</Text>
                    </Button>
                </View>
            </View>
        );
    };

    _onRefresh = () => {
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 3000);
    };

    render() {
        const { showModal } = this.state;
        const { ad } = this.props.navigation.state.params;
        console.warn(ad);

        let arr = ad.adsImages.map((val) => {
            return { source: { uri: val.small } };
        });
        let modalArr = ad.adsImages.map((val) => {
            return { url: val.large };
        });

        if (showModal) {
            return (
                <ImagesViewer
                    modalArr={modalArr}
                    hideModal={this.hideModal}
                    toggleModal={this.toggleModal}
                    showModal={showModal}
                />
            );
        }

        return (
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <StatusBar hidden={true} animated={true} barStyle='dark-content' />

                    <InlineGallery onPress={this.toggleModal} styleName='large-banner' data={arr} />
                    <Block center>
                        <Caption>Total {ad.adsImages.length} Images</Caption>
                    </Block>

                    <Divider styleName='line' />
                    <Row>
                        <View styleName='vertical stretch space-between'>
                            <Block center>
                                <Subtitle style={{ fontSize: 22 }}>{ad.adTitle}</Subtitle>
                            </Block>
                            <Divider styleName='line' />
                            <Caption>Ad Number : {ad.adNumber}</Caption>
                            <Divider styleName='line' />
                            <Caption>Price : {ad.price}</Caption>
                            <Divider styleName='line' />
                            <Caption>Posted : {moment(ad.postedAt).fromNow()}</Caption>
                            <Divider styleName='line' />
                            <Caption>Location : {ad.location}</Caption>
                            <Divider styleName='line' />
                            <Caption>Views : {ad.views}</Caption>
                            <Divider styleName='line' />
                            <Caption>Posted By : {ad.postedByName}</Caption>
                            <Divider styleName='line' />
                            <Caption>Desciption :</Caption>
                            <Divider styleName='line' />
                            <Caption>{ad.description}</Caption>
                        </View>
                    </Row>
                    <Divider styleName='line' />
                    <Block center>
                        <Caption>{`---  Mobily  ---`}</Caption>
                    </Block>
                    {this.RenderBottom()}
                </View>
            </ScrollView>
        );
    }
}
