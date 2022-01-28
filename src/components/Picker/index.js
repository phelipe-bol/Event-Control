import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  FlatList,
} from 'react-native';

import {getAllCategories} from '../../services/Categories';
import {saveEntry} from '../../services/Entries';

import Colors from '../../styles/colors';

const CategoryPicker = ({modalVisible, entry, modalInvisible, change}) => {
  const [category, setCategoryes] = useState([]);

  useEffect(() => {
    async function loadCategory() {
      const data = await getAllCategories();
      setCategoryes(data);
    }

    loadCategory();
  }, []);

  const onCategoryPress = (item) => {
    const data = {
      category: item,
    };

    saveEntry(data, entry);
    change(1);
    onClosePress();
  };

  const onClosePress = () => {
    modalInvisible(false);
    change(1);
  };

  return (
    <View>
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

export default CategoryPicker;
