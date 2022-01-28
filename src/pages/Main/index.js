import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Menu, Provider} from 'react-native-paper';

import Colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SearchPanel from '../../components/searchPanel';
import GuestList from '../../components/lists/guestList';
import Foot from '../../components/foot';

import {getEntries} from '../../services/Entries';
import DeleteAll from '../../services/DeleteAll';
import InsertList from '../../services/insertList';

const Main = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [change, setChange] = useState(0);
  const [visible, setVisible] = useState(false);
  const [entries, setEntries] = useState([]);
  const [promptVisible, setPromptVisible] = useState(false);
  const [insertVisible, setInsertVisible] = useState(false);
  const [ActivityOn, setActivityOn] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    async function loadEntries() {
      const data = await getEntries();
      setEntries(data);
    }

    loadEntries();
  }, []);

  return (
    <Provider>
      <View style={styles.container}>
        <SearchPanel
          searched={(text) => {
            setSearch(text);
          }}
          Onchange={setChange}
          ActivityOn={setActivityOn}
        />
        <GuestList
          onChange={(num) => {
            setChange(num);
          }}
          navigation={navigation}
          recept={search}
          ActivityOn={ActivityOn}
        />
        <View style={styles.listMenu}>
          <View style={styles.opcoes}>
            <View style={styles.opcoesicon}>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <TouchableOpacity onPress={() => openMenu()}>
                    <Icon
                      style={styles.ListAdd}
                      name="account-cog"
                      size={28}
                      color={Colors.black}
                    />
                  </TouchableOpacity>
                }>
                <Menu.Item
                  onPress={() => {
                    setInsertVisible(true);
                    closeMenu();
                  }}
                  title="Inserir lista de convidados"
                  icon="account-multiple-plus"
                  // eslint-disable-next-line react-native/no-inline-styles
                  titleStyle={{marginLeft: -27}}
                />
                <Menu.Item
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{opacity: entries.length === 0 ? 0.1 : 1}}
                  onPress={() => {
                    if (entries.length > 0) {
                      setPromptVisible(true);
                      closeMenu();
                    }
                  }}
                  title="Apagar todos os convidados"
                  icon="delete-forever-outline"
                  // eslint-disable-next-line react-native/no-inline-styles
                  titleStyle={{marginLeft: -30}}
                />
              </Menu>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('CheckIn')}>
            <Icon
              style={styles.ListAdd}
              name="account-check"
              size={28}
              color={Colors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Entry')}>
            <Icon
              style={styles.ListCheck}
              name="account-plus"
              size={28}
              color={Colors.black}
            />
          </TouchableOpacity>
        </View>
        <Foot change={change} />
        <DeleteAll
          promptVisible={promptVisible}
          promptInvisible={(invisible) => {
            setPromptVisible(invisible);
          }}
          change={(onChange) => {
            setChange(change + onChange);
          }}
        />
        <InsertList
          insertVisible={insertVisible}
          insertInvisible={(invisible) => {
            setInsertVisible(invisible);
          }}
          change={(onChange) => {
            setChange(change + onChange);
          }}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listMenu: {
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  ListAdd: {
    marginRight: 5,
  },
  opcoes: {
    flex: 1,
  },
  opcoesicon: {
    position: 'absolute',
    left: 0,
  },
});

export default Main;
