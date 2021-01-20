import React from 'react';
import {Dimensions} from 'react-native';

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

  return (
    detail && (
      <Container style={{width: Dimensions.get('window').width}}>
        <ContainerTitle>상세 정보</ContainerTitle>
        <InfoContainer>
          <InfoRow>
            <LabelInfo>
              시간 : {runtime ? `${runtime}분` : '표시할 정보가 없습니다.'}
            </LabelInfo>
          </InfoRow>
          <InfoRow>
            <LabelInfo>
              개봉 : {date ? date : '표시할 정보가 없습니다.'}
            </LabelInfo>
          </InfoRow>
          <InfoRow>
            <LabelInfo>
              평점 :{' '}
              {detail.vote_average && detail.vote_count
                ? `${detail.vote_average} (${detail.vote_count}명 참여)`
                : '표시할 정보가 없습니다.'}
            </LabelInfo>
          </InfoRow>
          <InfoRow>
            <LabelInfo>
              국가 :{' '}
              {detail.production_countries.length > 0
                ? detail.production_countries.map((country, index) =>
                    index === detail.production_countries.length - 1
                      ? country.name
                      : `${country.name}, `,
                  )
                : '표시할 정보가 없습니다.'}
            </LabelInfo>
          </InfoRow>
        </InfoContainer>
        <DescriptionContainer>
          <ContainerTitle>줄거리</ContainerTitle>
          <Description>
            {detail.overview ? detail.overview : '표시할 정보가 없습니다.'}
          </Description>
        </DescriptionContainer>
      </Container>
    )
  );
};

export default BasicInfo;
