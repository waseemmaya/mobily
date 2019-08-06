import React, { Component } from 'react';
import { Text, Modal, View } from 'react-native';
import { primaryColor } from '../../Constants/Colors';
import { Block } from 'galio-framework';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class ViewAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediumImages: [],
      modalView: true,
    };
  }
  render() {
    const { mediumImages, modalView } = this.state;
    return (
      <Block>
        <Block style={{ height: 70, backgroundColor: primaryColor }}>
          <Text> ViewAd </Text>
          <View>
            {mediumImages.length > 0 && (
              <Modal
                enableSwipeDown={true}
                onSwipeDown={() => this.setState({ modalView: false })}
                enableImageZoom={true}
                visible={modalView}
                transparent={true}
              >
                <ImageViewer imageUrls={mediumImages} />
              </Modal>
            )}
            {/* {mediumImages.map((img)=> {
            return (

            )
          })} */}
          </View>
        </Block>
      </Block>
    );
  }

  componentDidMount() {
    console.log('this.props: ', this.props);

    let { adObj } = this.props.navigation.state.params;
    console.log('adObj: ', adObj);
    let mediumImages = adObj.adsImages.map(img => {
      let obj = {
        url: img.medium,
      };

      return obj;
    });
    console.log('mediumImages: ', mediumImages);
    this.setState({
      mediumImages,
    });
    // const images = [
    //   { url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460' },
    // ];
  }
}
