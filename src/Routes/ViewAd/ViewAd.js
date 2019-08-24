import React, { Component } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { View, Subtitle, Caption, Row, InlineGallery, Divider } from '@shoutem/ui';
import { Block } from 'galio-framework';
import moment from 'moment';
import ImagesViewer from './ImagesViewer';
import { primaryColor } from '../../Constants/Colors';

export default class ViewAd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adObj: null,
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
        let url = `https://mobily-pk.herokuapp.com/ads?id=${_id}`;

        try {
            let response = await fetch(url);
            console.log('response: ', response);
            if (response.status === 200) {
                let data = await response.json();
                console.log('data: ', data);
            }
        } catch (error) {
            console.log('error: ', error);
            return error;
        }
    }

    render() {
        const { showModal } = this.state;
        const { ad } = this.props.navigation.state.params;

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
            <Block style={{ flex: 1 }}>
                {/* <StatusBar backgroundColor={primaryColor} barStyle='light-content' /> */}
                {/* <StatusBar backgroundColor={primaryColor} hidden barStyle='light-content' /> */}

                <ScrollView>
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
                </ScrollView>
            </Block>
        );
    }
}
