import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { View, Subtitle, Caption, Row, InlineGallery, Divider } from '@shoutem/ui';
import { Block } from 'galio-framework';
import moment from 'moment';
import ImagesViewer from './ImagesViewer';

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

    render() {
        const { showModal } = this.state;
        const { ad } = this.props.navigation.state.params;
        console.log('ad: ', ad);

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

                <ScrollView>
                    <InlineGallery onPress={this.toggleModal} styleName='large-banner' data={arr} />
                    <Row>
                        <View styleName='vertical stretch space-between'>
                            <Subtitle style={{ fontSize: 22 }}>{ad.adTitle}</Subtitle>
                            <Caption>{moment(ad.postedAt).fromNow()}</Caption>
                            <Caption>{ad.description}</Caption>
                        </View>
                    </Row>
                    <Divider styleName='line' />
                </ScrollView>
            </Block>
        );
    }
}
