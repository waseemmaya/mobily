import React, { Component } from 'react';
import { Text, Image, ScrollView } from 'react-native';
import { Button, Block } from 'galio-framework';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import API from '../../config/API/API';
import ImageResizer from 'react-native-image-resizer';
import { ThemeContext } from '../../contexts/ThemeContext';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagesArrays: [],
            imagesArrays2: [],
            isUploading: false,
            resizedImages: [],
            uri: ''
        };
    }
    render() {
        const { imagesArrays, isUploading } = this.state;
        const colorContext = this.context;
        const { color } = colorContext;
        return (
            <Block style={{ flex: 1 }}>
                <Block style={{ height: 70, backgroundColor: color }}>
                    <Text> Category </Text>
                </Block>
                {isUploading && <Loader color={color} />}
                {!isUploading && (
                    <Block>
                        <Button
                            style={{
                                width: 100,
                                marginTop: 15,
                                backgroundColor: color
                            }}
                            onPress={this.selectImage}>
                            Select Images
                        </Button>
                        <Button
                            style={{
                                width: 100,
                                marginTop: 15,
                                backgroundColor: color
                            }}
                            onPress={this.resizeAndUpload}>
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
                                                source={{ uri: this.state.uri }}
                                            />
                                        );
                                    })}
                            </ScrollView>
                        </Block>
                    </Block>
                )}
            </Block>
        );
    }

    resizeAndUpload = async () => {
        const { imagesArrays } = this.state;
        if (imagesArrays.length === 0) {
            console.log('No image selected');
            return;
        }

        let newImages = await Promise.all(
            imagesArrays.map(async (origImg, i) => {
                console.log('origImg: ', origImg);
                let img = await ImageResizer.createResizedImage(origImg.path, 1000, origImg.height, 'JPEG', 80);
                img.mime = origImg.mime;
                img.height = origImg.height;
                img.modificationDate = origImg.modificationDate;
                console.log('img: ', img);
                return img;
            })
        );

        console.log('newImages: ', newImages);
        this.setState({
            imagesArrays2: newImages
        });
        await this.uploadImages();
    };

    selectImage = async () => {
        try {
            let imagesArrays = await ImagePicker.openPicker({
                mediaType: 'photo',
                multiple: true
            });
            this.setState({
                imagesArrays: imagesArrays
            });
        } catch (error) {
            console.log('error: ', error);
        }
    };

    uploadImages = async () => {
        const { imagesArrays2 } = this.state;
        if (imagesArrays2.length === 0) {
            console.log('No image selected');
            return;
        }
        this.setState({
            isUploading: true
        });

        let data = new FormData();
        for (let i = 0; i < imagesArrays2.length; i++) {
            var photo = {
                uri: imagesArrays2[i].uri,
                type: imagesArrays2[i].mime,
                name: `${imagesArrays2[i].modificationDate}`
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
                imagesArrays2: []
            });
        } catch (error) {
            this.setState({
                isUploading: false
            });
            console.log('upload error --->: ', error);
        }
    };
}

Category.contextType = ThemeContext;
