import { AsyncStorage } from 'react-native';

export const USER_TOKEN = 'auth-token';

export const onLogin = () => AsyncStorage.setItem(USER_TOKEN, 'userToken');

export const onLogout = () => AsyncStorage.removeItem(USER_TOKEN);

export const isLoggedin = async () => {
  let userToken = await AsyncStorage.getItem(USER_TOKEN);

  return userToken !== null ? true : false;
};
