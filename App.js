import React, { useContext } from 'react';
import { View, StatusBar } from 'react-native';
import { Root } from 'native-base';
import Navigator from './src/Navigator';
import AdContextWrapper from './src/contexts/AdContext';
import { ThemeContext } from './src/contexts/ThemeContext';

function App() {
    const themeContext = useContext(ThemeContext);
    const { color } = themeContext;
    return (
        <View style={{ flex: 1 }}>
            <Root>
                <AdContextWrapper>
                    <StatusBar hidden={false} animated={true} backgroundColor={color} barStyle='dark-content' />
                    <Navigator />
                </AdContextWrapper>
            </Root>
        </View>
    );
}

export default App;
