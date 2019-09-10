import React, { useContext } from 'react';
import { View, Text } from 'native-base';
import { Button } from 'galio-framework';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { onLogout } from '../../config/Helpers/AuthFunctions';
import { ThemeContext } from '../../contexts/ThemeContext';

function Settings(props) {
    const themeContext = useContext(ThemeContext);
    const { changeColor, colorArr, color } = themeContext;

    getRandomColor2 = () => {
        return '#' + ((Math.random() * 0xffffff) << 0).toString(16);
    };

    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    handleLogout = async () => {
        const logoutRes = await onLogout();

        if (logoutRes) {
            return props.navigation.navigate('Auth');
        } else {
            alert('something went wrong');
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <Text> Settings </Text>
                <Button
                    style={{
                        width: 100,
                        backgroundColor: color
                    }}
                    onPress={this.handleLogout}>
                    Logout
                </Button>
                <Text> Random Color </Text>

                <Button
                    style={{
                        width: 100,
                        backgroundColor: color
                    }}
                    onPress={() => changeColor(getRandomColor())}>
                    Get Random Color
                </Button>

                <FlatGrid
                    itemDimension={100}
                    items={colorArr}
                    style={styles.gridView}
                    // staticDimension={300}
                    // fixed
                    // spacing={20}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => changeColor(item)}>
                            <View style={[ styles.itemContainer, { backgroundColor: item } ]}>
                                <Text style={styles.itemName}>{item}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
        </View>
    );
}

export default Settings;

const styles = StyleSheet.create({
    gridView: {
        marginTop: 10,
        flex: 1
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 5,
        height: 100
    },
    itemName: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600'
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff'
    }
});
