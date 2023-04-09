import React from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home, Search, Bookmark, AllRecipe} from '../screens';
import {TabIcon} from '../components';
import {COLORS} from '../constants';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: COLORS.white}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            backgroundColor: COLORS.white,
            borderTopColor: 'transparent',
            height: 70,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon focused={focused} icon="home" />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon focused={focused} icon="search" />
            ),
          }}
        />
        <Tab.Screen
          name="AllRecipe"
          component={AllRecipe}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon focused={focused} icon="menu-book" />
            ),
          }}
        />
        <Tab.Screen
          name="Bookmark"
          component={Bookmark}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon focused={focused} icon="bookmark" />
            ),
          }}
        />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
};

export default Tabs;
