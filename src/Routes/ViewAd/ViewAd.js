// import React, { Component } from 'react';
// import { Text, Modal, View } from 'react-native';
// import { primaryColor } from '../../Constants/Colors';
// import { Block } from 'galio-framework';
// import ImageViewer from 'react-native-image-zoom-viewer';

// export default class ViewAd extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       mediumImages: [],
//       modalView: true,
//     };
//   }
//   render() {
//     const { mediumImages, modalView } = this.state;
//     return (
//       <Block>
//         <Block style={{ height: 70, backgroundColor: primaryColor }}>
//           <Text> ViewAd </Text>
//           <View>
//             {mediumImages.length > 0 && (
//               <Modal
//                 enableSwipeDown={true}
//                 onSwipeDown={() => this.setState({ modalView: false })}
//                 enableImageZoom={true}
//                 visible={modalView}
//                 transparent={true}
//               >
//                 <ImageViewer imageUrls={mediumImages} />
//               </Modal>
//             )}
//           </View>
//         </Block>
//       </Block>
//     );
//   }

//   componentWillUnmount (){
//     clearTimeout()
//   }

//   componentDidMount() {
//     console.log('this.props: ', this.props);

//     setTimeout(() => {
//       this.setState({ modalView: false });
//       this.props.navigation.navigate("Home")
//     }, 5000);

//     let { adObj } = this.props.navigation.state.params;
//     console.log('adObj: ', adObj);
//     let mediumImages = adObj.adsImages.map(img => {
//       let obj = {
//         url: img.medium,
//       };

//       return obj;
//     });
//     console.log('mediumImages: ', mediumImages);
//     this.setState({
//       mediumImages,
//     });
//     // const images = [
//     //   { url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460' },
//     // ];
//   }
// }

import React, { Component } from 'react';

import {
    Card,
    View,
    Subtitle,
    Icon,
    Text,
    Caption,
    Image,
    Title,
    Heading,
    Row,
    Button,
    InlineGallery,
    Divider
} from '@shoutem/ui';
import { ScrollView } from 'react-native';
import moment from 'moment';
import { DotIndicator } from 'react-native-indicators';
import { Block } from 'galio-framework';
import { primaryColor } from '../../Constants/Colors';
import ImagesViewer from './ImagesViewer';

export default class ViewAd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adObj: null,
            showModal: false
        };
    }
    componentWillUnmount() {
        this.setState({
            adObj: null
        });
    }

    async componentDidMount() {
        this.setState({
            adObj: null
        });
        let { _id } = this.props.navigation.state.params;
        console.log('_id: ', _id);

        let url = `https://mobily-pk.herokuapp.com/ads/ad/${_id}`;

        try {
            let response = await fetch(url);
            console.log('response: ', response);
            if (response.status === 200) {
                let data = await response.json();
                console.log('data: ', data);
                this.setState({
                    adObj: data[0]
                });
            }
        } catch (error) {
            console.log('error: ', error);
            return error;
        }
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
        const { adObj, showModal } = this.state;

        if (!adObj) {
            return <DotIndicator color={primaryColor} size={10} />;
        }

        let arr = adObj.adsImages.map((val) => {
            return { source: { uri: val.medium } };
        });
        let modalArr = adObj.adsImages.map((val) => {
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
                            <Subtitle style={{ fontSize: 22 }}>{adObj.adTitle}</Subtitle>
                            <Caption>{moment(adObj.postedAt).fromNow()}</Caption>
                            <Caption>{adObj.description}</Caption>
                        </View>
                    </Row>
                    <Divider styleName='line' />
                </ScrollView>
            </Block>
        );
    }
}
