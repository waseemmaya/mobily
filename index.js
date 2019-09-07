import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
import ThemeContextWrapper from './src/contexts/ThemeContext';

console.disableYellowBox = true;

function Main() {
    return (
        <ThemeContextWrapper>
            <App />
        </ThemeContextWrapper>
    );
}

AppRegistry.registerComponent(appName, () => Main);
