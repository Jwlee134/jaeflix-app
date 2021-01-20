import React from 'react';
import {FlatList} from 'react-native-gesture-handler';

import {useSelector} from 'react-redux';
import {RootState} from '~/store';

import styled from 'styled-components/native';

import BigCatalog from '~/Components/BigCatalog';
import {useRoute} from '@react-navigation/native';
import {isMovie} from '~/@types/typeGuards';
import {Movie, TV} from '~/@types';

const Container = styled.View`
  height: 300px;
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
            catalogTitle={name === 'MovieHome' ? '현재 상영중' : '현재 방영중'}
            image={item.backdrop_path}
            title={isMovie(item) ? item.title : item.name}
            subtitle={
              isMovie(item)
                ? `${item.release_date?.substring(0, 4)}년 개봉`
                : `${item.first_air_date?.substring(0, 4)}년 첫 방영`
            }
            onPress={onPress}
          />
        )}
      />
    </Container>
  );
};

export default BigCatalogList;
