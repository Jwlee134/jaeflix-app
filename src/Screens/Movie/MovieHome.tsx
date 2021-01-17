import React, {useContext, useEffect, useLayoutEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styled from 'styled-components/native';

import {UserContext} from '~/Context/User';

import BigCatalogList from './BigCatalogList';
import SubCatalogList from './SubCatalogList';

import {movieApi} from '~/api';

import {IUserContext, MovieNaviParamList} from '~/@types';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #141414;
`;

const StyleButton = styled.TouchableOpacity`
  padding: 8px;
`;

type NavigationProp = StackNavigationProp<MovieNaviParamList, 'MovieHome'>;
interface Props {
  navigation: NavigationProp;
}

const MovieHome = ({navigation}: Props) => {
  const {logout} = useContext<IUserContext>(UserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <StyleButton onPress={logout}>
          <Icon name="logout" size={20} color="white" />
        </StyleButton>
      ),
    });
  });

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Container>
      <BigCatalogList
        onPress={(id: number) => {
          navigation.navigate('MovieDetail', {
            id,
          });
        }}
      />
      <SubCatalogList
        title="인기"
        fetch={() => movieApi.popular()}
        onPress={(id: number) => {
          navigation.navigate('MovieDetail', {
            id,
          });
        }}
      />
      <SubCatalogList
        title="최고 평점"
        fetch={() => movieApi.topRated()}
        onPress={(id: number) => {
          navigation.navigate('MovieDetail', {
            id,
          });
        }}
      />
      <SubCatalogList
        title="상영 예정"
        fetch={() => movieApi.upcoming()}
        onPress={(id: number) => {
          navigation.navigate('MovieDetail', {
            id,
          });
        }}
      />
    </Container>
  );
};

export default MovieHome;
