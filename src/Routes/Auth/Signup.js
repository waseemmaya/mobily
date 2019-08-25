import React, { Component } from 'react';
import { Text, Button, Block } from 'galio-framework';
import { StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { primaryColor } from '../../Constants/Colors';
import { onSignup } from '../../Helpers/AuthFunctions';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            againPassword: ''
        };
    }
    render() {
        let { email, password, firstName, phone, lastName, againPassword } = this.state;
        return (
            <ScrollView>
                <Block style={{ flex: 1 }}>
                    <StatusBar backgroundColor={primaryColor} barStyle='light-content' />
                    <Block
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            backgroundColor: primaryColor
                        }}>
                        <Image style={{ width: 150, height: 150 }} source={require('../../Assets/logo.png')} />
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
                                backgroundColor: primaryColor
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
        let { email, password, firstName, phone, lastName, againPassword } = this.state;

        let signupObj = {
            email,
            password,
            againPassword,
            firstName,
            lastName,
            phone
        };

        const res = await onSignup(signupObj);
        // console.log('res signup --->: ', res);
        // return this.props.navigation.navigate(res ? 'Home' : 'Signup');
    };
}
