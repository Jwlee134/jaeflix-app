import React from 'react';
import {Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {isMovieDetail} from '~/@types/typeGuards';
import {RootState} from '~/store';
import Credits from './Credits';

const Container = styled.View`
  background-color: #141414;
  flex: 1;
  padding: 0px 16px;
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

const BasicInfo = () => {
  const {detail} = useSelector((state: RootState) => state.detail);

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
              시간 : {runtime ? `${runtime}분` : '등록되지 않음'}
            </LabelInfo>
          </InfoRow>
          <InfoRow>
            <LabelInfo>개봉 : {date ? date : '등록되지 않음'}</LabelInfo>
          </InfoRow>
          <InfoRow>
            <LabelInfo>
              평점 :{' '}
              {detail.vote_average && detail.vote_count
                ? `${detail.vote_average} (${detail.vote_count}명 참여)`
                : '등록되지 않음'}
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
                : '등록되지 않음'}
            </LabelInfo>
          </InfoRow>
        </InfoContainer>
        <DescriptionContainer>
          <ContainerTitle>줄거리</ContainerTitle>
          <Description>
            {detail.overview ? detail.overview : '등록되지 않음'}
          </Description>
        </DescriptionContainer>
      </Container>
    )
  );
};

export default BasicInfo;
