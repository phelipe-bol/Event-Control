import React, {useEffect} from 'react';
import {
  Linking,
  Modal,
  Alert,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

const InsertQRCODE = ({
  promptVisible,
  promptInvisible,
  change,
  ListEntryPress,
  Loading,
}) => {
  const window = Dimensions.get('window');

  const onChange = () => {
    if (window.height > window.width) {
      Alert.alert(
        'O sistema não aceita virar a câmera, tente novamente sem virar a câmera',
      );
      onClose();
    }
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });
  const onSite = () => {
    Linking.openURL(
      'http://yasmineventos.com.br/listadeconvidados/',
    ).catch((err) => console.error('An error occured', err));
  };
  const onClose = () => {
    promptInvisible(false);
  };

  const onSucess = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        ListEntryPress(responseJson);
        promptInvisible(false);
        change(1);
      })
      .catch((error) => {
        Loading(false);
        Alert.alert('Erro ao ler QR Code, link inválido', error.message);
      });
  };

  return (
    <Modal transparent={false} visible={promptVisible}>
      <QRCodeScanner
        onRead={(e) => {
          Loading(true);
          onSucess(e.data);
        }}
        showMarker={true}
        cameraStyle={styles.modalQr}
        cameraProps={{
          style: {
            width: 300,
            height: 400,
          },
        }}
        topContent={
          <TouchableWithoutFeedback onPress={onSite}>
            <Text style={styles.centerText}>
              Vá para{'\n'}
              <Text style={styles.textBold}>
                http://yasmineventos.com.br/listadeconvidados/{'\n'}
              </Text>
              Crie sua lista de convidados, e gere seu QR Code.
            </Text>
          </TouchableWithoutFeedback>
        }
        bottomContent={
          <TouchableOpacity onPress={onClose} style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        }
      />
    </Modal>
  );
};
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    padding: 20,
    color: '#777',
  },
  textBold: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#000',
  },
  buttonTouchable: {
    marginTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 15,
  },
  modalQr: {
    alignSelf: 'center',
    width: 300,
    height: 400,
  },
});
export default InsertQRCODE;
