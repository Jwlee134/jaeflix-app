import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
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
import {RootState, useAppDispatch} from '~/store';

import useRefresh from '~/hooks/useRefresh';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, RadioButton, Dialog, Portal} from 'react-native-paper';
import useLanguage from '~/hooks/useLanguage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLanguage} from '~/store/language';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #141414;
`;

const LanguageButton = styled.TouchableOpacity`
  margin-right: 8px;
`;

type NavigationProp = StackNavigationProp<MovieNaviParamList, 'MovieHome'>;
interface Props {
  navigation: NavigationProp;
}

const MovieHome = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {loading, topRated, popular, upcoming, error} = useSelector(
    (state: RootState) => state.movie,
  );

  const {value} = useSelector((state: RootState) => state.language);

  const {handleRefresh, refreshing} = useRefresh();
  const {visible, showDialog, hideDialog} = useLanguage();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <LanguageButton>
          <Icon name="language" size={25} onPress={showDialog} />
        </LanguageButton>
      ),
    });
  }, [navigation, showDialog]);

  useEffect(() => {
    SplashScreen.hide();
    dispatch(fetchMovieData(value as string));
  }, [dispatch, value]);

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
          title="인기"
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
          title="최고 평점"
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
          title="상영 예정"
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
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{backgroundColor: '#252525'}}>
          <Dialog.Title style={{color: '#ffffff'}}>Language</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={(value) => {
                dispatch(setLanguage(value));
              }}
              value={value}>
              <RadioButton.Item
                labelStyle={{color: '#ffffff'}}
                label="한국어"
                value="ko-KR"
              />
              <RadioButton.Item
                labelStyle={{color: '#ffffff'}}
                label="English"
                value="en-US"
              />
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button color="#ffffff" onPress={hideDialog}>
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default MovieHome;
