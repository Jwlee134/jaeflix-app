import React from 'react';
import styled from 'styled-components/native';

import LottieView from 'lottie-react-native';

const Container = styled.View`
  flex: 1;
  background-color: #141414;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
`;

const ErrorText = styled.Text`
  color: rgba(255, 255, 255, 0.7);
`;

const SLottieView = styled(LottieView)`
  opacity: 0.7;
  height: 150px;
`;

interface Props {
  message: string;
  wishList?: boolean;
}

const Error = ({message, wishList}: Props) => {
  const empty = require('~/Assets/empty.json');
  return (
    <Container>
      {wishList && <SLottieView autoPlay source={empty} />}
      <ErrorText>{message}</ErrorText>
    </Container>
  );
};

export default Error;
