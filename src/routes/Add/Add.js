import React, { Component } from 'react';
import { Block, Text } from 'galio-framework';
import { StatusBar } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Item, Picker, Icon } from 'native-base';
import { ThemeContext } from '../../contexts/ThemeContext';

export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adTitle: '',
            province: ''
        };
    }
    render() {
        let colorContext = this.context;
        let { color } = colorContext;
        console.warn('-1-color: ', color);
        return (
            <Block>
                <Block middle style={{ height: 50, backgroundColor: color }}>
                    <Text h5 color={whiteColor}>
                        Post your Ad
                    </Text>
                </Block>
                <Block style={{ marginLeft: 30, marginRight: 30 }}>{this.renderStep1()}</Block>
            </Block>
        );
    }

    renderStep1 = () => {
        const { adTitle, province } = this.state;
        return (
            <Block block>
                <Block>
                    <TextField
                        value={adTitle}
                        onChangeText={(adTitle) => this.setState({ adTitle })}
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        returnKeyType='next'
                        label='Ad Title'
                    />
                </Block>
                <Block>
                    <Item picker>
                        <Picker
                            mode='dropdown'
                            iosIcon={<Icon name='arrow-down' />}
                            style={{
                                marginLeft: -10,
                                color: !province ? grayColor : 'black'
                            }}
                            placeholder='Select your city'
                            placeholderStyle={{ color: grayColor }}
                            placeholderIconColor={grayColor}
                            selectedValue={province}
                            onValueChange={this.onValueChange2}>
                            <Picker.Item label='Select your city' value='Select your city' />
                            <Picker.Item label='Karachi' value='karachi' />
                            <Picker.Item label='Lahore' value='lahore' />
                            <Picker.Item label='Multan' value='multan' />
                        </Picker>
                    </Item>
                </Block>
                {/* <Block>
          <Text muted>Description</Text>
          <TextInput style={{ borderBottomColor: 'black', height : 100 }} numberOfLines={5} />
        </Block> */}
                <Block />
            </Block>
        );
    };

    onValueChange2 = (value) => {
        this.setState({
            province: value
        });
    };

    renderStep2 = () => {
        return (
            <Block>
                <Text>Step 1</Text>
            </Block>
        );
    };

    renderStep3 = () => {
        return (
            <Block>
                <Text>Step 1</Text>
            </Block>
        );
    };
}

Add.contextType = ThemeContext;
