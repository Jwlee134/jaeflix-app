import React from 'react';

import styled from 'styled-components/native';

import LottieView from 'lottie-react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #141414;
`;

const SLottieView = styled(LottieView)`
  height: 100px;
`;

const Loading = () => {
  const loadingAnimation = require('~/Assets/51-preloader.json');

  return (
    <Container>
      <SLottieView autoPlay source={loadingAnimation} />
    </Container>
  );
};

export default Loading;
