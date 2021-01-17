import React from 'react';
import {Dimensions} from 'react-native';

import styled from 'styled-components/native';

const Container = styled.TouchableOpacity``;

const CatalogImg = styled.Image``;

const InfoContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  align-items: flex-start;
`;

const LabelYear = styled.Text`
  background-color: #e70915;
  color: #ffffff;
  padding: 4px 8px;
  margin-left: 4px;
  margin-bottom: 4px;
  font-weight: bold;
  border-radius: 4px;
`;

const SubInfoContainer = styled.View``;

const Background = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #141414;
  opacity: 0.6;
`;

const LabelTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  padding: 8px 16px 4px 16px;
`;

const LabelGenres = styled.Text`
  font-size: 12px;
  color: #ffffff;
  padding: 4px 16px 8px 16px;
`;

interface Props {
  id: number;
  image: string | null;
  year: string;
  title: string;
  rating: number;
  onPress: (id: number) => void;
}

const BigCatalog = ({id, image, year, title, rating, onPress}: Props) => {
  return (
    <Container activeOpacity={1} onPress={() => onPress(id)}>
      <CatalogImg
        source={{uri: `https://image.tmdb.org/t/p/w500${image}`}}
        style={{width: Dimensions.get('window').width, height: 300}}
      />
      <InfoContainer>
        <LabelYear>현재 상영중</LabelYear>
        <SubInfoContainer>
          <Background />
          <LabelTitle>{title}</LabelTitle>
          <LabelGenres>
            {year.substring(0, 4)}년 개봉 · 평점 {rating}점
          </LabelGenres>
        </SubInfoContainer>
      </InfoContainer>
    </Container>
  );
};

export default BigCatalog;
