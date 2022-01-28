import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getEntries} from '../../services/Entries';

const Foot = ({change}) => {
  const [conviLoad, setConviLoad] = useState([]);
  const [conviCheck, setConviCheck] = useState([]);
  const [ceriLoad, setceriLoad] = useState([]);
  const [ceriCheck, setceriCheck] = useState([]);

  useEffect(() => {
    async function loadEntries() {
      const data = await getEntries();
      setConviLoad(data.filtered('isCheckin == false'));
      setConviCheck(data.filtered('isCheckin == true'));
      setceriLoad(
        data.filtered('isCheckin == false AND category.name !=[c] "normal"'),
      );
      setceriCheck(
        data.filtered('isCheckin == true AND category.name !=[c] "normal"'),
      );
    }

    loadEntries();
  }, [change]);

  return (
    <View style={styles.foot}>
      <Text style={styles.footText}>CONVIDADOS</Text>
      <Icon
        style={styles.footIconCheckin}
        name="account-check"
        size={21}
        color={Colors.black}
      />
      <Text style={styles.footText}>{conviCheck.length}</Text>
      <Icon
        style={styles.footIconclock}
        name="account-clock"
        size={20}
        color={Colors.black}
      />
      <Text style={styles.footText}>{conviLoad.length}</Text>
      <Text style={styles.footText}>| CERIMONIAL</Text>
      <Icon
        style={styles.footIconCheckin}
        name="account-check"
        size={21}
        color={Colors.black}
      />
      <Text style={styles.footText}>{ceriCheck.length}</Text>
      <Icon
        style={styles.footIconclock}
        name="account-clock"
        size={20}
        color={Colors.black}
      />
      <Text style={styles.footText}>{ceriLoad.length} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  foot: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.list,
    marginTop: 1,
    paddingBottom: 1,
    paddingTop: 1,
  },
  footText: {
    marginLeft: 3,
    marginRight: 3,
    fontSize: 12.5,
    justifyContent: 'center',
  },
});

export default Foot;
