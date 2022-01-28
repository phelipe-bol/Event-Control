const EntrySchema = {
  name: 'Entry',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    contact: 'string?',
    isCheckin: {type: 'bool', default: false},
    isInit: 'bool',
    category: 'Category?',
  },
};

export default EntrySchema;
