import React from 'react';

import {Dialog, Portal} from 'react-native-paper';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';

const SDialog = styled(Dialog)`
  align-self: center;
  background-color: transparent;
  border-radius: 100px;
`;

const SLottieView = styled(LottieView)`
  width: 200px;
`;

const Label = styled.Text`
  text-align: center;
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
`;

interface Props {
  visible: boolean;
}

const RestartDialog = ({visible}: Props) => {
  const loadingAnimation = require('~/Assets/2469-dino-dance.json');
  return (
    <Portal>
      <SDialog visible={visible} dismissable={false}>
        <Dialog.Content>
          <SLottieView autoPlay source={loadingAnimation} />
          <Label>Just a second...</Label>
        </Dialog.Content>
      </SDialog>
    </Portal>
  );
};

export default RestartDialog;
