import React, { Component } from 'react';
import { Text, Image, StatusBar, ScrollView } from 'react-native';
import { Button, Block } from 'galio-framework';
import ImagePicker from 'react-native-image-crop-picker';
import { Spinner } from 'native-base';
import axios from 'axios';
import { primaryColor, grayColor } from '../../config/Constants/Colors';
import Loader from '../../components/Loader/Loader';
import API from '../../config/API/API';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagesArrays: [],
            isUploading: false,
            visible: false
        };
    }
    render() {
        const { imagesArrays, isUploading, visible } = this.state;
        return (
            <Block style={{ flex: 1 }}>
                {/* <StatusBar backgroundColor={primaryColor} barStyle='light-content' /> */}
                <Block>{this.renderSearchBar()}</Block>
                {isUploading && <Loader color={primaryColor} />}
                {!isUploading && (
                    <Block>
                        <Button
                            style={{
                                width: 100,
                                marginTop: 15
                            }}
                            onPress={this.selectImage}>
                            Select Images
                        </Button>
                        <Button
                            style={{
                                width: 100,
                                marginTop: 15
                            }}
                            onPress={this.uploadImages}>
                            Upload
                        </Button>
                        <Block>
                            <ScrollView>
                                {imagesArrays.length > 0 &&
                                    imagesArrays.map((val, i) => {
                                        return (
                                            <Image
                                                key={i}
                                                style={{
                                                    borderRadius: 0,
                                                    width: 150,
                                                    height: 150
                                                }}
                                                source={{ uri: val.path }}
                                            />
                                        );
                                    })}
                            </ScrollView>
                        </Block>
                    </Block>
                )}
                {/* {visible &&  <Snackbar duration={4000}
          visible={this.state.visible}
          action={{
            label: 'X',
            onPress: () => {
              this.setState({ visible: false })
            },
          }}
          onDismiss={() => this.setState({ visible: false })}
        >
          Uploaded
        </Snackbar>} */}
            </Block>
        );
    }

    renderSearchBar = () => {
        return (
            <Block style={{ height: 70, backgroundColor: primaryColor }}>
                <Text> Category </Text>
            </Block>
        );
    };

    selectImage = async () => {
        // let ads = await axios.get(adsAPI);
        // console.log('ads: ', ads);
        try {
            let imagesArrays = await ImagePicker.openPicker({
                mediaType: 'photo',
                multiple: true
            });
            console.log('imagesArrays: ', imagesArrays);
            this.setState({
                imagesArrays: imagesArrays
            });
        } catch (error) {
            console.log('error: ', error);
        }
    };

    uploadImages = async () => {
        const { imagesArrays } = this.state;
        if (imagesArrays.length === 0) {
            console.log('No image selected');
            return;
        }
        this.setState({
            isUploading: true
        });

        let data = new FormData();
        for (let i = 0; i < imagesArrays.length; i++) {
            var photo = {
                uri: imagesArrays[i].path,
                type: imagesArrays[i].mime,
                name: `${imagesArrays[i].modificationDate}`
            };
            data.append('imagesArr', photo, photo.name);
            data.append('title', 'A beautiful photo!');
        }

        let config = {
            accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        };

        try {
            let uploadResult = await axios.post(`${API}upload`, data, { headers: config });
            console.log('uploadResult ---> : ', uploadResult);
            this.setState({
                visible: true,
                isUploading: false,
                imagesArrays: []
            });
        } catch (error) {
            this.setState({
                isUploading: false
            });
            console.log('upload error --->: ', error);
        }
    };
}

// console.log('image[0]: ', image[0]);
// console.log('image[0] path: ', image[0].path);
// console.log('image[0] mime: ', image[0].mime);
// var photo = {
//   uri: image[0].path,
//   type: image[0].mime,
//   name: 'photo.jpg'
// };

// var data = new FormData();
// data.append('imagesArr', photo, photo.name);
// data.append('title', 'A beautiful photo!');
// console.log('data: ', data);

// let config = {
//   accept: 'application/json',
//   'Content-Type': 'multipart/form-data'
// };

// let result = axios.post(uploadAPI, data, { headers: config });
// console.log('result: ', result);
