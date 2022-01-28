import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Colors from '../../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

import QrCheck from './QrCheck';

import QRCodeScanner from 'react-native-qrcode-scanner';

const QrCode = ({respQr, change, ActivityOn}) => {
  const [Onchange, onTest, clear, Activity] = QrCheck();
  useEffect(() => {
    ActivityOn(Activity);
    change(Onchange);
    if (clear) {
      respQr('');
    }
  }, [Onchange, change, respQr, clear, Activity, ActivityOn]);
  const [qrCode, setQrCode] = useState(false);
  const [flip, setFlip] = useState('back');
  const [modalQr, setModalQr] = useState({
    backgroundColor: '#fff',
    width: 110,
    height: 110,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 5,
  });

  const window = Dimensions.get('window');

  const [heightQR, setHeightQR] = useState(
    window.height < window.width ? 110 : 93,
  );
  const [rightQR, setRightQR] = useState(
    window.height < window.width ? -18 : 0,
  );
  const [cropQR, setCropQR] = useState(
    window.height < window.width ? {right: 2, top: 3} : {right: 4, top: 10},
  );
  const [closeQR, setCloseQR] = useState(
    window.height < window.width ? {right: -20, top: -2} : {right: -2, top: 2},
  );
  const [flipQR, setFlipQR] = useState(
    window.height < window.width ? {left: -18, bottom: -111} : {bottom: -121},
  );

  const onModal = () => {
    setModalQr({
      backgroundColor: '#fff',
      width: 110,
      height: 110,
      marginTop: 10,
      marginRight: 10,
      marginLeft: 5,
    });
  };

  const onChange = () => {
    setQrCode(false);
    onModal();

    if (window.height > window.width) {
      setHeightQR(110);
      setRightQR(-18);
      setCropQR({right: 2, top: 3});
      setCloseQR({right: -20, top: -2});
      setFlipQR({left: -18, bottom: -111});
    } else {
      setHeightQR(93);
      setRightQR(0);
      setCropQR({right: 4, top: 10});
      setCloseQR({right: -2, top: 2});
      setFlipQR({bottom: -121});
    }
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  return (
    <View>
      <View style={styles.mask} />
      <View style={[styles.modal, modalQr]}>
        {!qrCode && (
          <TouchableOpacity
            onPress={() => {
              setQrCode(true);
              if (window.height > window.width) {
                setModalQr({
                  backgroundColor: '#000',
                  width: 110,
                  height: 120,
                  marginTop: 0,
                  marginRight: 10,
                  marginLeft: 5,
                });
              } else {
                setModalQr({
                  backgroundColor: '#000',
                  width: 146,
                  height: 110,
                  marginTop: 10,
                  marginRight: 10,
                  marginLeft: 5,
                });
              }
            }}>
            <Text style={styles.modalQrText}>BUSCAR COM QR-CODE</Text>
            <Icon
              style={styles.modalQrIcon}
              name="qr-code-scanner"
              size={98}
              color={Colors.black}
            />
          </TouchableOpacity>
        )}
        {qrCode && (
          <View>
            <QRCodeScanner
              onRead={(e) => {
                respQr({name: e.data});
                onTest({name: e.data});
              }}
              showMarker={true}
              checkAndroid6Permissions={true}
              reactivate={true}
              cameraType={flip}
              customMarker={
                <View>
                  <Icon
                    style={[styles.modalQrcrop, cropQR]}
                    name="crop-free"
                    size={100}
                    color={Colors.white}
                  />
                  <TouchableOpacity
                    style={[styles.modalQrclose, closeQR]}
                    onPress={() => {
                      setQrCode(false);
                      onModal();
                    }}>
                    <Icon name="close" size={20} color={Colors.white} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      flip === 'back' ? setFlip('front') : setFlip('back');
                    }}
                    style={[styles.modalQrflip, flipQR]}>
                    <Icon
                      name="flip-camera-ios"
                      size={20}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                </View>
              }
              cameraProps={{
                zoom: 0.7,
                style: {
                  width: 110,
                  height: heightQR,
                  right: rightQR,
                },
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalQrText: {
    marginLeft: 5,
    fontSize: 9,
    fontWeight: 'bold',
  },
  modalQrIcon: {
    marginLeft: 6.5,
  },
  modalQrclose: {
    position: 'absolute',
  },
  modalQrflip: {
    position: 'absolute',
  },
  modalQrcrop: {
    position: 'absolute',
  },
  textoqrcode: {
    position: 'absolute',
    right: 7,
    top: 15,
  },
  mask: {
    backgroundColor: Colors.background,
    position: 'absolute',
    width: 2000,
    height: 5,
    top: 0,
    zIndex: 1,
  },
});

export default QrCode;
