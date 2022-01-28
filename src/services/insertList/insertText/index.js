import React, {useState, useEffect} from 'react';
import {
  Modal,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

const InsertText = ({
  promptVisible,
  promptInvisible,
  ValueListText,
  ListEntryPress,
  Loading,
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue('');
    ValueListText('');
  }, [promptVisible, ValueListText]);

  return (
    <Modal transparent={true} visible={promptVisible}>
      <View style={styles.containerInsertText}>
        <View style={styles.prompt}>
          <View>
            <Text style={styles.titleInsertText}>INCLUSÃO EM ESCALA</Text>
            <Text style={styles.textInsertText}>
              Acrescente um nome abaixo do outro para incluir na listas de
              convidados
            </Text>
            <TextInput
              style={styles.inputListText}
              multiline={true}
              onChangeText={(text) => {
                setValue(text);
                ValueListText(text);
              }}
              placeholder="DIGITE UM NOME ABAIXO DO OUTRO"
              value={value.toUpperCase()}
            />
          </View>

          <View style={styles.TextEnd}>
            <TouchableWithoutFeedback
              style={styles.Textok}
              onPress={() => {
                setValue('');
                ValueListText('');
                promptInvisible(false);
              }}>
              <Text style={styles.Textcancel}>Fechar</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => {
                Loading(true);
                ListEntryPress();
              }}>
              <Text style={styles.Textok}>OK</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  containerInsertText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  prompt: {
    padding: 10,
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
  inputListText: {
    width: 200,
    height: 350,
    borderColor: '#000',
    borderWidth: 1,
    marginLeft: 16,
    textAlign: 'center',
  },
  titleInsertText: {
    textAlign: 'center',
    color: 'red',
  },
  textInsertText: {
    fontSize: 12,
    marginVertical: 2,
    textAlign: 'center',
    marginBottom: 10,
    padding: 3,
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
});
export default InsertText;
