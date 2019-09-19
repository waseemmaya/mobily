import React, { useEffect, useContext } from 'react';
import { Icon } from 'native-base';
import { Block, Input, Text } from 'galio-framework';
import { TouchableOpacity, Keyboard } from 'react-native';
import { grayColor } from '../../config/Constants/Colors';
import { width } from '../../config/Constants/Dimensions';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AdContext } from '../../contexts/AdContext';

RenderSearchBar = (props) => {
    const themeContext = useContext(ThemeContext);
    const { color } = themeContext;

    const adContext = useContext(AdContext);
    const { adsArr, totalAds } = adContext;

    keyboardHide = () => {
        console.warn('hide');
    };
    useEffect(() => {
        Keyboard.addListener('keyboardDidHide', keyboardHide);
    }, []);

    return (
        <Block style={{ height: 110, backgroundColor: color }}>
            <Input
                // onFocus={enableSearch}
                // onBlur={disableSearch}
                // value={searchQuery}
                placeholder='Search...'
                borderless
                placeholderTextColor={grayColor}
                // onSubmitEditing={search}
                style={{
                    borderRadius: 1,
                    height: 38,
                    width: width - 32,
                    marginHorizontal: 14,
                    marginTop: 10
                }}
                right
                iconContent={
                    <TouchableOpacity //     } //         disableSearch(); //         cancelSearch(); //     if (searchQuery.length > 0) { // onPress={() => {
                    // }}
                    styleName='flexible'>
                        {/* <Icon
                            style={{ fontSize: 28, color: grayColor }}
                            name={false ? 'ios-close' : 'ios-search'}
                            type='Ionicons'
                        /> */}
                    </TouchableOpacity>
                }
            />
            <Block center>
                <Text style={{ fontSize: 11, color: 'white' }}>
                    DB : {totalAds} - State : {adsArr.length}
                </Text>
            </Block>
        </Block>
    );
};

export default RenderSearchBar;
