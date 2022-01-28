/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
  Alert,
} from 'react-native';

import {TextInputMask} from 'react-native-masked-text';

import Colors from '../../styles/colors';

import Logo from '../../components/logo';
import Foot from '../../components/foot';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import NewEntryCategoryPicker from './Picker';

import {getInitCategories} from '../../services/Categories';

import {saveEntry} from '../../services/Entries';
import {getEntries} from '../../services/Entries';
import {deleteEntry} from '../../services/Entries';

const Entry = ({navigation}) => {
  const [defaltCategory, setDefaltCategory] = useState([{name: 'Normal'}]);

  useEffect(() => {
    async function loadCategory() {
      const data = await getInitCategories();
      setDefaltCategory(data);
    }
    loadCategory();
  }, []);

  const entry = navigation.getParam('Entry', {
    id: null,
    name: undefined,
    contact: '',
    category: {id: defaltCategory[0].id, name: defaltCategory[0].name},
  });

  const [value, setValue] = useState(entry.name);
  const [contact, setContact] = useState(entry.contact);
  const [category, setCategoryes] = useState(entry.category);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function loadEntries() {
      const data = await getEntries();
      setEntries(data);
    }

    loadEntries();
  }, []);

  const isValid = () => {
    const regex = /^[a-zA-Z\u00C0-\u017F ]{3,30}$/;
    const regexcont = /^\([1-9]{2}\) ([2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/;
    let testCategory =
      category === undefined ? entry.category.name : category.name;

    if (
      String(value) !== '' &&
      value !== undefined &&
      regex.test(value) === true &&
      (regexcont.test(contact) === true ||
        contact === undefined ||
        String(contact) === '') &&
      ((entry.name !== true &&
        (value !== entry.name || contact !== entry.contact)) ||
        entry.name === undefined ||
        entry.category.name !== testCategory)
    ) {
      return true;
    }

    return false;
  };

  const onRepeatName = () => {
    Alert.alert(
      'Atenção',
      'Já existe um convidado com esse nome, altere algum caractere e tente novamente.',
      [
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
  };

  const onSave = () => {
    let testName = 0;

    if (value !== entry.name) {
      for (let index = 0; index < entries.length; index++) {
        const element = entries[index];

        if (element.name.toUpperCase() === value.toUpperCase()) {
          onRepeatName();
          break;
        } else {
          testName++;
        }
      }
    }

    if (testName === entries.length || value === entry.name) {
      const data = {
        name: String(value.toUpperCase()),
        contact: String(contact),
        category: category,
      };

      console.log('data', data);

      saveEntry(data, entry);
      onClose();
    }
  };

  const onDelete = () => {
    Alert.alert(
      'Atenção',
      'Tem certeza que deseja apagar esse convidado?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteEntry(entry);
            onClose();
          },
        },
      ],
      {cancelable: true},
    );
  };

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <Image
          style={styles.logocheckin}
          source={require('../../styles/images/Cadastro.png')}
        />
      </View>

      <View style={styles.containerInputPlus}>
        <View>
          <ScrollView style={styles.containerInput}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setValue(text)}
              placeholder="Nome"
              value={entry.name && value}
            />

            <NewEntryCategoryPicker
              onChangeCategory={setCategoryes}
              entryCategory={category === undefined ? entry.category : category}
            />
            <TextInputMask
              style={styles.input}
              type={'cel-phone'}
              placeholder="(00) 00000-0000"
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              value={contact}
              onChangeText={(text) => setContact(text)}
            />
            <View style={styles.frameListMenu}>
              <View style={styles.listMenu}>
                <TouchableOpacity
                  style={[styles.buttom, {backgroundColor: Colors.list}]}
                  onPress={onClose}>
                  <Text>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    isValid() && onSave();
                  }}
                  style={[
                    styles.buttom,
                    {
                      backgroundColor:
                        isValid() === true ? Colors.list : Colors.backloung,
                    },
                  ]}>
                  <Text>
                    {entry.name && 'Atualizar'}
                    {!entry.name && 'Adicionar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {entry.name && (
              <View style={styles.delete}>
                <TouchableOpacity
                  style={styles.deleteTouch}
                  onPress={() => {
                    onDelete();
                  }}>
                  <Icon
                    style={styles.deleteicon}
                    name="trash-can-outline"
                    size={50}
                    color={Colors.black}
                  />
                  <Text style={{fontSize: 10}}>APAGAR</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
      <Foot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  containerInputPlus: {
    flex: 1,
    justifyContent: 'center',
  },
  containerInput: {},
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
  input: {
    height: 50,
    width: 300,
    borderRadius: 15,
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: Colors.list,
  },
  listMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginHorizontal: 40,
    marginTop: 40,
  },
  frameListMenu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  ListAdd: {
    marginLeft: 5,
  },
  buttom: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  delete: {
    flexDirection: 'row-reverse',
    marginLeft: 10,
    marginTop: 20,
  },
  deleteTouch: {
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default Entry;
