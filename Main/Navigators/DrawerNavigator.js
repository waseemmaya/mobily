import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import React from 'react';
import MyAds from '../Routes/MyAds';
import ProfileSettings from '../Routes/ProfileSettings';
import HomeScreen from '../Routes/HomeScreen';
import Drawer from '../Routes/Drawer';
import { width } from '../Constants/Dimensions';
import { Icon } from 'native-base';

const DrawerOtherStack = createBottomTabNavigator(
  {
    MyAds,
    HomeScreen,
    ProfileSettings,
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none'
  }
);

const DrawerNavigator = createAppContainer(DrawerOtherStack);

export default DrawerNavigator;
