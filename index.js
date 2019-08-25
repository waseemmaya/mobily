import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigator from './src/Navigator';
import { store, persistor } from './src/redux/MainStore';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Root } from 'native-base';
console.disableYellowBox = true;

function App() {
    return (
        <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
            <Root>
                <Navigator />
            </Root>
            {/* </PersistGate> */}
        </Provider>
    );
}

AppRegistry.registerComponent(appName, () => App);
