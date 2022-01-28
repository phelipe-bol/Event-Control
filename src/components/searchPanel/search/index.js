import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import Colors from '../../../styles/colors';
import Logo from '../../logo';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Search = ({report, value, clear}) => {
  return (
    <View style={styles.panelflex}>
      <Logo />
      <TextInput
        style={styles.input}
        value={report.name}
        placeholder="Pesquisar Convidados"
        onChangeText={(text) => {
          value({name: text});
        }}
      />
      <View style={styles.containerClose}>
        <View style={styles.close}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              clear(true);
            }}>
            <Icon
              style={styles.closeicon}
              name="close"
              size={15}
              color={Colors.grey}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  panelflex: {
    flex: 1,
  },
  logo: {
    width: 218,
    height: 60,
    resizeMode: 'stretch',
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 7,
  },
  input: {
    height: 35,
    width: 200,
    fontSize: 10,
    backgroundColor: Colors.white,
    marginLeft: 10,
    marginTop: 5,
  },
  containerClose: {
    flex: 1,
    width: 218,
    height: 32,
    marginLeft: 10,
  },
  close: {
    position: 'absolute',
    width: 20,
    height: 35,
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  closeicon: {
    position: 'absolute',
    bottom: 10,
    right: 3,
  },
});

export default Search;
