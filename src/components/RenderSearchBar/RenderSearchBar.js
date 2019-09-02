import React, { useEffect } from 'react';
import { Icon } from 'native-base';
import { Block, Input, Text } from 'galio-framework';
import { TouchableOpacity, Keyboard } from 'react-native';
import { primaryColor, grayColor } from '../../config/Constants/Colors';
import { width } from '../../config/Constants/Dimensions';
import { withAds } from '../../contexts/AdContext';

RenderSearchBar = (props) => {
    const {
        adsArr,
        totalAds,
        totalQueryAds,
        isFetching,
        search,
        handleSearchQuery,
        cancelSearch,
        searchQuery,
        enableSearch,
        disableSearch,
        searchEnabled
    } = props.adState;

    forceLoseFocus = () => {
        if (!searchQuery) {
            disableSearch();
            console.warn('hide');
        }
    };
    useEffect(() => {
        Keyboard.addListener('keyboardDidHide', forceLoseFocus);
    }, []);

    return (
        <Block style={{ height: 110, backgroundColor: primaryColor }}>
            {/* {searchEnabled && (
                <TouchableOpacity onPress={disableSearch} styleName='flexible'>
                    <Icon style={{ fontSize: 28, color: grayColor }} name='ios-close' type='Ionicons' />
                </TouchableOpacity>
            )} */}
            <Input
                onFocus={enableSearch}
                // onBlur={disableSearch}
                value={searchQuery}
                onChangeText={(e) => handleSearchQuery(e)}
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
                                cancelSearch();
                                disableSearch();
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
                    DB : {totalAds} - State : {adsArr.length}
                </Text>

                <Text style={{ fontSize: 11, color: 'white' }}>
                    Total {totalQueryAds && totalQueryAds} ads found for {searchQuery && searchQuery}
                </Text>

                <Text style={{ fontSize: 11, color: 'white' }}>{isFetching && 'Fetching more.....'}</Text>
            </Block>
        </Block>
    );
};

export default withAds(RenderSearchBar);
