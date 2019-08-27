import React from 'react';
import Navigator from './src/Navigator';
import { View, AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Root } from 'native-base';
console.disableYellowBox = true;

function App() {
    return (
        <View style={{ flex: 1 }}>
            <Root>
                <Navigator />
            </Root>
        </View>
    );
}

AppRegistry.registerComponent(appName, () => App);
