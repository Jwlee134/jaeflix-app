import React, {useCallback, useLayoutEffect, useState} from 'react';
import {isMovieDetail} from '~/@types/typeGuards';

import styled from 'styled-components/native';

import BigCatalog from '~/Components/BigCatalog';
import BasicInfo from './BasicInfo';
import Loading from '../Loading';
import Error from '../Error';
import Credits from './Credits';
import Similar from './Similar';

import useDetailLogic from '~/hooks/useDetailLogic';

import {useDispatch, useSelector} from 'react-redux';
import {add, remove} from '~/store/wishList';
import {RootState} from '~/store';
import useWishList from '~/hooks/useWishList';

import Icon from 'react-native-vector-icons/FontAwesome';

const Container = styled.ScrollView`
  background-color: #141414;
`;

const SubInfoContainer = styled.View``;

const Button = styled.TouchableOpacity`
  margin-right: 12px;
`;

/* type ProfileScreenNavigationProp = StackNavigationProp<
  MovieNaviParamList | TVNaviParamList
>;
type ProfileScreenRouteProp = RouteProp<MovieNaviParamList | TVNaviParamList>;
interface Props {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
} */

const Detail = ({navigation, route}: any) => {
  const {
    params: {id, title},
    name,
  } = route;

  const {detail, casts, crews, loading, error, similar} = useDetailLogic(
    id,
    name,
  );

  useWishList(navigation, title, detail, name);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} />;
  }
  return (
    detail && (
      <Container>
        <BigCatalog
          id={detail.id}
          image={detail.backdrop_path}
          title={isMovieDetail(detail) ? detail.title : detail.name}
          subtitle={detail.genres.map((genre, index) =>
            index === detail.genres.length - 1 ? genre.name : `${genre.name}, `,
          )}
        />
        <SubInfoContainer>
          <BasicInfo detail={detail} />
          <Credits crew={crews} cast={casts} />
          <Similar similar={similar} name={name && name} />
        </SubInfoContainer>
      </Container>
    )
  );
};

export default Detail;
