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

const LabelSubtitle = styled.Text`
  font-size: 12px;
  color: #ffffff;
  padding: 4px 16px 8px 16px;
`;

interface Props {
  id: number;
  catalogTitle?: string;
  image: string | null;
  title: string;
  subtitle: string | string[];
  onPress?: (id: number, title: string) => void;
}

const BigCatalog = ({
  id,
  catalogTitle,
  image,
  title,
  subtitle,
  onPress,
}: Props) => {
  return (
    <Container
      activeOpacity={1}
      onPress={onPress ? () => onPress(id, title) : undefined}>
      <CatalogImg
        source={
          image
            ? {uri: `https://image.tmdb.org/t/p/w780${image}`}
            : require('~/Assets/Images/noImg.png')
        }
        style={{width: Dimensions.get('window').width, height: 250}}
      />
      <InfoContainer>
        {catalogTitle && <LabelYear>{catalogTitle}</LabelYear>}
        <SubInfoContainer>
          <Background />
          <LabelTitle numberOfLines={1}>{title}</LabelTitle>
          <LabelSubtitle>{subtitle}</LabelSubtitle>
        </SubInfoContainer>
      </InfoContainer>
    </Container>
  );
};

export default BigCatalog;
