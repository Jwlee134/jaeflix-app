import React, {useEffect, useLayoutEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RefreshControl} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store';
import {fetchTVData} from '~/store/tv';

import styled from 'styled-components/native';

import {TVNaviParamList} from '~/@types';

import useRefresh from '~/hooks/useRefresh';

import Error from '../Error';
import Loading from '../Loading';
import BigCatalogList from '~/Components/BigCatalogList';
import SubCatalogList from '~/Components/SubCatalogList';
import useLanguage from '~/hooks/useLanguage';

import Icon from 'react-native-vector-icons/FontAwesome';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #141414;
`;

const LanguageButton = styled.TouchableOpacity`
  margin-right: 12px;
`;

type NavigationProp = StackNavigationProp<TVNaviParamList, 'TVHome'>;
interface Props {
  navigation: NavigationProp;
}

const TVHome = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const {loading, topRated, popular, upcoming, error} = useSelector(
    (state: RootState) => state.tv,
  );
  const {handleRefresh, refreshing} = useRefresh(false);

  const {showDialog, renderDialog} = useLanguage();

  const {value} = useSelector((state: RootState) => state.language);

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
    dispatch(fetchTVData(value));
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
            navigation.navigate('TVDetail', {
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
            navigation.navigate('TVDetail', {
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
            navigation.navigate('TVDetail', {
              id,
              title,
            });
          }}
        />
        <SubCatalogList
          title="방영 예정"
          titleStyle={{fontSize: 18, paddingLeft: 8}}
          data={upcoming}
          onPress={(id: number, title: string) => {
            navigation.navigate('TVDetail', {
              id,
              title,
            });
          }}
        />
      </Container>
      {renderDialog()}
    </>
  );
};

export default TVHome;
