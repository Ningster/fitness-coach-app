/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import Activity from "./src/components/Activity";
import UserProfile from "./src/components/UserProfile";
import {View, LinearGradient, Platform, Header} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ActivityStackNavigator = createStackNavigator(
  {
    Activity: Activity,
  },
  {
    navigationOptions: {
      tabBarLabel: '運動',
    },
  }
);

const UserProfileStackNavigator = createStackNavigator(
  {
    UserProfile: UserProfile,
  },
  {
    navigationOptions: {
      tabBarLabel: '我',
    },
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    ActivityRoute: ActivityStackNavigator,
    UserProfileRoute: UserProfileStackNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'ActivityRoute') {
          // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          iconName = 'flash';
        } else if (routeName === 'UserProfileRoute') {
          // iconName = `ios-options${focused ? '' : '-outline'}`;
          iconName = 'face-profile';
        }
        return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(TabNavigator);
