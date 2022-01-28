import React from 'react';
import {Image, StyleSheet} from 'react-native';

const Logo = () => {
  return (
    <Image style={styles.logo} source={require('../../styles/logo/Logo.png')} />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 218,
    height: 60,
    resizeMode: 'stretch',
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 7,
  },
});

export default Logo;
