import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import React from 'react';
import MyAds from '../Routes/MyAds';
import ProfileSettings from '../Routes/ProfileSettings';
import HomeScreen from '../Routes/HomeScreen';
import Drawer from '../Routes/Drawer';
import { width } from '../Constants/Dimensions';
import { Icon } from 'native-base';

const DrawerOtherStack = createStackNavigator(
  {
    HomeScreen,
    MyAds,
    ProfileSettings,
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none'
  }
);

const drawerOptions = {
  contentComponent: Drawer,
  drawerWidth: width - 100,
  headerMode: 'none',
  initialRouteName: 'DrawerOtherStack'
};

const DrawerNavigator = createDrawerNavigator(
  { DrawerOtherStack },
  drawerOptions
);

export default DrawerNavigator;
