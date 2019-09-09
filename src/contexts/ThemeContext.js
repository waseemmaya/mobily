import React, { createContext, Component } from 'react';
import { AsyncStorage } from 'react-native';

// grayColor = '#6d7683';
// facebookColor = '#263238';
// googleColor = '#4184F3';

let colorArr = [ '#263238' ];

let initialTheme = {
    color: '#263238',
    changeColor: () => {}
};

export const ThemeContext = createContext(initialTheme);

class ThemeContextWrapper extends Component {
    constructor() {
        super();
        this.state = {
            color: '#263238'
        };
    }

    componentWillMount = async () => {
        let localColor = await AsyncStorage.getItem('color');
        console.warn('localColor: ', localColor);
        if (localColor) {
            this.setState({
                color: localColor
            });
        }
    };

    changeColor = async (e) => {
        if (!e) {
            return;
        }
        console.warn('e: ', e);
        await AsyncStorage.setItem('color', e);
        this.setState({
            color: e
        });
    };

    render() {
        const { color } = this.state;
        let themeObj = {
            color,
            changeColor: this.changeColor,
            colorArr
        };
        return <ThemeContext.Provider value={themeObj}>{this.props.children}</ThemeContext.Provider>;
    }
}

export default ThemeContextWrapper;
