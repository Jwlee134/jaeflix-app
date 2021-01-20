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
  padding: 8px 0px;
`;

const Title = styled.Text`
  color: #ffffff;
  font-weight: bold;
`;

const CatalogContainer = styled.View``;

const CatalogImgContainer = styled.TouchableOpacity`
  margin: 0px 5px;
  width: 100px;
`;

const CatalogImage = styled.Image`
  border-radius: 5px;
`;

const CatalogTitle = styled.Text`
  margin: 5px 0px;
  margin-left: 2.5px;
  color: #ffffff;
  font-size: 11px;
`;

interface Props {
  title: string;
  titleStyle?: Object;
  data: Movie[] | TV[];
  onPress: (id: number, title: string) => void;
  isSearch?: boolean;
}

const SubCatalogList = ({
  title,
  titleStyle,
  data,
  isSearch,
  onPress,
}: Props) => {
  return (
    <Container>
      <InfoContainer>
        <Title style={titleStyle}>{title}</Title>
      </InfoContainer>
      <CatalogContainer>
        <FlatList
          horizontal={true}
          data={data}
          keyExtractor={(item, index) => `catalogList-${item.id}-${index}`}
          initialNumToRender={20}
          renderItem={({item}) => (
            <CatalogImgContainer
              activeOpacity={0.7}
              onPress={() =>
                onPress(item.id, isMovie(item) ? item.title : item.name)
              }>
              <CatalogImage
                source={
                  item.poster_path
                    ? {
                        uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`,
                      }
                    : require('~/Assets/Images/noImg.png')
                }
                style={{width: 100, height: 150}}
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
