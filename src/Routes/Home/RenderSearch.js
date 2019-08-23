import React, { Component } from 'react';
import { Icon } from 'native-base';
import { Block, Input, Card, Button, Text } from 'galio-framework';
import { StatusBar, TouchableOpacity, Animated, ToastAndroid } from 'react-native';
import { primaryColor, grayColor, facebookColor, googleColor } from '../../Constants/Colors';
import { width } from '../../Constants/Dimensions';

export default class RenderSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: ''
        };
    }
    render() {
        return <Block>{this.renderSearchBar()}</Block>;
    }
    search = () => {
        const { searchQuery } = this.state;
        if (searchQuery) {
            this.props.search(searchQuery);
        }
    };
    renderSearchBar = () => {
        const { isFetching, totalAds, adsLength } = this.props;
        const { searchQuery } = this.state;
        return (
            <Block style={{ height: 95, backgroundColor: primaryColor }}>
                <Input
                    value={searchQuery}
                    onChangeText={(searchQuery) => this.setState({ searchQuery })}
                    placeholder='Search...'
                    borderless
                    placeholderTextColor={grayColor}
                    onSubmitEditing={this.search}
                    style={{
                        borderRadius: 1,
                        height: 38,
                        width: width - 32,
                        marginHorizontal: 14,
                        marginTop: 10
                    }}
                    right
                    iconContent={
                        <TouchableOpacity
                            onPress={() => {
                                if (searchQuery.length > 0) {
                                    this.setState({ searchQuery: '', searchArr: [] });
                                    // this.initialSearch();
                                }
                            }}
                            styleName='flexible'>
                            <Icon
                                style={{ fontSize: 21, color: grayColor }}
                                name={searchQuery.length > 0 ? 'ios-close' : 'ios-search'}
                                type='Ionicons'
                            />
                        </TouchableOpacity>
                    }
                />
                <Block center>
                    <Text style={{ fontSize: 11, color: 'white' }}>
                        Total : {totalAds} - Redux : {adsLength}
                    </Text>
                    <Text style={{ fontSize: 11, color: 'white' }}>{isFetching && 'Fetching more.....'}</Text>
                </Block>
            </Block>
        );
    };
}
