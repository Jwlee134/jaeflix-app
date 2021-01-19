import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import {Movie, TV} from '~/@types';
import {isMovie} from '~/@types/typeGuards';
import {mixArray} from '~/utils/mixArray';

const Container = styled.View`
  margin: 8px 0px;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px;
`;

const Title = styled.Text`
  font-size: 18px;
  color: #ffffff;
  font-weight: bold;
`;

const CatalogContainer = styled.View``;

const CatalogImgContainer = styled.TouchableOpacity`
  margin: 0px 5px;
  width: 130px;
`;

const CatalogImage = styled.Image`
  border-radius: 5px;
`;

const CatalogTitle = styled.Text`
  margin: 5px 0px;
  margin-left: 2.5px;
  color: #ffffff;
  font-size: 12px;
`;

interface Props {
  title: string;
  data: Movie[] | TV[];
  onPress: (id: number) => void;
  isSearch?: boolean;
}

const SubCatalogList = ({title, data, isSearch, onPress}: Props) => {
  const mixed = mixArray(data);

  return (
    <Container>
      <InfoContainer>
        <Title>{title}</Title>
      </InfoContainer>
      <CatalogContainer>
        <FlatList
          horizontal={true}
          data={isSearch ? data : mixed}
          keyExtractor={(item, index) => `catalogList-${item.id}-${index}`}
          initialNumToRender={20}
          renderItem={({item}) => (
            <CatalogImgContainer
              activeOpacity={1}
              onPress={() => onPress(item.id)}>
              <CatalogImage
                source={
                  item.poster_path
                    ? {
                        uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`,
                      }
                    : require('~/Assets/Images/noImg.png')
                }
                style={{width: 130, height: 180}}
              />
              <CatalogTitle>
                {isMovie(item) ? item.title : item.name}
              </CatalogTitle>
            </CatalogImgContainer>
          )}
        />
      </CatalogContainer>
    </Container>
  );
};

export default SubCatalogList;
