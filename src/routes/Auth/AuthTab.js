import * as React from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import Login from './Login';
import Signup from './Signup';
import { width } from '../../config/Constants/Dimensions';

export default class TabViewExample extends React.Component {
    state = {
        index: 0,
        routes: [ { key: 'login', title: 'Login' }, { key: 'signup', title: 'Signup' } ]
    };

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    login: Login,
                    signup: Signup
                })}
                onIndexChange={(index) => this.setState({ index })}
                initialLayout={{
                    height: 0,
                    width: width
                }}
            />
        );
    }
}
