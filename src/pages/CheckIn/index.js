import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Logo from '../../components/logo';
import FootCheckIn from '../../components/foot/checkin';
import VipList from '../../components/lists/vipsLists';
import CheckInList from '../../components/lists/checkinList';

import {getEntries} from '../../services/Entries';
import {saveEntry} from '../../services/Entries';
import CategoryPicker from '../../components/Picker';

const CheckIn = ({navigation}) => {
  const [change, setChange] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [entries, setEntries] = useState([]);
  const [value, setValue] = useState('');
  const [ShowCategory, setShowCategory] = useState(false);
  const [EntryCategory, setEntryCategory] = useState([]);
  const [UnikActivityState, setUnikActivityIndicator] = useState('');

  useEffect(() => {
    async function loadEntries() {
      const data = await getEntries();
      setEntries(data.filtered('isCheckin == true').sorted('name'));
      setUnikActivityIndicator('');
    }

    loadEntries();
  }, [change]);

  const clear = () => {
    setValue('');
  };

  const onSave = (item, checkin) => {
    const data = {
      id: item.id,
      name: item.name,
      isCheckin: checkin,
    };

    saveEntry(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <Image
          style={styles.logocheckin}
          source={require('../../styles/images/Checkin.png')}
        />
      </View>
      <Text style={styles.texttitle}>CONVIDADOS NORMAIS</Text>
      <CheckInList
        onChange={(num) => {
          setChange(num);
        }}
        navigation={navigation}
      />
      <Text style={styles.texttitle}>CONVIDADOS CERIMONIAIS</Text>
      <VipList
        navigation={navigation}
        onChange={(num) => {
          setChange(num);
        }}
      />
      <View style={styles.listMenu}>
        <TouchableOpacity
          onPress={() =>
            modalVisible ? setModalVisible(false) : setModalVisible(true)
          }>
          <Icon
            style={styles.ListSearch}
            name="account-search"
            size={28}
            color={Colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Icon
            style={styles.ListClock}
            name="account-clock"
            size={26}
            color={Colors.black}
          />
        </TouchableOpacity>
        <Modal animationType="slide" visible={modalVisible}>
          <View style={styles.modalSearch}>
            <TouchableOpacity
              style={styles.closeModal}
              onPress={() =>
                modalVisible ? setModalVisible(false) : setModalVisible(true)
              }>
              <Icon name="close" size={25} color={Colors.black} />
            </TouchableOpacity>
            <View style={styles.panelSearchModal}>
              <TextInput
                style={styles.input}
                placeholder="Pesquisar Convidados CHECK-IN"
                value={value}
                onChangeText={(text) => {
                  setValue(text);
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
            <View style={styles.flatlistModal}>
              {entries.length === 0 && (
                <View style={styles.listext}>
                  <Text style={styles.text}>NÃO HÁ CONVIDADOS CADASTRADOS</Text>
                </View>
              )}
              {entries.length >= 1 && (
                <FlatList
                  data={
                    value !== '' && value !== undefined
                      ? entries.filtered('name LIKE [c] $0', value + '*')
                      : entries
                  }
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
                            'Tem certeza que deseja dar "Check-out" nesse convidado?',
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
                                },
                              },
                            ],
                            {cancelable: true},
                          );
                        }}
                        style={styles.name}>
                        <Icon
                          name="check-circle"
                          style={styles.checkicon}
                          size={20}
                          color={Colors.checkin}
                        />
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
                          size={25}
                          color={Colors.black}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              )}
            </View>
            <FootCheckIn change={change} />
            <CategoryPicker
              modalVisible={ShowCategory}
              entry={EntryCategory}
              modalInvisible={setShowCategory}
              change={(RtChange) => {
                setChange(change + RtChange);
              }}
            />
          </View>
        </Modal>
      </View>
      <FootCheckIn change={change} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  logo: {
    flex: 1,
  },
  logocheckin: {
    width: 100,
    height: 40,
    resizeMode: 'stretch',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 15,
  },
  cabecalho: {
    flexDirection: 'row',
  },

  listMenu: {
    marginHorizontal: 10,
    flexDirection: 'row-reverse',
  },
  ListSearch: {
    marginLeft: 8,
  },
  texttitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: -5,
  },
  closeModal: {
    position: 'absolute',
    right: 0,
  },
  modalSearch: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  panelSearchModal: {
    marginTop: 10,
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
  flatlistModal: {
    backgroundColor: Colors.list,
    flex: 1,
    marginVertical: 15,
    marginHorizontal: 10,
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
  checkicon: {
    right: 10,
    paddingLeft: 10,
  },
  categorybox: {
    marginRight: 10,
  },
  buttonCategory: {
    flexDirection: 'row',
  },
  ActivityStyle: {
    marginRight: 40,
    marginLeft: 10,
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

export default CheckIn;
