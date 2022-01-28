import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../../styles/colors';

import CategoryPicker from '../../Picker';

import {saveEntry} from '../../../services/Entries';
import {getEntries} from '../../../services/Entries';

const VipList = ({navigation, onChange}) => {
  const [entries, setEntries] = useState([]);
  const [change, setChange] = useState(0);
  const [ShowCategory, setShowCategory] = useState(false);
  const [EntryCategory, setEntryCategory] = useState([]);
  const [ActivityState, setActivityIndicator] = useState(true);
  const [UnikActivityState, setUnikActivityIndicator] = useState('');

  useEffect(() => {
    async function loadEntries() {
      const data = await getEntries();
      setEntries(
        data
          .filtered('isCheckin == true AND category.name !=[c] "normal"')
          .sorted('name'),
      );
    }
    setActivityIndicator(false);
    setUnikActivityIndicator('');
    loadEntries();
  }, [change]);

  const onSave = (item, checkin) => {
    const data = {
      id: item.id,
      name: item.name,
      isCheckin: checkin,
    };

    saveEntry(data);
  };

  return (
    <View style={styles.list}>
      {ActivityState && (
        <ActivityIndicator
          style={styles.listext}
          animating={ActivityState}
          size="large"
          color="#000"
        />
      )}
      {entries.length === 0 && !ActivityState && (
        <View style={styles.listext}>
          <Text style={styles.text}>NÃO HÁ CONVIDADOS EM CHECK-IN</Text>
        </View>
      )}
      {entries.length >= 1 && (
        <FlatList
          data={entries}
          style={styles.flatList}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View
              style={[
                styles.flatlistitem,
                {
                  backgroundColor:
                    item.category.name === 'Normal'
                      ? Colors.listItem
                      : item.category.name.toUpperCase() === 'FAMÍLIA'
                      ? Colors.familia
                      : item.category.name.toUpperCase() === 'PADRINHOS'
                      ? Colors.padrinhos
                      : Colors.crianças,
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Atenção',
                    `Tem certeza que deseja dar "Check-out" em ${item.name} ?`,
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {},
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => {
                          onSave(item, false);
                          setChange(change + 1);
                          onChange(change + 1);
                        },
                      },
                    ],
                    {cancelable: true},
                  );
                }}
                style={styles.name}>
                <View style={styles.mainCheckIcon}>
                  <Icon
                    name="check-circle"
                    style={styles.checkicon}
                    size={20}
                    color={Colors.checkin}
                  />
                </View>
                <Text>{item.name.toUpperCase()} </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCategory}
                onPress={() => {
                  setUnikActivityIndicator(item.name);
                  setEntryCategory(item);
                  setShowCategory(true);
                }}>
                <Icon
                  style={styles.categorybox}
                  name="account-box"
                  size={20}
                  color={
                    item.category.name === 'Normal'
                      ? Colors.black
                      : item.category.color
                  }
                />
                {item.name === UnikActivityState && (
                  <ActivityIndicator
                    style={styles.ActivityStyle}
                    animating={item.name === UnikActivityState}
                    size="small"
                    color="#000"
                  />
                )}
                {!(item.name === UnikActivityState) && (
                  <Text style={styles.category}>
                    {item.category.name.toUpperCase()}
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Entry', {Entry: item});
                }}>
                <Icon
                  style={styles.options}
                  name="account-details"
                  size={22}
                  color={Colors.black}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <CategoryPicker
        modalVisible={ShowCategory}
        entry={EntryCategory}
        modalInvisible={setShowCategory}
        change={(RtChange) => {
          setChange(change + RtChange);
          onChange(change + RtChange);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: Colors.list,
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 3,
  },
  listext: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: Colors.background,
    alignSelf: 'center',
  },
  flatlistitem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginHorizontal: 5,
    marginVertical: 2.5,
  },
  flatList: {
    flex: 1,
  },
  mainCheckIcon: {
    justifyContent: 'center',
  },
  checkicon: {
    right: 10,
    paddingLeft: 10,
  },
  categorybox: {
    marginHorizontal: 5,
  },
  buttonCategory: {
    flexDirection: 'row',
  },
  ActivityStyle: {
    marginRight: 40,
    marginLeft: 10,
  },
  nameText: {
    flex: 2,
  },
  name: {
    flex: 2,
    flexDirection: 'row',
  },
  category: {
    marginRight: 20,
  },
  options: {
    marginRight: 10,
  },
});

export default VipList;
