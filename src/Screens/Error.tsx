import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #252525;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
`;

const ErrorText = styled.Text``;

interface Props {
  message: string;
}

const Error = ({message}: Props) => {
  return (
    <Container>
      <ErrorText>{message}</ErrorText>
    </Container>
  );
};

export default Error;
