import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import {Movie} from '~/@types';

import {movieApi} from '~/api';
import BigCatalog from '~/Components/BigCatalog';

const Container = styled.View`
  height: 300px;
  margin-bottom: 8px;
`;

interface Props {
  onPress: (id: number) => void;
}

const BigCatalogList = ({onPress}: Props) => {
  const [data, setData] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    try {
      const {
        data: {results},
      } = await movieApi.nowPlaying();
      setData(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Container>
      <FlatList
        horizontal={true}
        pagingEnabled={true}
        data={data}
        keyExtractor={(_, index) => `bigScreen-${index}`}
        renderItem={({item}) => (
          <BigCatalog
            id={item.id}
            image={item.backdrop_path}
            year={item.release_date}
            title={item.title}
            rating={item.vote_average}
            onPress={onPress}
          />
        )}
      />
    </Container>
  );
};

export default BigCatalogList;
