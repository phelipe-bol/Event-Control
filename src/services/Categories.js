import {GetId} from './GetId';
import {getRealm} from './Realm';

export const getDefaultCategories = () => {
  return [
    {
      id: GetId(),
      name: 'Normal',
      color: '#CCCCCC',
      isInit: true,
      isDefault: true,
      order: 0,
    },
    {
      id: GetId(),
      name: 'Padrinhos',
      color: '#0000FF',
      isCerimonial: true,
      order: 1,
    },
    {
      id: GetId(),
      name: 'Daminha',
      color: '#FFBAFF',
      isCerimonial: true,
      order: 2,
    },
    {
      id: GetId(),
      name: 'Pagem',
      color: '#00FFFF',
      isCerimonial: true,
      order: 3,
    },
    {
      id: GetId(),
      name: 'Família',
      color: '#FF0000',
      isCerimonial: true,
      order: 4,
    },
    {
      id: GetId(),
      name: 'Florista',
      color: '#70FF38',
      isCerimonial: true,
      order: 5,
    },
  ];
};

export const getAllCategories = async () => {
  const realm = await getRealm();
  return realm.objects('Category').sorted('order');
};

export const getCerimonialCategories = async () => {
  const realm = await getRealm();
  return realm
    .objects('Category')
    .filtered('isCerimonial = true')
    .sorted('order');
};

export const getInitCategories = async () => {
  const realm = await getRealm();
  return realm.objects('Category').filtered('isInit = true').sorted('order');
};
