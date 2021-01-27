import React, {Dispatch} from 'react';

import {setLanguage} from '~/store/language';

import {Button, RadioButton, Dialog, Portal} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

interface Props {
  value: string;
  dispatch: Dispatch<any>;
  visible: boolean;
  saveLanguage: () => void;
  closeDialog: () => void;
}

const LanguageDialog = ({
  value,
  dispatch,
  visible,
  saveLanguage,
  closeDialog,
}: Props) => {
  const {t} = useTranslation();
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={closeDialog}
        style={{backgroundColor: '#252525'}}>
        <Dialog.Title style={{color: '#ffffff'}}>Language</Dialog.Title>
        <Dialog.Content>
          <RadioButton.Group
            onValueChange={(newValue) => {
              dispatch(setLanguage(newValue));
            }}
            value={value}>
            <RadioButton.Item
              labelStyle={{color: '#ffffff'}}
              uncheckedColor="#dddddd"
              label="한국어"
              value="ko-KR"
            />
            <RadioButton.Item
              labelStyle={{color: '#ffffff'}}
              uncheckedColor="#dddddd"
              label="English"
              value="en-US"
            />
          </RadioButton.Group>
        </Dialog.Content>
        <Dialog.Actions>
          <Button color="#ffffff" onPress={saveLanguage}>
            {t('확인')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default LanguageDialog;
