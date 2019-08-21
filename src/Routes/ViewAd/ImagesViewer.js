import React, { Component } from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Text } from '@shoutem/ui';
import DotIndicator from 'react-native-indicators';
import { primaryColor } from '../../Constants/Colors';

const images = [
    {
        // Simplest usage.
        url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
    },
    {
        // Simplest usage.
        url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
    }
];

export default class ImagesViewer extends React.Component {
    render() {
        return (
            <Modal
                visible={this.props.showModal}
                transparent={true}
                onRequestClose={this.props.hideModal}
                enableImageZoom>
                <ImageViewer
                    // loadingRender={() => <DotIndicator color={primaryColor} size={10} />}
                    imageUrls={this.props.modalArr}
                    index={0}
                    onSwipeDown={() => {
                        this.props.hideModal();
                    }}
                    enableSwipeDown={true}
                />
            </Modal>
        );
    }
}

// renderHeader={() => {
//     return <Text onPress={this.props.hideModal}>Cancel</Text>;
// }}
// renderFooter={() => {
//     return <Text onPress={this.props.hideModal}>Cancel</Text>;
// }}
// renderArrowLeft={() => {
//     return <Text onPress={this.props.hideModal}>Cancel</Text>;
// }}
