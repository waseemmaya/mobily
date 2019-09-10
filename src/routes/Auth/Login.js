import React, { Component } from 'react';
import { Text, Button, Block } from 'galio-framework';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Toast } from 'native-base';
import { TextField } from 'react-native-material-textfield';
import { withNavigation } from 'react-navigation';
import { onLogin } from '../../config/Helpers/AuthFunctions';
import Loader from '../../components/Loader/Loader';
import { ThemeContext } from '../../contexts/ThemeContext';

const USER_TOKEN = 'UserAuthToken';
const USER_ID = 'UserID';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            submitting: false
        };
    }

    render() {
        const colorContext = this.context;
        const { color } = colorContext;
        let { email, password, submitting } = this.state;
        if (submitting) {
            return <Loader color={color} />;
        }
        return (
            <ScrollView>
                <Block style={{ flex: 1, justifyContent: 'space-between' }}>
                    <Block
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                        <Image
                            style={{ width: 180, height: 180, marginTop: 20 }}
                            source={require('../../config/Assets/mobilylogo.png')}
                        />
                    </Block>

                    <Block
                        style={{
                            margin: 15,
                            marginTop: 18,
                            flexDirection: 'column'
                        }}>
                        <TextField
                            value={email}
                            onChangeText={(email) => this.setState({ email })}
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            returnKeyType='next'
                            label='Email'
                        />

                        <TextField
                            value={password}
                            onChangeText={(password) => this.setState({ password })}
                            secureTextEntry={true}
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            clearTextOnFocus={true}
                            returnKeyType='done'
                            label='Password'
                        />
                        <Button
                            style={{
                                width: 100,
                                marginTop: 15,
                                backgroundColor: color
                            }}
                            onPress={this.handleLogin}>
                            Login
                        </Button>
                    </Block>

                    <Block
                        style={{
                            marginTop: 15,
                            flexDirection: 'column',
                            flexWrap: 'nowrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                        <Text p style={{ fontSize: 13, color: 'grey', marginRight: 5 }}>
                            Dont have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    email: '',
                                    password: '',
                                    loginErr: false,
                                    submitting: false,
                                    successLogin: false
                                });
                                this.props.navigation.navigate('Signup');
                            }}>
                            <Text p bold style={{ fontSize: 14, color: 'grey' }}>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </Block>
                    <Block bottom style={{ marginTop: 70 }} />
                </Block>
            </ScrollView>
        );
    }

    handleLogin = async () => {
        const { email, password } = this.state;
        if (!email || !password) {
            Toast.show({
                text: 'Empty Fields.',
                buttonText: 'Okay',
                duration: 2000,
                type: 'danger'
            });
            return;
        }
        this.setState({
            submitting: true
        });
        try {
            const res = await onLogin(email, password);
            const { token, userID } = res.data;
            await AsyncStorage.setItem(USER_TOKEN, token);
            await AsyncStorage.setItem(USER_ID, userID);
            this.setState({
                submitting: false
            });
            this.props.navigation.navigate('Home');
        } catch (error) {
            Toast.show({
                text: error.response.data,
                buttonText: 'Okay',
                duration: 2000,
                type: 'danger'
            });
            this.setState({
                loginErr: true,
                submitting: false
            });
        }
    };
}

Login.contextType = ThemeContext;

export default withNavigation(Login);
