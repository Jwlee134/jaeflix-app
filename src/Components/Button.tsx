import React from 'react';
import styled from 'styled-components/native';

const StyleButton = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  border: 1px;
  border-color: #333333;
`;

const Label = styled.Text`
  color: #ffffff;
`;

interface Props {
  style?: Object;
  label: string;
  onPress?: () => void;
}

const Button = ({style, label, onPress}: Props) => {
  return (
    <StyleButton style={style} onPress={onPress}>
      <Label>{label}</Label>
    </StyleButton>
  );
};

export default Button;
