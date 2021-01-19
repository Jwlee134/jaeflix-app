import React, {useEffect, useLayoutEffect} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector} from 'react-redux';

import {MovieNaviParamList, TVNaviParamList} from '~/@types';
import {isMovieDetail} from '~/@types/typeGuards';

import styled from 'styled-components/native';

import {RootState, useAppDispatch} from '~/store';
import {fetchMovieDetail, fetchTVDetail} from '~/store/detail';

import BigCatalog from '~/Components/BigCatalog';
import BasicInfo from './BasicInfo';
import Loading from '../Loading';
import Error from '../Error';

const Container = styled.ScrollView`
  background-color: #141414;
`;

const SubInfoContainer = styled.View``;

type ProfileScreenNavigationProp = StackNavigationProp<
  MovieNaviParamList | TVNaviParamList,
  'Detail'
>;
type ProfileScreenRouteProp = RouteProp<
  MovieNaviParamList | TVNaviParamList,
  'Detail'
>;
interface Props {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

const Detail = ({navigation, route}: Props) => {
  const {loading, detail, error} = useSelector(
    (state: RootState) => state.detail,
  );
  const dispatch = useAppDispatch();
  const Tab = createMaterialTopTabNavigator();

  const title = detail && isMovieDetail(detail) ? detail.title : detail?.name;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title ? title : 'Jaeflix',
    });
  }, [navigation, title]);

  useEffect(() => {
    console.log(route.name);
    const {id, isMovie} = route.params;
    const promise = isMovie
      ? dispatch(fetchMovieDetail(id))
      : dispatch(fetchTVDetail(id));
    return () => {
      promise.abort();
    };
  }, [dispatch, route.params]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} />;
  }
  return (
    detail && (
      <Container>
        <BigCatalog
          id={detail.id}
          image={detail.backdrop_path}
          title={isMovieDetail(detail) ? detail.title : detail.name}
          subtitle={detail.genres.map((genre, index) =>
            index === detail.genres.length - 1 ? genre.name : `${genre.name}, `,
          )}
        />
        <SubInfoContainer>
          <Tab.Navigator
            tabBarOptions={{
              style: {backgroundColor: '#141414'},
              indicatorStyle: {backgroundColor: '#ffffff'},
              activeTintColor: '#FFFFFF',
            }}>
            <Tab.Screen name="기본 정보" component={BasicInfo} />
          </Tab.Navigator>
        </SubInfoContainer>
      </Container>
    )
  );
};

export default Detail;
