import React, { Component } from 'react';
import { Block } from 'galio-framework';
import { StatusBar, ToastAndroid, Text, Dimensions, View, ScrollView, RefreshControl } from 'react-native';
import { Screen } from '@shoutem/ui';
import { DotIndicator, WaveIndicator } from 'react-native-indicators';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { primaryColor } from '../../Constants/Colors';
import { connect } from 'react-redux';
import { addTask, removeTask } from '../../Redux/actions/actions';
import { getLatestAds } from '../../Helpers/getAds';
import { getTotalAds } from '../../Helpers/getAds';
import { fetchMoreAds } from '../../Helpers/getAds';
import { searchAds } from '../../Helpers/getAds';
import RenderSearch from './RenderSearch';
import RenderAd from './RenderAd';
// import Home3 from './Home3';
const { width } = Dimensions.get('window');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastId: '',
            searchQuery: '',
            isFetching: false,
            adsArr: [],
            searchArr: [],
            totalAds: 0,
            searchEnabled: false,
            refreshing: false
        };

        this._layoutProvider = new LayoutProvider(
            () => {
                return 0;
            },
            (type, dim) => {
                dim.width = width;
                dim.height = 120;
            }
        );
    }

    render() {
        const { isFetching, totalAds, refreshing, searchArr, searchEnabled } = this.state;
        let { tasks } = this.props;

        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });

        let arr = searchArr.length > 0 ? searchArr : tasks;

        let stateDataProvider = dataProvider.cloneWithRows(arr);

        return (
            <Block style={{ flex: 1 }}>
                <StatusBar backgroundColor={primaryColor} barStyle='light-content' />
                <RenderSearch isFetching={isFetching} adsLength={arr.length} search={this.search} totalAds={totalAds} />

                <Screen style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                    {searchEnabled && <WaveIndicator color={primaryColor} size={40} />}
                    {arr.length > 0 ? (
                        <RecyclerListView
                            onEndReached={this.fetchMore}
                            layoutProvider={this._layoutProvider}
                            dataProvider={stateDataProvider}
                            rowRenderer={(type, data) => <RenderAd ad={data} />}
                            scrollViewProps={{
                                refreshControl: (
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={async () => {
                                            this.setState({ refreshing: true });
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
                        // <Home3 fetchMore={this.fetchMore} tasks={tasks} />
                        <WaveIndicator color={primaryColor} size={40} />
                    )}
                </Screen>
            </Block>
        );
    }

    componentDidMount = () => {
        this.latestFetch();
        this.getTotalAds();
    };

    getTotalAds = async () => {
        // total ads length
        let totalAds = await getTotalAds();
        this.setState({
            totalAds
        });
    };

    latestFetch = async (n) => {
        this.props.removeTask();

        let count = n ? n : 66;
        console.log('count: ', count);

        // lastest ads || initail search ads
        let latestAds = await getLatestAds(count);
        console.log('latestAds: ', latestAds);
        let { ads, lastId } = latestAds;
        this.props.addTask(ads);
        this.setState({
            lastId: lastId
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

    search = async (searchQuery) => {
        if (!searchQuery) {
            ToastAndroid.show('Please enter something!', ToastAndroid.SHORT);
            return;
        }
        this.setState({
            searchArr: [],
            searchEnabled: true
        });
        this.props.removeTask();

        let searchedAds = await searchAds(searchQuery);

        let { ads, lastId } = searchedAds;
        if (ads.length === 0) {
            ToastAndroid.show('No result found!', ToastAndroid.SHORT);
            this.setState({
                searchEnabled: false
            });
            this.latestFetch();
            return;
        }

        this.props.addTask(ads);
        this.setState({
            lastId: lastId,
            searchEnabled: false
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

// <SkypeIndicator color={primaryColor} size={30} />
// <Indicator color={primaryColor} size={30} />
// <BallIndicator color={primaryColor} size={30} />
// <BarIndicator color={primaryColor} size={30} />
// <MaterialIndicator color={primaryColor} size={30} />
// <PulseIndicator color={primaryColor} size={30} />
// <UIActivityIndicator color={primaryColor} size={30} />
