import React, { Component } from 'react';
import { View, RefreshControl } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { Block } from 'galio-framework';
import RenderAd from './RenderAd';
import Loader from '../../components/Loader/Loader';
import { width } from '../../config/Constants/Dimensions';
import { AdContext } from '../../contexts/AdContext';
import RenderSearchBar from '../../components/RenderSearchBar/RenderSearchBar';

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

    componentDidMount() {
        let ads = this.context;
        ads.getUser();
    }

    renderMainScreen = () => {
        let ads = this.context;
        const { adsArr, refreshing, latestFetch } = ads;

        if (adsArr.length < 1) {
            return <Loader />;
        }

        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });
        let stateDataProvider = dataProvider.cloneWithRows(adsArr);

        return (
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
        );
    };

    renderFooter = () => {
        let ads = this.context;
        return ads.isFetching ? <Loader style={{ margin: 30 }} /> : <View style={{ height: 60 }} />;
    };

    renderMore = () => {
        let ads = this.context;
        const { fetchMore, lastId } = ads;
        if (lastId) {
            fetchMore();
        }
    };

    _rowRenderer = (type, ad) => {
        switch (type) {
            case ViewTypes.FULL:
                return <RenderAd ad={ad} />;

            default:
                return null;
        }
    };
}

Home.contextType = AdContext;
export default Home;
