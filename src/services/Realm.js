import Realm from 'realm';

import CategorySchema from '../schemas/CategorySchema';
import EntrySchema from '../schemas/EntrySchema';

import {getDefaultCategories} from './Categories';

export const getRealm = async () => {
  const realm = await Realm.open({
    schema: [CategorySchema, EntrySchema],
    schemaVersion: 2,
  });

  initDB(realm);

  return realm;
};

export const initDB = (realm) => {
  const categoriesLength = realm.objects('Category').length;

  if (categoriesLength === 0) {
    const categories = getDefaultCategories();

    try {
      realm.write(() => {
        // eslint-disable-next-line prettier/prettier
        categories.forEach(category => {

          realm.create('Category', category, true);
        });
      });
    } catch (error) {
      console.log('initDB :: error ao reiniciar as categorias', error);
    }
  }
};
