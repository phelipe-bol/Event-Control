import React, {useState, useEffect} from 'react';
import {
  Alert,
  Modal,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import InsertText from './insertText';
import InsertQRCODE from './insertQRCODE';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../styles/colors';

import {getRealm} from '../Realm';
import {GetId} from '../../services/GetId';
import {getInitCategories, getAllCategories} from '../Categories';
import {getEntries} from '../../services/Entries';

const InsertList = ({insertVisible, insertInvisible, change}) => {
  const [insertVisibleText, setInsertVisibleText] = useState(false);
  const [insertVisibleQRCODE, setinsertVisibleQRCODE] = useState(false);
  const [defaltCategory, setDefaltCategory] = useState([{name: 'Normal'}]);
  const [allCategory, setAllCategory] = useState([{}]);
  const [entries, setEntries] = useState([]);
  const [valueListText, setValueListText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCategory() {
      const data = await getInitCategories();
      setDefaltCategory(data);
    }
    loadCategory();
  }, []);

  useEffect(() => {
    async function loadCategory() {
      const data = await getAllCategories();
      setAllCategory(data);
    }
    loadCategory();
  }, []);

  useEffect(() => {
    async function loadEntries() {
      const data = await getEntries();
      setEntries(data);
    }

    loadEntries();
  }, []);

  const saveEntry = async (value) => {
    const realm = await getRealm();
    let data = {};
    try {
      for (let i = 0; i < value.length; i++) {
        realm.write(() => {
          data = {
            id: GetId(),
            name: value[i].name || value[i],
            contact: value[i].contact || '',
            isCheckin: false,
            isInit: false,
            category: allCategory[value[i].category] || {
              id: defaltCategory[0].id,
              name: defaltCategory[0].name,
            },
          };

          realm.create('Entry', data, true);
        });
      }
      setLoading(false);
      Alert.alert(
        'Banco de convidados criado com sucesso!',
        `forão criados ${value.length} convidados`,
      );
      change(1);
    } catch (error) {
      setLoading(false);
      console.error('CrieteAll :: error on criete todo o object: ', error);
      Alert.alert('Erro ao criar banco de convidados.');
    }
  };

  const ListEntryPress = (Link = [{}]) => {
    const regex = /^[a-zA-Z\u00C0-\u017F ]{3,30}$/;
    let Name = valueListText ? valueListText.toUpperCase().split('\n') : [];
    let testName = true;
    let mensage = '';
    const save = valueListText ? Name : Link;
    console.log(Link);
    if (Link[0].name) {
      Link.forEach((element) => {
        Name.push(element.name);
      });
    }

    if (regex.test(Name[0]) === false) {
      testName = false;
    }

    if (entries.length > 0) {
      for (let i = 0; i < entries.length; i++) {
        for (let a = 0; a < Name.length; a++) {
          let protectObject =
            i + a >= entries.length ? entries[i + a] : entries[i + a].name;
          if (protectObject === Name[a]) {
            testName = false;
            mensage = `Atenção nome duplicado: Já existe um ${protectObject} cadastrado no banco de dados, altere algum caractere e tente novamente`;
          }
        }
      }
    }

    for (let i = 0; i < Name.length; i++) {
      for (let a = 1; a < Name.length; a++) {
        if (Name[i] === Name[a + i]) {
          testName = false;
          mensage = `Atenção o nome ${Name[i]} está duplicado nesta lista, altere algum caractere e tente novamente`;
        }
        if (regex.test(Name[i]) === false) {
          testName = false;
          mensage = `Atenção o nome ${Name[i]} tem caracteres invalidos, numeros ou precisar ter de 03 a 30 caracteres. altere e tente novamente`;
        }
      }
    }

    if (String(Name[0]) === '' || Name[0] === undefined || testName === false) {
      if (!valueListText) {
        setLoading(false);
        Alert.alert(
          'QR CODE INVÁLIDO',
          `O QR Code criado tem valores inválidos. Ex. só é válido caracteres de A à Z sem números e sem caracteres especiais, o nome precisa ter no mínimo 3  e no maximo 30 caracteres e não pode haver nomes repetidos na lista ou que já estão cadastrados \n\nProvavel erro: ${mensage} \n\nVolte para o cadastro de convidados e altere os dados e gere outro QR CODE.`,
        );
      } else {
        setLoading(false);
        Alert.alert(
          'Atenção lista inválida',
          `Você precisa escrever apenas caracteres válidos. Ex. A à Z sem números e sem caracteres especiais, o nome precisa ter no mínimo 3  e no maximo 30 caracteres e não pode haver nomes repetidos na lista ou que já estão cadastrados \n\n${mensage}`,
        );
      }
    } else {
      saveEntry(save);
      setInsertVisibleText(false);
      setinsertVisibleQRCODE(false);
    }
  };

  return (
    <View>
      {insertVisible && (
        <Modal transparent={true} visible={true}>
          <TouchableWithoutFeedback
            onPress={() => {
              insertInvisible(false);
            }}>
            <View style={styles.containerInsert}>
              <View style={styles.prompt}>
                <Text style={styles.textPrompt}>
                  ESCOLHA COMO DESEJA IMPORTAR
                </Text>
                <View style={styles.promptlist}>
                  <View style={styles.options}>
                    <TouchableOpacity
                      style={styles.optionsList}
                      onPress={() => {
                        insertInvisible(false);
                        setInsertVisibleText(true);
                      }}>
                      <Icon
                        style={styles.ListAdd}
                        name="account-edit"
                        size={50}
                        color={Colors.black}
                      />
                      <Text style={styles.textOptions}>LISTA DE NOMES</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.options}>
                    <TouchableOpacity
                      style={styles.optionsList}
                      onPress={() => {
                        insertInvisible(false);
                        setinsertVisibleQRCODE(true);
                      }}>
                      <Icon
                        style={styles.ListAdd}
                        name="qrcode"
                        size={50}
                        color={Colors.black}
                      />
                      <Text style={styles.textOptions}>COM QR-CODE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      <InsertQRCODE
        Loading={setLoading}
        ListEntryPress={ListEntryPress}
        promptVisible={insertVisibleQRCODE}
        promptInvisible={setinsertVisibleQRCODE}
        change={change}
      />
      <InsertText
        ValueListText={setValueListText}
        Loading={setLoading}
        ListEntryPress={ListEntryPress}
        promptVisible={insertVisibleText}
        promptInvisible={setInsertVisibleText}
        change={change}
      />
      {loading && (
        <Modal transparent={true} visible={true}>
          <View style={styles.ActivityLoading}>
            <ActivityIndicator animating={true} size="large" color="#fff" />
            <Text style={styles.textLoading}>AGUARDE CARREGANDO</Text>
          </View>
        </Modal>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  containerInsert: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  prompt: {
    justifyContent: 'center',
    padding: 10,
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
  },
  promptlist: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  options: {
    justifyContent: 'center',
    width: 110,
    height: 100,
    marginHorizontal: 5,
  },
  optionsList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grey,
  },
  textOptions: {
    marginTop: 10,
    fontSize: 10,
  },
  textPrompt: {
    alignSelf: 'center',
    marginBottom: 5,
    fontSize: 12,
  },
  TextEnd: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  Textcancel: {
    marginRight: 40,
    marginLeft: 10,
  },
  Textok: {
    width: 50,
    textAlign: 'center',
  },
  ActivityLoading: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
  },
  textLoading: {
    textAlign: 'center',
    color: '#fff',
  },
});
export default InsertList;
