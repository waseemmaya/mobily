import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import React from 'react';
import Ads from '../Routes/Ads';
import Settings from '../Routes/Settings';
import Home from '../Routes/Home';
import Messages from '../Routes/Messages';
import { Image } from 'react-native';
import { primaryColor } from '../Constants/Colors';
import Category from '../Routes/Category';
import ViewAd from '../Routes/ViewAd';

import HomeIcon from '../Assets/TabNavigatorIcons/Home.png';
import AdsIcon from '../Assets/TabNavigatorIcons/Ads.png';
import ProfileIcon from '../Assets/TabNavigatorIcons/Profile.png';
import MessagesIcon from '../Assets/TabNavigatorIcons/Messages.png';
import CategoryIcon from '../Assets/TabNavigatorIcons/Category.png';

// Category Tab and its stack childs
const CategoryStack = createStackNavigator(
  {
    Category: { screen: Category },
  },
  {
    headerMode: 'none'
  }
);

// Messages Tab and its stack childs
const MessagesStack = createStackNavigator(
  {
    Messages: { screen: Messages },
  },
  {
    headerMode: 'none'
  }
);

// Home Tab and its stack childs
const HomeStack = createStackNavigator(
  {
    Home: { screen: Home },
    ViewAd: { screen: ViewAd },
  },
  {
    headerMode: 'none'
  }
);

// Ads Tab and its stack childs
const AdsStack = createStackNavigator(
  {
    Ads: { screen: Ads },
  },
  {
    headerMode: 'none'
  }
);

// Settings Tab and its stack childs
const SettingsStack = createStackNavigator(
  {
    Settings: { screen: Settings },
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
      Settings: { screen: SettingsStack },
    },
    {
      tabBarPosition: 'bottom',
      swipeEnabled: true,
      tabBarOptions: {
        activeTintColor: '#8898AA',
        activeBackgroundColor: primaryColor,
        inactiveTintColor: '#666',
        tabStyle: {
          fontSize: 12,
          padding: 3,
        },
      },

      defaultNavigationOptions: ({ navigation }) => ({
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
        },
      }),

      initialRouteName: 'Home'
      // headerMode: 'none'
    }
  )
);

export default TabNavigator;
