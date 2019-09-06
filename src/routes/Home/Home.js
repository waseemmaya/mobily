import React, { Component } from 'react';
import { View, RefreshControl } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { Block } from 'galio-framework';
import RenderAd from './RenderAd';
import NetworkError from '../../components/Error/NetworkError';
import Loader from '../../components/Loader/Loader';
import { primaryColor } from '../../config/Constants/Colors';
import { withAds } from '../../contexts/AdContext';
import RenderSearchBar from '../../components/RenderSearchBar/RenderSearchBar';
import { width } from '../../config/Constants/Dimensions';
import SearchEnabledPage from '../../components/SearchEnabledPage';

const ViewTypes = {
    HALF_LEFT: 1,
    HALF_RIGHT: 2,
    FULL: 0
};

class Home extends Component {
    constructor(props) {
        super(props);

        this._layoutProvider = new LayoutProvider(
            (index) => {
                return ViewTypes.FULL;
            },
            (type, dim) => {
                switch (type) {
                    case ViewTypes.FULL:
                        dim.width = width;
                        dim.height = 120;
                        break;
                    default:
                        dim.width = 0;
                        dim.height = 0;
                }
            }
        );
    }

    render() {
        return (
            <Block style={{ flex: 1 }}>
                <RenderSearchBar />
                {this.renderMainScreen()}
            </Block>
        );
    }

    renderMainScreen = () => {
        const {
            user,
            adsArr,
            refreshing,
            latestFetch,
            noResultMessage,
            noResult,
            cancelSearch,
            searchEnabled,
            isFetching
        } = this.props.adState;

        if (searchEnabled) {
            return <SearchEnabledPage />;
        }

        if (noResult) {
            return <NetworkError message={noResultMessage} iconName='magnify-close' cancelSearch={cancelSearch} />;
        }

        if (adsArr.length < 1) {
            return <Loader color={primaryColor} />;
        }

        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });
        let stateDataProvider = dataProvider.cloneWithRows(adsArr);

        return (
            <Block style={{ flex: 1 }}>
                <Block style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                    <RecyclerListView
                        layoutProvider={this._layoutProvider}
                        dataProvider={stateDataProvider}
                        rowRenderer={this._rowRenderer}
                        onEndReachedThreshold={10}
                        onEndReached={this.renderMore}
                        renderFooter={this.renderFooter}
                        scrollViewProps={{
                            refreshControl: (
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={async () => {
                                        await latestFetch(100);
                                    }}
                                />
                            )
                        }}
                    />
                </Block>
            </Block>
        );
    };

    renderFooter = () => {
        const { isFetching } = this.props.adState;
        //Second view makes sure we don't unnecessarily change height of the list on this event. That might cause indicator to remain invisible
        //The empty view can be removed once you've fetched all the data
        return isFetching ? <Loader style={{ margin: 30 }} color={primaryColor} /> : <View style={{ height: 60 }} />;
    };

    renderMore = () => {
        const { searchLastId, fetchMore, searchMore, lastId } = this.props.adState;
        if (lastId) {
            fetchMore();
        } else if (searchLastId) {
            searchMore();
        }
    };

    _rowRenderer = (type, ad) => {
        const { user, getUser } = this.props.adState;
        let { favtAds } = user;

        switch (type) {
            case ViewTypes.FULL:
                return <RenderAd ad={ad} />;

            default:
                return null;
        }
    };
}

export default withAds(Home);
