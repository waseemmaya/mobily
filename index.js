import React from 'react';
import Navigator from './src/Navigator';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Root } from 'native-base';
console.disableYellowBox = true;

function App() {
    return (
        <Root>
            <Navigator />
        </Root>
    );
}

AppRegistry.registerComponent(appName, () => App);
