import React, { useContext } from 'react';
import { View, StatusBar } from 'react-native';
import { Root } from 'native-base';
import Navigator from './src/Navigator';
import AdContextWrapper from './src/contexts/AdContext';
import { ThemeContext } from './src/contexts/ThemeContext';
import SearchContextWrapper from './src/contexts/SearchContext';

function App() {
    const themeContext = useContext(ThemeContext);
    const { color } = themeContext;
    return (
        <View style={{ flex: 1 }}>
            <Root>
                <AdContextWrapper>
                    <SearchContextWrapper>
                        <StatusBar hidden={true} animated={true} backgroundColor={color} barStyle='dark-content' />
                        <Navigator />
                    </SearchContextWrapper>
                </AdContextWrapper>
            </Root>
        </View>
    );
}

export default App;
