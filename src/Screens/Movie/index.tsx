import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {StackNavigationProp} from '@react-navigation/stack';
import {RefreshControl} from 'react-native';

import styled from 'styled-components/native';

import BigCatalogList from '~/Components/BigCatalogList';
import SubCatalogList from '~/Components/SubCatalogList';
import Loading from '../Loading';
import Error from '../Error';

import {MovieNaviParamList} from '~/@types';

import {useDispatch, useSelector} from 'react-redux';
import {fetchMovieData} from '~/store/movie';
import {RootState} from '~/store';

import useRefresh from '~/hooks/useRefresh';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #141414;
`;

type NavigationProp = StackNavigationProp<MovieNaviParamList, 'MovieHome'>;
interface Props {
  navigation: NavigationProp;
}

const MovieHome = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const {loading, topRated, popular, upcoming, error} = useSelector(
    (state: RootState) => state.movie,
  );
  const {handleRefresh, refreshing} = useRefresh();

  useEffect(() => {
    SplashScreen.hide();
    dispatch(fetchMovieData());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} />;
  }
  return (
    <Container
      refreshControl={
        <RefreshControl
          onRefresh={handleRefresh}
          refreshing={refreshing}
          colors={['#ffffff']}
          progressBackgroundColor="#141414"
        />
      }>
      <BigCatalogList
        onPress={(id: number) => {
          navigation.navigate('Detail', {
            id,
            isMovie: true,
          });
        }}
      />
      <SubCatalogList
        title="인기"
        data={popular}
        onPress={(id: number) => {
          navigation.navigate('Detail', {
            id,
            isMovie: true,
          });
        }}
      />
      <SubCatalogList
        title="최고 평점"
        data={topRated}
        onPress={(id: number) => {
          navigation.navigate('Detail', {
            id,
            isMovie: true,
          });
        }}
      />
      <SubCatalogList
        title="상영 예정"
        data={upcoming}
        onPress={(id: number) => {
          navigation.navigate('Detail', {
            id,
            isMovie: true,
          });
        }}
      />
    </Container>
  );
};

export default MovieHome;
