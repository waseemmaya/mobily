import React, { Component } from 'react';
import { Block } from 'galio-framework';
import { StatusBar, ToastAndroid, Text, FlatList, View } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import { Screen } from '@shoutem/ui';
import { primaryColor } from '../../Constants/Colors';
import { connect } from 'react-redux';
import { addTask } from '../../Redux/actions/actions';
import { getLatestAds } from '../../Helpers/getAds';
import { getTotalAds } from '../../Helpers/getAds';
import { fetchMoreAds } from '../../Helpers/getAds';
import { searchAds } from '../../Helpers/getAds';
import RenderSearch from './RenderSearch';
// import Grid from 'react-native-infinite-scroll-grid';
import RenderAd from './RenderAd';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
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
            searchEnabled: false
        };
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%'
                }}
            />
        );
    };

    shouldComponentUpdate() {
        return true;
    }

    render() {
        const { isFetching, totalAds } = this.state;
        let { tasks } = this.props;
        if (!tasks) {
            return <DotIndicator color={primaryColor} size={10} />;
        }
        return (
            <Block style={{ flex: 1 }}>
                <StatusBar backgroundColor={primaryColor} barStyle='light-content' />
                <RenderSearch
                    isFetching={isFetching}
                    adsLength={tasks.length}
                    search={this.search}
                    totalAds={totalAds}
                />
                <Screen style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                    <OptimizedFlatList
                        maxToRenderPerBatch={30}
                        data={tasks}
                        initialNumToRender={30}
                        renderItem={(ad) => (
                            <RenderAd ad={ad} />
                            // <Text style={{ fontSize: 13, color: 'black' }} numberOfLines={1}>
                            //     {ad.index} - {ad.item.adTitle}
                            // </Text>
                        )}
                        keyExtractor={(item) => item._id}
                        onEndReached={this.fetchMore}
                        onEndReachedThreshold={150}
                    />
                    {/* <FlatList
                        data={tasks}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={(ad) => <RenderAd ad={ad} />}
                        onEndReached={() => this.fetchMore()}
                        loadingMore={this.state.isFetching}
                    /> */}
                    {/* <Grid
                        numColumns={1}
                        data={tasks}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={(ad) => <RenderAd ad={ad} />}
                        // onRefresh={() => this.props.initialSearch()}
                        // refreshing={this.props.isFetching}
                        onEndReached={() => this.fetchMore()}
                        loadingMore={this.state.isFetching}
                        marginExternal={6}
                        marginInternal={6}
                    /> */}
                </Screen>
            </Block>
        );
    }

    componentDidMount = async () => {
        console.log('initial fetch');
        // total ads length
        let totalAds = await getTotalAds();
        // lastest ads || initail search ads
        let latestAds = await getLatestAds();
        let { ads, lastId } = latestAds;
        this.props.addTask(ads);
        this.setState({
            totalAds,
            lastId: lastId
        });
    };

    fetchMore = async () => {
        console.log('fetchMore');

        this.setState({
            isFetching: true
        });
        let moreAds = await fetchMoreAds(this.state.lastId);
        let { ads, lastId } = moreAds;
        this.setState({
            lastId: lastId,
            isFetching: false
        });
        this.props.addTask(ads);
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

        let searchedAds = await searchAds(searchQuery);

        let { ads, lastId } = searchedAds;
        if (ads) {
            ToastAndroid.show('No result found!', ToastAndroid.SHORT);
            this.setState({
                searchEnabled: false
            });
            return;
        }

        this.setState({
            searchArr: ads,
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
        addTask: (task) => dispatch(addTask(task))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
