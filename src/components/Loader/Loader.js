import React, { useContext } from 'react';
import { Block } from 'galio-framework';
import { Spinner } from 'native-base';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function Loader(props) {
    const themeContext = useContext(ThemeContext);
    const { color } = themeContext;
    return (
        <Block
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
            <Spinner color={color} />
        </Block>
    );
}
