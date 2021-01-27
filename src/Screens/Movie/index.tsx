import React, {useEffect, useLayoutEffect} from 'react';
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
import useLanguage from '~/hooks/useLanguage';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #141414;
`;

const Button = styled.TouchableOpacity`
  margin-right: 12px;
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

  const {value} = useSelector((state: RootState) => state.language);

  const {handleRefresh, refreshing} = useRefresh();

  const {showDialog, renderDialog, renderRestartDialog} = useLanguage();

  const {t} = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button>
          <Icon name="language" size={25} onPress={showDialog} />
        </Button>
      ),
    });
  }, [navigation, showDialog]);

  useEffect(() => {
    SplashScreen.hide();
    dispatch(fetchMovieData({page: 1, value}));
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} />;
  }
  return (
    <>
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
          onPress={(id: number, title: string) => {
            navigation.navigate('MovieDetail', {
              id,
              title,
            });
          }}
        />
        <SubCatalogList
          title={t('인기')}
          titleStyle={{fontSize: 18, paddingLeft: 8}}
          data={popular}
          onPress={(id: number, title: string) => {
            navigation.navigate('MovieDetail', {
              id,
              title,
            });
          }}
        />
        <SubCatalogList
          title={t('최고 평점')}
          titleStyle={{fontSize: 18, paddingLeft: 8}}
          data={topRated}
          onPress={(id: number, title: string) => {
            navigation.navigate('MovieDetail', {
              id,
              title,
            });
          }}
        />
        <SubCatalogList
          title={t('상영 예정')}
          titleStyle={{fontSize: 18, paddingLeft: 8}}
          data={upcoming}
          onPress={(id: number, title: string) => {
            navigation.navigate('MovieDetail', {
              id,
              title,
            });
          }}
        />
      </Container>
      {renderDialog()}
      {renderRestartDialog()}
    </>
  );
};

export default MovieHome;
