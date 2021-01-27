import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import {Movie, TV} from '~/@types';
import {isMovie} from '~/@types/typeGuards';

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
  margin-bottom: 10px;
  color: #ffffff;
  font-size: 11px;
`;

interface Props {
  title: string;
  titleStyle?: Object;
  data: (Movie | TV)[];
  onPress: (id: number, title: string) => void;
  isSearch?: boolean;
}

const SubCatalogList = ({title, titleStyle, data, onPress}: Props) => {
  const {i18n} = useTranslation();

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
          initialNumToRender={100}
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
                {i18n.language === 'ko-KR'
                  ? isMovie(item)
                    ? item.title.length > 9
                      ? `${item.title.substring(0, 9)}...`
                      : item.title
                    : item.name.length > 9
                    ? `${item.name.substring(0, 9)}...`
                    : item.name
                  : isMovie(item)
                  ? item.title.length > 13
                    ? `${item.title.substring(0, 13)}...`
                    : item.title
                  : item.name.length > 13
                  ? `${item.name.substring(0, 13)}...`
                  : item.name}
              </CatalogTitle>
            </CatalogImgContainer>
          )}
        />
      </CatalogContainer>
    </Container>
  );
};

export default SubCatalogList;
