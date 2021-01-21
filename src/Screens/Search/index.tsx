import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import styled from 'styled-components/native';

import {RootState} from '~/store';
import {fetchResults} from '~/store/search';

import Input from '~/Components/Input';
import Error from '../Error';
import Loading from '../Loading';
import SubCatalogList from '~/Components/SubCatalogList';

import {SearchNaviParamList} from '~/@types';
import {useTranslation} from 'react-i18next';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #141414;
  margin-bottom: 16px;
`;

type NavigationProp = StackNavigationProp<SearchNaviParamList, 'Search'>;
interface Props {
  navigation: NavigationProp;
}

const Search = ({navigation}: Props) => {
  const {movie, tv, loading, error} = useSelector(
    (state: RootState) => state.search,
  );
  const {value} = useSelector((state: RootState) => state.language);

  const dispatch = useDispatch();
  const [term, setTerm] = useState('');

  const onSubmitEditing = () => {
    dispatch(fetchResults({term, value}));
  };

  const onChangeText = (text: string) => {
    setTerm(text);
  };

  const {t} = useTranslation();

  return (
    <>
      <Input
        style={{marginBottom: 10}}
        placeholder={t('키워드를 입력하세요')}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
      {loading ? (
        <Loading />
      ) : error ? (
        <Error message={error} />
      ) : movie && tv && movie.length === 0 && tv.length === 0 ? (
        <Error message={t('검색 결과가 없습니다')} />
      ) : (
        <Container>
          {movie && movie.length > 0 && (
            <SubCatalogList
              title={t('영화 검색 결과')}
              titleStyle={{fontSize: 18, paddingLeft: 8}}
              data={movie}
              isSearch={true}
              onPress={(id: number, title: string) => {
                navigation.navigate('MovieDetail', {
                  id,
                  title,
                });
              }}
            />
          )}
          {tv && tv.length > 0 && (
            <SubCatalogList
              title={t('TV 프로그램 검색 결과')}
              titleStyle={{fontSize: 18, paddingLeft: 8}}
              data={tv}
              isSearch={true}
              onPress={(id: number, title: string) => {
                navigation.navigate('TVDetail', {
                  id,
                  title,
                });
              }}
            />
          )}
        </Container>
      )}
    </>
  );
};

export default Search;
