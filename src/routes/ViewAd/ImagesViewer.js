import React from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default function ImagesViewer(props) {
    return (
        <Modal visible={props.showModal} transparent={true} onRequestClose={props.hideModal} enableImageZoom>
            <ImageViewer
                // loadingRender={() => <DotIndicator color={primaryColor} size={10} />}
                imageUrls={props.modalArr}
                index={0}
                onSwipeDown={() => {
                    props.hideModal();
                }}
                enableSwipeDown={true}
            />
        </Modal>
    );
}
