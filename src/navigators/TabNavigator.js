import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import React from 'react';
import { Image, AsyncStorage } from 'react-native';
import Messages from '../routes/Messages/Messages';
import Home from '../routes/Home/Home';
import Ads from '../routes/Ads/Ads';
import Settings from '../routes/Settings/Settings';
import ViewAd from '../routes/ViewAd/ViewAd';
import Category from '../routes/Category/Category';
import HomeIcon from '../config/Assets/TabNavigatorIcons/Home.png';
import AdsIcon from '../config/Assets/TabNavigatorIcons/Ads.png';
import ProfileIcon from '../config/Assets/TabNavigatorIcons/Profile.png';
import MessagesIcon from '../config/Assets/TabNavigatorIcons/Messages.png';
import CategoryIcon from '../config/Assets/TabNavigatorIcons/Category.png';

async function getColor() {
    let color = await AsyncStorage.getItem('color');
    if (!color) {
        return '#3A5999';
    } else {
        return color;
    }
}

// Category Tab and its stack childs
const CategoryStack = createStackNavigator(
    {
        Category: { screen: Category }
    },
    {
        headerMode: 'none'
    }
);

// Messages Tab and its stack childs
const MessagesStack = createStackNavigator(
    {
        Messages: { screen: Messages }
    },
    {
        headerMode: 'none'
    }
);

// Home Tab and its stack childs
const HomeStack = createStackNavigator(
    {
        Home: {
            screen: Home
        },
        ViewAd: {
            screen: ViewAd
        }
    },
    {
        headerMode: 'none'
    }
);

HomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible
    };
};

//  to hide
// HomeStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//       return {
//       tabBarVisible: false
//     };
//   }

//   return {
//     tabBarVisible,
//   };
// };

// Ads Tab and its stack childs
const AdsStack = createStackNavigator(
    {
        Ads: { screen: Ads },
        ViewAd: {
            screen: ViewAd
        }
    },
    {
        headerMode: 'none'
    }
);

AdsStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible
    };
};

// Settings Tab and its stack childs
const SettingsStack = createStackNavigator(
    {
        Settings: { screen: Settings }
    },
    {
        headerMode: 'none'
    }
);

// Tab Navigator
const TabNavigator = createAppContainer(
    createBottomTabNavigator(
        {
            Category: { screen: CategoryStack },
            Messages: { screen: MessagesStack },
            Home: { screen: HomeStack },
            Ads: { screen: AdsStack },
            Settings: { screen: SettingsStack }
        },
        {
            tabBarPosition: 'bottom',
            swipeEnabled: true,
            tabBarOptions: {
                activeTintColor: 'white',
                activeBackgroundColor: getColor(),
                inactiveTintColor: '#666',
                tabStyle: {
                    fontSize: 12,
                    padding: 3
                }
            },

            defaultNavigationOptions: ({ navigation }) => ({
                tabBarOnPress: (props) => {
                    console.log('props: ', props);
                    let route = props.navigation.state.routeName;
                    console.log('route: ', route);
                    props.navigation.replace(route);
                    // jumpToIndex(scene.index);
                },
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    const { routeName } = navigation.state;

                    let icon;

                    if (routeName === 'Home') {
                        icon = HomeIcon;
                    } else if (routeName === 'Ads') {
                        icon = AdsIcon;
                    } else if (routeName === 'Settings') {
                        icon = ProfileIcon;
                    } else if (routeName === 'Messages') {
                        icon = MessagesIcon;
                    } else if (routeName === 'Category') {
                        icon = CategoryIcon;
                    }

                    return <Image source={icon} style={{ height: 20, width: 20 }} />;
                }
            }),

            initialRouteName: 'Home'
            // headerMode: 'none'
        }
    )
);

export default TabNavigator;
