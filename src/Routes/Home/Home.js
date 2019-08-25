import React, { Component } from 'react';
import { Block } from 'galio-framework';
import { StatusBar, ToastAndroid, Text, Dimensions, View, RefreshControl } from 'react-native';
import { Spinner } from 'native-base';

import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { primaryColor } from '../../Constants/Colors';
import { connect } from 'react-redux';
import { addTask, removeTask } from '../../Redux/actions/actions';
import { searchMoreAds, searchAds, getLatestAds, getTotalAds, fetchMoreAds } from '../../Helpers/getAds';
import RenderSearch from './RenderSearch';
import RenderAd from './RenderAd';
import NetworkError from '../../Error/NetworkError';
import RecylerView from './RecylerView';
import Loader from '../../Components/Loader/Loader';

// import Home3 from './Home3';
const { width } = Dimensions.get('window');

const ViewTypes = {
    HALF_LEFT: 1,
    HALF_RIGHT: 2
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastId: '',
            searchQuery: '',
            isFetching: false,
            adsArr: [],
            totalAds: 0,
            refreshing: false,
            searchLastId: '',
            searchQuery: '',
            noResult: false,
            noResultmessage: ''
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
        const { isFetching, totalAds, refreshing, searchLastId, noResult, noResultmessage } = this.state;
        let { tasks } = this.props;

        let arr = tasks;

        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });
        let stateDataProvider = dataProvider.cloneWithRows(arr);

        return (
            <Block style={{ flex: 1 }}>
                <StatusBar backgroundColor={primaryColor} barStyle='light-content' />
                <RenderSearch
                    cancelSearch={this.cancelSearch}
                    isFetching={isFetching}
                    adsLength={arr.length}
                    search={this.search}
                    totalAds={totalAds}
                />
                {noResult ? (
                    <NetworkError message={noResultmessage} latestFetch={this.latestFetch} />
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
                                                // analytics.logEvent('Event_Stagg_pull_to_refresh');
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
            searchLastId: '',
            searchQuery: '',
            noResult: false
        });

        this.latestFetch(50);
    };
    getTotalAds = async () => {
        // total ads length
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
        this.props.removeTask();

        let count = n ? n : 66;

        // lastest ads || initail search ads
        let latestAds = await getLatestAds(count);
        let { ads, lastId } = latestAds;
        this.props.addTask(ads);
        this.setState({
            lastId: lastId,
            noResult: false
        });
    };

    fetchMore = async () => {
        console.log('fetching More');
        this.setState({
            isFetching: true
        });
        let moreAds = await fetchMoreAds(this.state.lastId);
        let { ads, lastId } = moreAds;
        this.props.addTask(ads);
        this.setState({
            lastId: lastId,
            isFetching: false
        });
    };

    searchMore = async () => {
        console.log('searching more ------->');
        this.setState({
            isFetching: true
        });
        const { searchLastId, searchQuery } = this.state;
        let moreAds = await searchMoreAds(searchQuery, searchLastId);
        if (!ads) {
            ToastAndroid.show('No more ads found!', ToastAndroid.SHORT);
            this.setState({
                isFetching: false
            });
            return;
        }
        let { ads, lastId } = moreAds;
        this.props.addTask(ads);
        this.setState({
            lastId: lastId,
            isFetching: false
        });
    };

    search = async (searchQuery) => {
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
        let { ads, lastId, status } = searchedAds;
        console.log('status: ', status);

        if (status !== 200) {
            ToastAndroid.show('No result found!', ToastAndroid.SHORT);
            this.setState({
                isFetching: false,
                noResult: true,
                noResultmessage: `No ad found containing "${searchQuery}"`
            });
            // this.latestFetch();
            return;
        }
        this.props.removeTask();

        this.props.addTask(ads);
        this.setState({
            searchLastId: lastId,
            isFetching: false
        });
    };
}

const mapStateToProps = (state) => {
    return {
        tasks: state.reducers.tasks
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (task) => dispatch(addTask(task)),
        removeTask: (task) => dispatch(removeTask())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

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

// <SkypeIndicator color={primaryColor} size={30} />
// <Indicator color={primaryColor} size={30} />
// <BallIndicator color={primaryColor} size={30} />
// <BarIndicator color={primaryColor} size={30} />
// <MaterialIndicator color={primaryColor} size={30} />
// <PulseIndicator color={primaryColor} size={30} />
// <UIActivityIndicator color={primaryColor} size={30} />
