import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #141414;
`;

const Loading = () => {
  return (
    <Container>
      <ActivityIndicator color="E70915" size="large" />
    </Container>
  );
};

export default Loading;
