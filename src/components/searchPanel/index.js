import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import Search from './search';
import QrCode from './qrcode';

const SearchPanel = ({searched, Onchange, ActivityOn}) => {
  const [matrix, setMatrix] = useState('');

  return (
    <View style={styles.panel}>
      <Search
        clear={(e) => {
          if (e === true) {
            setMatrix('');
            searched('');
          }
        }}
        value={(e) => {
          setMatrix(e);
          searched(e);
        }}
        report={matrix}
      />
      <QrCode
        respQr={(e) => {
          setMatrix(e);
          searched(e);
        }}
        change={(I) => {
          Onchange(I);
        }}
        ActivityOn={ActivityOn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    flexDirection: 'row',
  },
});

export default SearchPanel;
