import React, { Component } from 'react';
import { Text, Button, Block } from 'galio-framework';
import { StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Toast } from 'native-base';
import { TextField } from 'react-native-material-textfield';
import { onLogin } from '../../config/Helpers/AuthFunctions';
import { primaryColor, facebookColor, googleColor } from '../../config/Constants/Colors';
import Loader from '../../components/Loader/Loader';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginErr: false,
            successLogin: false,
            submitting: false
        };
    }

    render() {
        let { email, password, loginErr, successLogin, submitting } = this.state;
        if (submitting) {
            return <Loader color={primaryColor} />;
        }
        return (
            <ScrollView>
                <Block style={{ flex: 1, justifyContent: 'space-between' }}>
                    {/* <StatusBar backgroundColor={primaryColor} barStyle='light-content' /> */}
                    <Block
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center'
                            // backgroundColor: primaryColor
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
                                backgroundColor: primaryColor
                            }}
                            onPress={this.handleLogin}>
                            Login
                        </Button>
                    </Block>
                    <Block style={{ flex: 1, marginTop: 30 }}>{this.renderAuthProvide()}</Block>

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
                    <Block bottom style={{ marginTop: 70 }}>
                        {/* <Snackbar
              visible={loginErr}
              onDismiss={() => this.setState({ loginErr: false })}
              action={{
                label: 'X',
                onPress: () => {
                  this.setState({
                    loginErr: false,
                  });
                },
              }}
            >
              {"User doesn't exist."}
            </Snackbar> */}
                    </Block>
                </Block>
            </ScrollView>
        );
    }

    renderAuthProvide = () => {
        let data = [ { name: 'Facebook', color: facebookColor }, { name: 'Google', color: googleColor } ];
        return data.map((val, index) => {
            return (
                <TouchableOpacity key={index} style={{}}>
                    <Text p style={{ fontSize: 13, color: 'grey', marginRight: 5 }}>
                        {val.name}
                    </Text>
                    {/* <List.Item
            titleStyle={{ color: 'white' }}
            style={{
              borderRadius: 6,
              backgroundColor: val.color,
              marginTop: 10,
              marginLeft: 15,
              marginRight: 15,
            }}
            title={`Login With ${val.name}`}
            left={props => (
              <Image
                style={{ width: 40, height: 40 }}
                source={
                  val.name === 'Facebook'
                    ? require('../../Assets/fb.png')
                    : require('../../Assets/google.png')
                }
              />
            )}
          /> */}
                </TouchableOpacity>
            );
        });
    };

    handleLogin = async () => {
        this.setState({
            submitting: true
        });
        const { email, password } = this.state;
        const res = await onLogin(email, password);
        if (res) {
            this.props.navigation.navigate('Home');
        } else {
            this.setState({
                loginErr: true,
                submitting: false
            });
            Toast.show({
                text: 'Something went wrong!',
                buttonText: 'Okay',
                duration: 2000,
                type: 'danger'
            });
        }
    };
}
