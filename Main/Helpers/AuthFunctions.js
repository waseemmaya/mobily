import { AsyncStorage } from 'react-native';

export const USER_TOKEN = 'auth-token';

export const onSignup = async () => {
  await AsyncStorage.setItem(USER_TOKEN, 'userToken');
  const signupRes = await AsyncStorage.getItem(USER_TOKEN);
};

export const onLogin = async () => {
  const loginRes = await AsyncStorage.getItem(USER_TOKEN);
  console.log('loginRes: ', loginRes);

  return loginRes;
};

export const onLogout = async () => {
  const logoutRes = await AsyncStorage.removeItem(USER_TOKEN);
};

export const isLoggedin = async () => {
  let userToken = await AsyncStorage.getItem(USER_TOKEN);
  return userToken !== null ? true : false;
};
