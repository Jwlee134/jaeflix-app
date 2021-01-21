import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {WishListNaviParamList} from '~/@types';
import SubCatalogList from '~/Components/SubCatalogList';
import {RootState} from '~/store';
import Error from '../Error';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #141414;
  margin-bottom: 16px;
`;

type NavigationProp = StackNavigationProp<WishListNaviParamList, 'WishList'>;
interface Props {
  navigation: NavigationProp;
}

const WishList = ({navigation}: Props) => {
  const {movieList, tvList} = useSelector((state: RootState) => state.wishList);
  const {t} = useTranslation();

  return movieList.length === 0 && tvList.length === 0 ? (
    <Error message={t('빈 위시리스트')} />
  ) : (
    <Container>
      {movieList.length > 0 && (
        <SubCatalogList
          title={t('영화')}
          titleStyle={{fontSize: 18, paddingLeft: 8}}
          data={movieList}
          onPress={(id: number, title: string) => {
            navigation.navigate('MovieDetail', {
              id,
              title,
            });
          }}
        />
      )}
      {tvList.length > 0 && (
        <SubCatalogList
          title={t('TV 프로그램')}
          titleStyle={{fontSize: 18, paddingLeft: 8}}
          data={tvList}
          onPress={(id: number, title: string) => {
            navigation.navigate('TVDetail', {
              id,
              title,
            });
          }}
        />
      )}
    </Container>
  );
};

export default WishList;
