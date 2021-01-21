import React from 'react';
import {useNavigation} from '@react-navigation/native';

import styled from 'styled-components/native';

import {Movie, TV, Video} from '~/@types';

import SubCatalogList from '~/Components/SubCatalogList';
import {useTranslation} from 'react-i18next';

const Container = styled.View`
  background-color: #141414;
  flex: 1;
  padding: 0px 16px;
`;

interface Props {
  similar: Movie[] | TV[];
  name: string;
}

const Similar = ({similar, name}: Props) => {
  let title: string;
  const {t} = useTranslation();
  const navigation = useNavigation();
  if (name === 'MovieDetail') {
    title = 'movie';
  } else if (name === 'SearchMovieDetail') {
    title = 'movie';
  } else {
    title = 'tv';
  }
  return (
    <Container>
      {similar.length > 0 && (
        <SubCatalogList
          title={title === 'movie' ? t('추천 영화') : t('추천 TV 프로그램')}
          titleStyle={{fontSize: 16}}
          isSearch={true}
          data={similar}
          onPress={(id: number, title: string) => {
            navigation.push(name, {
              id,
              title,
            });
          }}
        />
      )}
    </Container>
  );
};

export default Similar;
