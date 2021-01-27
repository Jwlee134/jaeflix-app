import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList} from 'react-native';

import styled from 'styled-components/native';

import {Cast, Crew} from '~/@types';

const Container = styled.View`
  background-color: #141414;
  flex: 1;
  padding: 0px 12px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
  padding: 24px 0px 8px 0px;
`;

const CreditContainer = styled.View`
  width: 100px;
  margin: 0px 5px;
`;

const CreditImage = styled.Image`
  border-radius: 5px;
`;

const CreditInfo = styled.View``;

const CreditName = styled.Text`
  color: #ffffff;
  font-size: 12px;
  margin-top: 5px;
`;

const CreditJob = styled.Text`
  font-size: 11px;
  margin-bottom: 10px;
  opacity: 0.6;
`;

interface Props {
  crew: Crew[];
  cast: Cast[];
}

const Credits = ({crew, cast}: Props) => {
  const {t} = useTranslation();

  return (
    <Container>
      {crew.length > 0 && (
        <>
          <Title>{t('제작')}</Title>
          <FlatList
            horizontal={true}
            data={crew}
            keyExtractor={(_, index) => `crewList-${index}`}
            initialNumToRender={20}
            renderItem={({item}) => (
              <CreditContainer>
                <CreditImage
                  source={
                    item.profile_path
                      ? {
                          uri: `https://image.tmdb.org/t/p/w300${item.profile_path}`,
                        }
                      : require('~/Assets/Images/noImg.png')
                  }
                  style={{width: 100, height: 150}}
                />
                <CreditInfo>
                  <CreditName>{item.name}</CreditName>
                  <CreditJob>{item.department}</CreditJob>
                </CreditInfo>
              </CreditContainer>
            )}
          />
        </>
      )}
      {cast.length > 0 && (
        <>
          <Title>{t('출연')}</Title>
          <FlatList
            horizontal={true}
            data={cast}
            keyExtractor={(_, index) => `castList-${index}`}
            initialNumToRender={20}
            renderItem={({item}) => (
              <CreditContainer>
                <CreditImage
                  source={
                    item.profile_path
                      ? {
                          uri: `https://image.tmdb.org/t/p/w300${item.profile_path}`,
                        }
                      : require('~/Assets/Images/noImg.png')
                  }
                  style={{width: 100, height: 150}}
                />
                <CreditInfo>
                  <CreditName>{item.name}</CreditName>
                  <CreditJob>{item.character}</CreditJob>
                </CreditInfo>
              </CreditContainer>
            )}
          />
        </>
      )}
    </Container>
  );
};

export default Credits;
