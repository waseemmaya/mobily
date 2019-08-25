import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Signup from './routes/Auth/Signup';
import Login from './routes/Auth/Login';
import AuthLoading from './routes/Auth/AuthLoading';
import TabNavigator from './navigators/TabNavigator';
const AuthStack = createStackNavigator(
    {
        Login: { screen: Login },
        Signup: { screen: Signup }
    },
    { headerMode: 'none' }
);

const AppStack = createStackNavigator(
    {
        Home: { screen: TabNavigator }
    },
    { headerMode: 'none' }
);

const FinalNavigator = createSwitchNavigator(
    {
        AuthLoading,
        Auth: AuthStack,
        App: AppStack
    },
    {
        headerMode: 'none',
        initialRouteName: 'AuthLoading'
    }
);

const Navigator = createAppContainer(FinalNavigator);

export default Navigator;
