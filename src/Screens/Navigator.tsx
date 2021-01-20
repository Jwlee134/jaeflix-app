import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MovieHome from './Movie';
import Detail from './Detail';
import TVHome from './TV';
import Search from './Search';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './Loading';
import {useDispatch} from 'react-redux';
import {setLanguage} from '~/store/language';

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

const Navigator = () => {
  const [initialize, setInitialize] = useState(true);
  const dispatch = useDispatch();

  const handleLanguage = async () => {
    const value = await AsyncStorage.getItem('language');
    if (value) {
      dispatch(setLanguage(value));
    } else if (!value) {
      await AsyncStorage.setItem('language', 'ko-KR');
    }
    setInitialize(false);
  };

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
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
