import {Alert} from 'react-native';

import {getRealm} from './Realm';

import {GetId} from './GetId';

export const getEntries = async () => {
  const realm = await getRealm();

  const entries = realm.objects('Entry');
  return entries;
};

export const saveEntry = async (value, entry = {}) => {
  const realm = await getRealm();
  let data = {};

  try {
    realm.write(() => {
      data = {
        id: value.id || entry.id || GetId(),
        name: value.name || entry.name,
        contact: value.contact || entry.contact,
        isCheckin: value.isCheckin || entry.isCheckin || false,
        isInit: false,
        category: value.category || entry.category,
      };

      realm.create('Entry', data, true);
    });

    console.log('saveEntry :: data:', JSON.stringify(data));
  } catch (error) {
    console.error(
      'saveEntry :: error on save object: ',
      GetId(),
      JSON.stringify(data),
      error,
    );
    Alert.alert('Erro ao salvar os dados de lançamento.');
  }

  return data;
};

export const deleteEntry = async (Entry) => {
  const realm = await getRealm();

  try {
    realm.write(() => {
      realm.delete(Entry);
    });
  } catch (error) {
    console.error(
      'deleteEntry :: error on delete object: ',
      JSON.stringify(Entry),
    );
    Alert.alert('Erro ao deletar os dados de lançamento.');
  }
};
