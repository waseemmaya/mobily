import React, { Component } from 'react';
import { Icon } from 'native-base';
import { Block, Input, Card, Button, Text } from 'galio-framework';
import { StatusBar, TouchableOpacity, Animated, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DotIndicator } from 'react-native-indicators';
import axios from 'axios';
import { width } from '../../Constants/Dimensions';
import { primaryColor, grayColor } from '../../Constants/Colors';
import Home2 from './Home2';
import Home3 from './Home3';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearchingEnabled: false,
            lastId: '',
            searchQuery: '',
            isFetching: false,
            adsArr: [],
            isInit: false,
            searchArr: [],
            scrollY: new Animated.Value(0)
        };
    }

    render() {
        const { isFetching, adsArr, searchArr } = this.state;

        let arr = searchArr.length > 0 ? searchArr : adsArr;

        return (
            <Block style={{ flex: 1 }}>
                <StatusBar backgroundColor={primaryColor} barStyle='light-content' />
                <Block>{this.renderSearchBar(arr.length)}</Block>
                {arr.length < 1 ? (
                    <DotIndicator color={primaryColor} size={10} />
                ) : (
                    <Home2
                        initialSearch={this.initialSearch}
                        isFetching={isFetching}
                        fetchMore={this.fetchMore}
                        adsArr={arr}
                        props={this.props}
                    />
                )}
                {/* {adsArr.length < 1 ? (
                    <DotIndicator color={primaryColor} size={10} />
                ) : (
                    <Home3 isFetching={isFetching} fetchMore={this.fetchMore} adsArr={adsArr} props={this.props} />
                )} */}
                {/* 
                <Block center>
                    <Button
                        style={{
                            width: 100,
                            marginBottom: 15,
                            backgroundColor: primaryColor
                        }}
                        onPress={this.fetchMore}>
                        Fetch More
                    </Button>
                </Block> */}
                {/* {adsArr.length < 1 ? (
                    <DotIndicator color={primaryColor} size={10} />
                ) : (
                    <ScrollView>
                        <Block style={{ margin: 20 }}>
                            {this.state.adsArr.map((v, i) => {
                                return (
                                    <TouchableOpacity
                                        key={i}
                                        activeOpacity={0.6}
                                        onPress={() => this.props.navigation.navigate('ViewAd', { adObj: v })}>
                                        <Block>
                                            <Card
                                                card
                                                shadow
                                                borderless
                                                avatar={v.adsImages[0].thumb}
                                                authorTitle='Offset'
                                                authorSubTitle='420 minutes ago'
                                                neutral
                                                location={v.location}
                                                fullBackgroundImage
                                                caption={`${v.description.length > 40
                                                    ? v.description.substring(0, 40 - 3) + '...'
                                                    : v.description}`}
                                                image={v.adsImages[0].small}
                                                title={`${v.adNumber}-${v.adTitle}`}
                                            />
                                            <Block style={{ marginTop: 20 }} />
                                        </Block>
                                    </TouchableOpacity>
                                );
                            })}
                        </Block>
                        <Block center>
                            <Button
                                style={{
                                    width: 100,
                                    marginBottom: 15,
                                    backgroundColor: primaryColor
                                }}
                                onPress={this.fetchMore}>
                                Fetch More
                            </Button>
                        </Block>
                    </ScrollView>
                )} */}
            </Block>
        );
    }

    componentDidMount = () => {
        this.initialSearch();
    };

    initialSearch = async () => {
        this.setState({
            adsArr: [],
            isFetching: true
        });

        let adsAPI = 'https://mobily-pk.herokuapp.com/ads';
        let data = await axios.get(adsAPI);
        let { ads, lastId } = data.data;
        this.setState({
            adsArr: ads,
            lastId: lastId,
            isFetching: false
        });
    };

    fetchMore = async () => {
        // ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
        this.setState({
            isFetching: true
        });
        var { adsArr } = this.state;
        let moreAdsApi = `https://mobily-pk.herokuapp.com/ads/more/${this.state.lastId}`;

        let data = await axios.get(moreAdsApi);
        let { ads, lastId } = data.data;
        let newArr = adsArr.concat(ads);
        this.setState({
            adsArr: newArr,
            lastId: lastId,
            isFetching: false
        });
    };

    search = async () => {
        const { searchQuery } = this.state;
        if (!searchQuery) {
            return;
        }
        this.setState({
            searchArr: []
        });

        let searchApi = `https://mobily-pk.herokuapp.com/ads/search/${searchQuery}`;

        try {
            let data = await axios.get(searchApi);
            console.log('data: ', data);
            let { ads, lastId } = data.data;
            this.setState({
                searchArr: ads,
                lastId: lastId
            });
        } catch (error) {
            console.log('error: ', error);
        }
    };

    componentWillUnmount = () => {
        this.setState({
            isSearchingEnabled: false
        });
    };

    renderSearchBar = (adsLength) => {
        const { searchQuery } = this.state;
        return (
            <Block style={{ height: 90, backgroundColor: primaryColor }}>
                <Input
                    value={searchQuery}
                    onChangeText={(searchQuery) => this.setState({ searchQuery })}
                    placeholder='Search...'
                    borderless
                    // onFocus={() => this.setState({ isSearchingEnabled: true })}
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
                    <Text muted style={{ fontSize: 11 }}>
                        Total Length : {adsLength}
                    </Text>
                </Block>
            </Block>
        );
    };
}
