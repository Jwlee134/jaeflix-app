import React, {Dispatch} from 'react';

import {setLanguage} from '~/store/language';

import {Button, RadioButton, Dialog, Portal} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

interface Props {
  value: string;
  dispatch: Dispatch<any>;
  visible: boolean;
  hideDialog: () => void;
}

const LanguageDialog = ({value, dispatch, visible, hideDialog}: Props) => {
  const {t} = useTranslation();
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        style={{backgroundColor: '#252525'}}>
        <Dialog.Title style={{color: '#ffffff'}}>Language</Dialog.Title>
        <Dialog.Content>
          <RadioButton.Group
            onValueChange={(value) => {
              dispatch(setLanguage(value));
            }}
            value={value}>
            <RadioButton.Item
              labelStyle={{color: '#ffffff'}}
              label="한국어"
              value="ko-KR"
            />
            <RadioButton.Item
              labelStyle={{color: '#ffffff'}}
              label="English"
              value="en-US"
            />
          </RadioButton.Group>
        </Dialog.Content>
        <Dialog.Actions>
          <Button color="#ffffff" onPress={hideDialog}>
            {t('확인')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default LanguageDialog;
