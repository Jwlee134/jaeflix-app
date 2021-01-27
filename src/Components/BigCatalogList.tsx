import React from 'react';
import {FlatList} from 'react-native-gesture-handler';

import {useSelector} from 'react-redux';
import {RootState} from '~/store';

import styled from 'styled-components/native';

import BigCatalog from '~/Components/BigCatalog';
import {useRoute} from '@react-navigation/native';
import {isMovie} from '~/@types/typeGuards';
import {Movie, TV} from '~/@types';

import {useTranslation} from 'react-i18next';

const Container = styled.View`
  height: 250px;
  margin-bottom: 8px;
`;

interface Props {
  onPress: (id: number, title: string) => void;
}

const BigCatalogList = ({onPress}: Props) => {
  const {name} = useRoute();
  const {nowPlaying} = useSelector((state: RootState) => state.movie);
  const {airingToday} = useSelector((state: RootState) => state.tv);

  const data: (Movie | TV)[] = name === 'MovieHome' ? nowPlaying : airingToday;

  const {t} = useTranslation();

  return (
    <Container>
      <FlatList
        horizontal={true}
        pagingEnabled={true}
        data={data}
        keyExtractor={(_, index) => `bigScreen-${index}`}
        initialNumToRender={20}
        renderItem={({item}) => (
          <BigCatalog
            id={item.id}
            catalogTitle={
              name === 'MovieHome' ? t('현재 상영중') : t('현재 방영중')
            }
            image={item.backdrop_path}
            title={isMovie(item) ? item.title : item.name}
            subtitle={
              isMovie(item)
                ? t('개봉연도', {year: item.release_date.substring(0, 4)})
                : t('방영연도', {year: item.first_air_date?.substring(0, 4)})
            }
            onPress={onPress}
          />
        )}
      />
    </Container>
  );
};

export default BigCatalogList;
