import React, { Component } from 'react';
import { Icon } from 'native-base';
import { Block, Input, Text } from 'galio-framework';
import { TouchableOpacity } from 'react-native';
import { primaryColor, grayColor } from '../../config/Constants/Colors';
import { width } from '../../config/Constants/Dimensions';

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
        const { isFetching, totalAds, adsLength, totalQueryAds } = this.props;
        console.log('totalQueryAds: ', totalQueryAds);
        const { searchQuery } = this.state;
        return (
            <Block style={{ height: 110, backgroundColor: primaryColor }}>
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
                                    this.setState({ searchQuery: '' });
                                    this.props.cancelSearch();
                                }
                            }}
                            styleName='flexible'>
                            <Icon
                                style={{ fontSize: searchQuery.length > 0 ? 28 : 21, color: grayColor }}
                                name={searchQuery.length > 0 ? 'ios-close' : 'ios-search'}
                                type='Ionicons'
                            />
                        </TouchableOpacity>
                    }
                />
                <Block center>
                    <Text style={{ fontSize: 11, color: 'white' }}>
                        DB : {totalAds} - State : {adsLength}
                    </Text>

                    <Text style={{ fontSize: 11, color: 'white' }}>
                        Total {totalQueryAds && totalQueryAds} ads found for{' '}
                        {this.props.searchQuery && this.props.searchQuery}
                    </Text>

                    <Text style={{ fontSize: 11, color: 'white' }}>{isFetching && 'Fetching more.....'}</Text>
                </Block>
            </Block>
        );
    };
}
