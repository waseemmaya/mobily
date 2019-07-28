import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import Signup from '../Routes/Signup';
import Login from '../Routes/Login';
import AuthLoading from '../Routes/AuthLoading';
import TabNavigator from './TabNavigator';

const AuthStack = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
  },
  { headerMode: 'none' }
);

const AppStack = createStackNavigator(
  {
    Home: { screen: TabNavigator },
  },
  { headerMode: 'none' }
);

const FinalNavigator = createSwitchNavigator(
  {
    AuthLoading,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'AuthLoading'
  }
);

const Navigator = createAppContainer(FinalNavigator);

export default Navigator;
