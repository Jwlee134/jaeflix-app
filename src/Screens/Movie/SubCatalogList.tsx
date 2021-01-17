import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import {Movie} from '~/@types';

const Container = styled.View`
  margin: 8px 0px;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
`;

const CatalogContainer = styled.View`
  height: 201px;
`;

const CatalogImgContainer = styled.TouchableOpacity`
  padding: 0px 4px;
`;

const CatalogImage = styled.Image``;

interface Props {
  title: string;
  fetch: any;
  onPress: (id: number) => void;
}

const SubCatalogList = ({title, fetch, onPress}: Props) => {
  const [data, setData] = useState<Movie[]>([]);

  const fetchData = async () => {
    try {
      const {
        data: {results},
      } = await fetch();
      setData(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <InfoContainer>
        <Title>{title}</Title>
      </InfoContainer>
      <CatalogContainer>
        <FlatList
          horizontal={true}
          data={data}
          keyExtractor={(item, index) => `catalogList-${item.id}-${index}`}
          renderItem={({item}) => (
            <CatalogImgContainer
              activeOpacity={1}
              onPress={() => onPress(item.id)}>
              <CatalogImage
                source={{
                  uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`,
                }}
                style={{width: 136, height: 201}}
              />
            </CatalogImgContainer>
          )}
        />
      </CatalogContainer>
    </Container>
  );
};

export default SubCatalogList;
