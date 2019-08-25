import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import RenderAd from './RenderAd';
const { width } = Dimensions.get('window');

export default class Home3 extends PureComponent {
    constructor(props) {
        super(props);

        let dataProvider = new DataProvider((r1, r2) => {
            console.log('r2: ', r2);
            console.log('r1: ', r1);
            return r1 !== r2;
        });

        this._layoutProvider = new LayoutProvider(
            () => {
                return 0;
            },
            (type, dim) => {
                console.log('type: ', type);
                console.log('dim: ', dim);
                dim.width = width;
                dim.height = 120;
            }
        );

        const { tasks } = this.props;
        this.state = {
            dataProvider: dataProvider.cloneWithRows(tasks)
        };
    }

    render() {
        const { fetchMore } = this.props;
        return (
            <RecyclerListView
                onEndReached={fetchMore}
                layoutProvider={this._layoutProvider}
                dataProvider={this.state.dataProvider}
                rowRenderer={(type, data) => <RenderAd ad={data} />}
            />
        );
    }
}
