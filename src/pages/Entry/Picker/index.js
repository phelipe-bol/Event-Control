import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  FlatList,
} from 'react-native';

import {getAllCategories} from '../../../services/Categories';
import Colors from '../../../styles/colors';

const NewEntryCategoryPicker = ({entryCategory, onChangeCategory}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategoryes] = useState([]);

  useEffect(() => {
    async function loadCategory() {
      const data = await getAllCategories();
      setCategoryes(data);
      onChangeCategory(category[0]);
    }

    loadCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCategoryPress = (item) => {
    onChangeCategory(item);
    onClosePress();
  };

  const onClosePress = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.pickerButton,
          {
            backgroundColor:
              entryCategory.name === 'Normal'
                ? Colors.list
                : entryCategory.color,
          },
        ]}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text
          style={[
            styles.pickerButtonText,
            {
              color:
                entryCategory.name === 'Padrinhos' ||
                entryCategory.name === 'Família'
                  ? Colors.grey
                  : Colors.placeholder,
            },
          ]}>
          {entryCategory.name}
        </Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modal}>
          <FlatList
            data={category}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.modalItem,
                  {
                    backgroundColor:
                      item.name === 'Normal' ? Colors.list : item.color,
                  },
                ]}
                onPress={() => onCategoryPress(item)}>
                <Text
                  style={[
                    styles.modalItemText,
                    {
                      color:
                        item.name === 'Padrinhos' || item.name === 'Família'
                          ? Colors.grey
                          : Colors.placeholder,
                    },
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.closeButton} onPress={onClosePress}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  pickerButton: {
    height: 50,
    width: 300,
    borderRadius: 15,
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 20,
    textAlign: 'center',
    justifyContent: 'center',
  },
  pickerButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  modalItem: {
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 20,
  },
  modalItemText: {
    fontSize: 22,
    color: Colors.white,
    textAlign: 'center',
  },
  closeButton: {
    alignSelf: 'center',
    backgroundColor: Colors.listItem,
    borderColor: Colors.list,
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  closeButtonText: {
    fontSize: 14,
    color: Colors.placeholder,
    textAlign: 'center',
  },
});

export default NewEntryCategoryPicker;
