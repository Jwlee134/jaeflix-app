import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  height: 40px;
  padding: 0px 12px;
  margin: 10px 20px;
  border-radius: 8px;
  background-color: #333333;
`;

const InputField = styled.TextInput`
  flex: 1;
  color: #ffffff;
  opacity: 0.7;
`;

interface Props {
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  style?: Object;
  clearMode?: boolean;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
}

const Input = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  style,
  clearMode,
  onChangeText,
  onSubmitEditing,
}: Props) => {
  return (
    <Container style={style}>
      <InputField
        selectionColor="#aaaaaa"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ? keyboardType : 'default'}
        autoCapitalize="none"
        autoCorrect={false}
        allowFontScaling={false}
        placeholderTextColor="#FFFFFF"
        placeholder={placeholder}
        clearButtonMode={clearMode ? 'while-editing' : 'never'}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
    </Container>
  );
};

export default Input;
