import React from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, Linking} from 'react-native';
import {FlatList} from 'react-native';

import styled from 'styled-components/native';

import {MovieDetail, TVDetail} from '~/@types';
import {isMovieDetail} from '~/@types/typeGuards';

const Container = styled.View`
  background-color: #141414;
  padding: 0px 12px;
`;

const ContainerTitle = styled.Text`
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
  padding: 24px 0px 8px 0px;
`;

const InfoContainer = styled.View``;

const InfoRow = styled.View`
  flex-direction: row;
`;

const LabelInfo = styled.Text`
  color: #ffffff;
  opacity: 0.8;
`;

const DescriptionContainer = styled.View`
  margin-bottom: 10px;
`;

const Description = styled.Text`
  color: #ffffff;
  opacity: 0.8;
  line-height: 23px;
`;

const VideoSection = styled.View``;

const VideoContainer = styled.TouchableOpacity`
  margin: 0px 5px;
  width: 220px;
`;

const VideoImg = styled.Image`
  border-radius: 5px;
`;

const VideoTitle = styled.Text`
  font-size: 12px;
  margin: 5px 0px;
  margin-left: 2.5px;
  margin-bottom: 10px;
  color: #ffffff;
`;

interface Props {
  detail: MovieDetail | TVDetail;
}

const BasicInfo = ({detail}: Props) => {
  const runtime = isMovieDetail(detail)
    ? detail.runtime
    : detail?.episode_run_time[0];

  const date = isMovieDetail(detail)
    ? detail.release_date
    : detail?.first_air_date;

  const {t} = useTranslation();

  return (
    detail && (
      <Container style={{width: Dimensions.get('window').width}}>
        <ContainerTitle>{t('상세 정보')}</ContainerTitle>
        <InfoContainer>
          <InfoRow>
            <LabelInfo>
              {t('시간')} : {runtime ? t('분', {time: runtime}) : ' -'}
            </LabelInfo>
          </InfoRow>
          <InfoRow>
            <LabelInfo>
              {t('개봉')} : {date ? date : ' -'}
            </LabelInfo>
          </InfoRow>
          <InfoRow>
            <LabelInfo>
              {t('평점')} :{' '}
              {detail.vote_average && detail.vote_count
                ? `${detail.vote_average} (${t('투표수', {
                    amount: detail.vote_count,
                  })})`
                : ' -'}
            </LabelInfo>
          </InfoRow>
          <InfoRow>
            <LabelInfo>
              {t('국가')} :{' '}
              {detail.production_countries.length > 0
                ? detail.production_countries.map((country, index) =>
                    index === detail.production_countries.length - 1
                      ? country.name
                      : `${country.name}, `,
                  )
                : ' -'}
            </LabelInfo>
          </InfoRow>
        </InfoContainer>
        <DescriptionContainer>
          <ContainerTitle>{t('줄거리')}</ContainerTitle>
          <Description>{detail.overview ? detail.overview : ' -'}</Description>
        </DescriptionContainer>
        {detail.videos.results.length > 0 && (
          <VideoSection>
            <ContainerTitle>{t('관련 영상')}</ContainerTitle>
            <FlatList
              data={detail.videos.results}
              keyExtractor={(item, index) => `videoItem-${item.id}-${index}`}
              horizontal={true}
              initialNumToRender={20}
              renderItem={({item}) => (
                <VideoContainer
                  activeOpacity={0.7}
                  onPress={() => {
                    Linking.openURL(`Https://youtu.be/${item.key}`);
                  }}>
                  <VideoImg
                    source={{
                      uri: `https://img.youtube.com/vi/${item.key}/sddefault.jpg`,
                    }}
                    style={{width: 220, height: 123.75}}
                  />
                  <VideoTitle>{item.name}</VideoTitle>
                </VideoContainer>
              )}
            />
          </VideoSection>
        )}
      </Container>
    )
  );
};

export default BasicInfo;
