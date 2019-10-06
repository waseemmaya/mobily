import React from "react";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import Signup from "./routes/Auth/Signup";
import Login from "./routes/Auth/Login";
import AuthLoading from "./routes/Auth/AuthLoading";
import TabNavigator from "./navigators/TabNavigator";
import AuthTab from "./routes/Auth/AuthTab";

import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";

const AuthStack = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup }
  },
  { headerMode: "none" }
);

const AppStack = createStackNavigator(
  {
    Home: { screen: TabNavigator }
  },
  { headerMode: "none" }
);

const FinalNavigator = createAnimatedSwitchNavigator(
  {
    AuthLoading,
    Auth: AuthTab,
    App: AppStack
  },
  {
    // The previous screen will slide to the bottom while the next screen will fade in
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    )
  },
  {
    headerMode: "none",
    initialRouteName: "AuthLoading"
  }
);

const Navigator = createAppContainer(FinalNavigator);

export default Navigator;
