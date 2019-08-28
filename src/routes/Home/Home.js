import React, { Component } from 'react';
import { StatusBar, View, RefreshControl } from 'react-native';
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
    HALF_RIGHT: 2
};

class Home extends Component {
    constructor(props) {
        super(props);

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
        return (
            <Block style={{ flex: 1 }}>
                <StatusBar backgroundColor={primaryColor} barStyle='light-content' />
                <RenderSearchBar />
                {this.renderMainScreen()}
            </Block>
        );
    }

    renderMainScreen = () => {
        const {
            adsArr,
            refreshing,
            latestFetch,
            noResultMessage,
            noResult,
            cancelSearch,
            searchEnabled
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

    renderMore = () => {
        const { searchLastId, fetchMore, searchMore, lastId } = this.props.adState;
        if (lastId) {
            fetchMore();
        } else if (searchLastId) {
            searchMore();
        }
    };

    _rowRenderer = (type, data) => {
        switch (type) {
            case ViewTypes.HALF_LEFT:
                return (
                    <View style={styles.containerGridLeft}>
                        <RenderAd ad={data} />
                    </View>
                );
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
}

export default withAds(Home);

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
