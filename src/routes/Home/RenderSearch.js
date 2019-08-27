import React, { Component } from 'react';
import { Icon } from 'native-base';
import { Block, Input, Text } from 'galio-framework';
import { TouchableOpacity } from 'react-native';
import { primaryColor, grayColor } from '../../config/Constants/Colors';
import { width } from '../../config/Constants/Dimensions';

export default class RenderSearch extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Block>{this.renderSearchBar()}</Block>;
    }

    renderSearchBar = () => {
        const { isFetching, totalAds, adsLength, totalQueryAds, searchQuery, search } = this.props;
        console.log('search: ', search);
        console.log('searchQuery: ', searchQuery);
        return (
            <Block style={{ height: 110, backgroundColor: primaryColor }}>
                <Input
                    value={searchQuery}
                    onChangeText={(searchQuery) => this.props.handleSearchQuery(searchQuery)}
                    placeholder='Search...'
                    borderless
                    placeholderTextColor={grayColor}
                    onSubmitEditing={search}
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
