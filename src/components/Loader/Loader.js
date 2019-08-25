import React from 'react';
import { Block } from 'galio-framework';
import { Spinner } from 'native-base';

export default function Loader(props) {
    return (
        <Block
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
            <Spinner color={props.color} />
        </Block>
    );
}
