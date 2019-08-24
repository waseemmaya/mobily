import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import RenderAd from './RenderAd';

const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2
};

export default class RecycleTestComponent extends React.Component {
    constructor(args) {
        super(args);

        let { width } = Dimensions.get('window');

        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });

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

        this._rowRenderer = this._rowRenderer.bind(this);
        const { arr } = this.props;
        this.state = {
            dataProvider: dataProvider.cloneWithRows(arr)
        };
    }

    _rowRenderer(type, data) {
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
    }

    render() {
        return (
            <RecyclerListView
                layoutProvider={this._layoutProvider}
                dataProvider={this.state.dataProvider}
                rowRenderer={this._rowRenderer}
            />
        );
    }
}
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
