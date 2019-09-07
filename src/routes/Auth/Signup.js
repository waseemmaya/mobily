import React, { Component } from 'react';
import { Text, Button, Block } from 'galio-framework';
import { StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';

import { onSignup } from '../../config/Helpers/AuthFunctions';
import Loader from '../../components/Loader/Loader';
import { ThemeContext } from '../../contexts/ThemeContext';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            againPassword: '',
            submitting: false
        };
    }
    render() {
        let { email, password, firstName, phone, lastName, againPassword, submitting } = this.state;
        const colorContext = this.context;
        const { color } = colorContext;
        if (submitting) {
            return <Loader color={color} />;
        }
        return (
            <ScrollView>
                <Block style={{ flex: 1 }}>
                    <Block
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center'
                            // backgroundColor: color
                        }}>
                        <Image
                            style={{ width: 180, height: 180, marginTop: 20 }}
                            source={require('../../config/Assets/mobilylogo.png')}
                        />
                    </Block>

                    <Block
                        style={{
                            margin: 10,
                            flexDirection: 'column'
                        }}>
                        <Block style={{ flexDirection: 'row' }}>
                            <Block style={{ flex: 1 }}>
                                <TextField
                                    onChangeText={(firstName) => this.setState({ firstName })}
                                    value={firstName}
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    returnKeyType='next'
                                    label='First Name'
                                    style={{ justifyContent: 'flex-start' }}
                                />
                            </Block>
                            <Block style={{ margin: 5 }} />
                            <Block style={{ flex: 1 }}>
                                <TextField
                                    value={lastName}
                                    onChangeText={(lastName) => this.setState({ lastName })}
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    returnKeyType='next'
                                    label='Last Name'
                                    style={{ justifyContent: 'flex-end' }}
                                />
                            </Block>
                        </Block>

                        <TextField
                            value={email}
                            onChangeText={(email) => this.setState({ email })}
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            returnKeyType='next'
                            label='Email'
                        />
                        <TextField
                            value={phone}
                            autoCorrect={false}
                            onChangeText={(phone) => this.setState({ phone })}
                            enablesReturnKeyAutomatically={true}
                            returnKeyType='next'
                            label='Phone'
                        />

                        <TextField
                            value={password}
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })}
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            clearTextOnFocus={true}
                            returnKeyType='next'
                            label='Password'
                        />
                        <TextField
                            value={againPassword}
                            onChangeText={(againPassword) => this.setState({ againPassword })}
                            secureTextEntry={true}
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            clearTextOnFocus={true}
                            returnKeyType='done'
                            label='Again Password'
                        />
                        <Button
                            style={{
                                width: 100,
                                marginTop: 15,
                                backgroundColor: color
                            }}
                            onPress={this.handleSignup}>
                            Sign up
                        </Button>
                    </Block>

                    <Block
                        style={{
                            marginTop: 10,
                            flexDirection: 'column',
                            flexWrap: 'nowrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                        <Text p style={{ fontSize: 13, color: 'grey', marginRight: 5 }}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text p bold style={{ fontSize: 14, color: 'grey' }}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </Block>
                </Block>
            </ScrollView>
        );
    }

    handleSignup = async () => {
        this.setState({
            submitting: true
        });
        let { email, password, firstName, phone, lastName, againPassword } = this.state;

        // let signupObj = {
        //     email,
        //     password,
        //     againPassword,
        //     firstName,
        //     lastName,
        //     phone
        // };

        let signupObj = {
            email: 'waseemmayaa@gmail.com',
            password: '123456',
            againPassword: '123456',
            firstName: 'Waseem',
            lastName: 'Maya',
            phone: '03123767311'
        };

        try {
            const res = await onSignup(signupObj);
            console.warn('sign up res: ', res);
            alert(res.data);
            this.setState({
                submitting: false
            });
        } catch (error) {
            alert(error);
            this.setState({
                submitting: false
            });
        }

        // if (res.status === 200) {
        //     await AsyncStorage.setItem(USER_TOKEN, res.data._id);
        //     return true;
        // } else {
        //     return false;
        // }

        // return this.props.navigation.navigate('Login');
    };
}

Signup.contextType = ThemeContext;
