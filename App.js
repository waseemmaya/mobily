import React, { Component } from 'react';
import Navigator from './src/Navigator';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Redux/MainStore';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {/* <PersistGate loading={null} persistor={persistor}> */}
                <Navigator />
                {/* </PersistGate> */}
            </Provider>
        );
    }
}
