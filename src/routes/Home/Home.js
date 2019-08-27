import React, { Component } from 'react';
import { StatusBar, ToastAndroid, Dimensions, View, RefreshControl } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { Block } from 'galio-framework';
import { Toast } from 'native-base';
import { searchMoreAds, searchAds, getLatestAds, getTotalAds, fetchMoreAds } from '../../config/Helpers/getAds';
import RenderSearch from './RenderSearch';
import RenderAd from './RenderAd';
import NetworkError from '../../components/Error/NetworkError';
import Loader from '../../components/Loader/Loader';
import { primaryColor } from '../../config/Constants/Colors';

const { width } = Dimensions.get('window');

const ViewTypes = {
    HALF_LEFT: 1,
    HALF_RIGHT: 2
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adsArr: [],
            totalAds: 0,
            isFetching: false,
            refreshing: false,
            noResult: false,
            noResultmessage: '',
            lastId: '',
            searchLastId: '',
            searchQuery: '',
            totalQueryAds: 0
        };

        this._layoutProvider = new LayoutProvider(
            (index) => {
                if (index % 2 === 0) {
                    return ViewTypes.HALF_LEFT;
                } else {
                    return ViewTypes.HALF_RIGHT;
                }
            },
            (type, dim) => {
                switch (type) {
                    case ViewTypes.HALF_LEFT:
                        dim.width = width / 2 - 0.0001;
                        dim.height = 160;
                        break;
                    case ViewTypes.HALF_RIGHT:
                        dim.width = width / 2;
                        dim.height = 160;
                        break;
                    default:
                        dim.width = 0;
                        dim.height = 0;
                }
            }
        );
    }

    render() {
        const {
            isFetching,
            totalAds,
            refreshing,
            searchLastId,
            noResult,
            noResultmessage,
            adsArr,
            totalQueryAds,
            searchQuery
        } = this.state;

        let arr = adsArr;

        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });
        let stateDataProvider = dataProvider.cloneWithRows(arr);

        return (
            <Block style={{ flex: 1 }}>
                <StatusBar backgroundColor={primaryColor} barStyle='light-content' />
                <RenderSearch
                    handleSearchQuery={this.handleSearchQuery}
                    searchQuery={searchQuery}
                    totalQueryAds={totalQueryAds}
                    cancelSearch={this.cancelSearch}
                    isFetching={isFetching}
                    adsLength={arr.length}
                    search={this.search}
                    totalAds={totalAds}
                />

                {noResult ? (
                    <NetworkError message={noResultmessage} iconName='magnify-close' cancelSearch={this.cancelSearch} />
                ) : (
                    <Block style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                        {arr.length > 0 && !noResult ? (
                            <RecyclerListView
                                onEndReached={searchLastId ? this.searchMore : this.fetchMore}
                                layoutProvider={this._layoutProvider}
                                dataProvider={stateDataProvider}
                                rowRenderer={this._rowRenderer}
                                scrollViewProps={{
                                    refreshControl: (
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={async () => {
                                                this.setState({ refreshing: true, searchQuery: '' });
                                                await this.latestFetch(100);
                                                console.log('refreshing false');
                                                this.setState({ refreshing: false });
                                            }}
                                        />
                                    )
                                }}
                            />
                        ) : (
                            <Loader color={primaryColor} />
                        )}
                    </Block>
                )}
            </Block>
        );
    }

    _rowRenderer = (type, data) => {
        switch (type) {
            case ViewTypes.HALF_LEFT:
                return (
                    <View style={styles.containerGridLeft}>
                        <RenderAd ad={data} />
                    </View>
                );
            // );
            case ViewTypes.HALF_RIGHT:
                return (
                    <View style={styles.containerGridRight}>
                        <RenderAd ad={data} />
                    </View>
                );
            default:
                return null;
        }
    };

    cancelSearch = () => {
        this.setState({
            lastId: '',
            searchLastId: '',
            searchQuery: '',
            noResult: false,
            totalQueryAds: ''
        });

        this.latestFetch(50);
    };

    getTotalAds = async () => {
        let totalAds = await getTotalAds();
        this.setState({
            totalAds
        });
    };

    componentDidMount = () => {
        this.latestFetch();
        this.getTotalAds();
    };

    latestFetch = async (n) => {
        this.setState({
            adsArr: [],
            lastId: ''
        });

        let count = n ? n : 66;

        try {
            let latestAds = await getLatestAds(count);
            let { ads, lastId } = latestAds;
            this.setState({
                adsArr: ads,
                lastId: lastId,
                noResult: false
            });
        } catch (error) {
            console.log('error: ', error);
            this.setState({
                noResult: true
            });
        }
    };

    fetchMore = async () => {
        console.log('fetching More');
        let { adsArr } = this.state;
        this.setState({
            isFetching: true
        });
        let moreAds = await fetchMoreAds(this.state.lastId);
        let { ads, lastId } = moreAds;
        let newArr = adsArr.concat(ads);

        this.setState({
            adsArr: newArr,
            lastId: lastId,
            isFetching: false
        });
    };

    searchMore = async () => {
        console.log('searching more ------->');
        let { adsArr } = this.state;

        this.setState({
            isFetching: true
        });
        const { searchLastId, searchQuery } = this.state;
        let moreAds = await searchMoreAds(searchQuery, searchLastId);
        console.log('moreAds: ', moreAds);
        let { ads, lastId, status } = moreAds;
        if (status !== 200) {
            Toast.show({
                text: `No more ${searchQuery} ads found!`,
                buttonText: 'Okay',
                duration: 3000,
                type: 'danger'
            });
            this.setState({
                isFetching: false
            });
            return;
        }

        let newArr = adsArr.concat(ads);

        this.setState({
            adsArr: newArr,
            searchLastId: lastId,
            isFetching: false
        });
    };

    handleSearchQuery = (searchQuery) => {
        console.log('searchQuery: ', searchQuery);
        this.setState({ searchQuery });
    };

    search = async () => {
        const { searchQuery } = this.state;
        console.log('initial search ------->');
        if (!searchQuery) {
            ToastAndroid.show('Please enter something!', ToastAndroid.SHORT);
            return;
        }

        this.setState({
            searchQuery: searchQuery,
            isFetching: true
        });

        let searchedAds = await searchAds(searchQuery);
        let { ads, lastId, status, totalQueryAds } = searchedAds;
        console.log('status: ', status);

        if (status !== 200) {
            // ToastAndroid.show('No result found!', ToastAndroid.SHORT);
            Toast.show({
                text: 'No result found!',
                buttonText: 'Okay',
                duration: 3000,
                type: 'danger'
            });
            this.setState({
                isFetching: false,
                noResult: true,
                noResultmessage: `No ad found containing "${searchQuery}"`
            });
            // this.latestFetch();
            return;
        }
        this.setState({
            adsArr: []
        });

        this.setState({
            totalQueryAds: totalQueryAds,
            adsArr: ads,
            searchLastId: lastId,
            isFetching: false
        });
    };
}

export default Home;

const styles = {
    containerGridLeft: {
        marginTop: 5,
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1
    },
    containerGridRight: {
        marginTop: 5,
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1
    }
};
