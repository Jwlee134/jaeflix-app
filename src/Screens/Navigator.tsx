import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import MovieHome from './Movie';
import Detail from './Detail';
import TVHome from './TV';
import Search from './Search';
import WishList from './WishList';

import useInitialize from '~/hooks/useInitialize';

const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#141414',
  },
};

const MovieNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MovieHome"
        component={MovieHome}
        options={{
          title: 'Jaeflix',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#141414',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={Detail}
        options={{
          title: 'Jaeflix',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#141414',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const TVNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TVHome"
        component={TVHome}
        options={{
          title: 'Jaeflix',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#141414',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="TVDetail"
        component={Detail}
        options={{
          title: 'Jaeflix',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#141414',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const SearchNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Jaeflix',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#141414',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={Detail}
        options={{
          title: 'Jaeflix',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#141414',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="TVDetail"
        component={Detail}
        options={{
          title: 'Jaeflix',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#141414',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const WishListNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WishList"
        component={WishList}
        options={{
          title: 'Jaeflix',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#141414',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={Detail}
        options={{
          title: 'Jaeflix',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#141414',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="TVDetail"
        component={Detail}
        options={{
          title: 'Jaeflix',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#141414',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const {initialize, handleLanguage} = useInitialize();

  useEffect(() => {
    handleLanguage();
  }, []);

  return initialize ? (
    <></>
  ) : (
    <NavigationContainer theme={myTheme}>
      <Tab.Navigator barStyle={{backgroundColor: '#141414'}}>
        <Tab.Screen
          name="Movie"
          component={MovieNavigator}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="local-movies" size={23} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="TV"
          component={TVNavigator}
          options={{
            tabBarIcon: ({color}) => <Icon name="tv" size={23} color={color} />,
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchNavigator}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="search" size={23} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="WishList"
          component={WishListNavigator}
          options={{
            tabBarIcon: ({color}) => (
              <Icon2 name="heart" size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
