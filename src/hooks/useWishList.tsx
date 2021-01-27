import React, {useCallback, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '~/store';
import {addMovie, addTV, removeMovie, removeTV} from '~/store/wishList';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MovieDetail, TVDetail} from '~/@types';

const Button = styled.TouchableOpacity`
  margin-right: 12px;
  color: #ffffff;
`;

const useWishList = (
  navigation: any,
  title: string,
  detail: MovieDetail | TVDetail | null,
  name: string,
) => {
  const {movieList, tvList} = useSelector((state: RootState) => state.wishList);
  const dispatch = useDispatch();

  const handlePress = useCallback(() => {
    if (name === 'MovieDetail') {
      detail && dispatch(addMovie(detail));
    } else {
      detail && dispatch(addTV(detail));
    }
  }, [detail, dispatch, name]);

  const handleDelete = useCallback(() => {
    if (name === 'MovieDetail') {
      detail && dispatch(removeMovie(detail.id));
    } else {
      detail && dispatch(removeTV(detail.id));
    }
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleDelete}>
          <Icon name="heart-o" size={23} />
        </Button>
      ),
    });
  }, [detail, dispatch, navigation, name]);

  const handleRemember = useCallback(() => {
    let data;
    if (detail) {
      if (name === 'MovieDetail' && movieList.length > 0) {
        data = movieList.find((item) => item.id === detail.id);
        if (data?.id === detail.id) {
          navigation.setOptions({
            headerRight: () => (
              <Button onPress={handleDelete}>
                <Icon name="heart" size={23} />
              </Button>
            ),
          });
        }
      } else if (name === 'TVDetail' && tvList.length > 0) {
        data = tvList.find((item) => item.id === detail.id);
        if (data?.id === detail.id) {
          navigation.setOptions({
            headerRight: () => (
              <Button onPress={handleDelete}>
                <Icon name="heart" size={23} />
              </Button>
            ),
          });
        }
      }
    }
  }, [detail, movieList, navigation, handleDelete, name, tvList]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
      headerRight: () => (
        <Button onPress={handlePress}>
          <Icon name="heart-o" size={23} />
        </Button>
      ),
    });
    handleRemember();
  }, [navigation, title, handlePress, handleRemember]);

  return {handleRemember, handlePress};
};

export default useWishList;
