import React, {useState} from 'react';
import {
  Alert,
  Modal,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import {getRealm} from './Realm';

const DeleteAll = ({promptVisible, promptInvisible, change}) => {
  const [value, setValue] = useState('');

  const deleteAllClients = async () => {
    const realm = await getRealm();
    try {
      realm.write(() => {
        let allEntry = realm.objects('Entry');
        realm.delete(allEntry);
        Alert.alert('Banco de convidados apagado com sucesso!');
        change(1);
      });
    } catch (error) {
      console.error('deleteAll :: error on delete todo o object: ', error);
      Alert.alert('Erro ao deletar todos os convidados.');
    }
  };

  return (
    <Modal transparent={true} visible={promptVisible}>
      <View style={styles.containerDelete}>
        <View style={styles.prompt}>
          <View>
            <Text style={styles.titleDelete}>ATENÇÃO</Text>
            <Text style={styles.textDelete}>
              VOCÊ ESTÁ PRESTES A APAGAR TODO O BANCO DE CADASTRO. SE VOCÊ TEM
              CERTEZA QUE DESEJA PROSSEGUIR DIGITE 'SIM'.
            </Text>
            <TextInput
              style={styles.inputDelete}
              onChangeText={(text) => setValue(text)}
              placeholder="Digite 'SIM' para apagar tudo"
              value={value.toUpperCase()}
            />
          </View>

          <View style={styles.TextEnd}>
            <TouchableWithoutFeedback
              style={styles.Textok}
              onPress={() => {
                promptInvisible(false);
                setValue('');
              }}>
              <Text style={styles.Textcancel}>Cancelar</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => {
                if (value.toUpperCase().trim() === 'SIM') {
                  setValue('');
                  promptInvisible(false);
                  deleteAllClients();
                  change(1);
                } else {
                  Alert.alert(
                    'Atenção',
                    'Você escreveu a chave de segurança errada, para apagar tudo escreva "SIM". Por favor tente novamente!',
                  );
                  setValue('');
                }
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
  containerDelete: {
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
  inputDelete: {
    width: 200,
    height: 40,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    fontSize: 11,
    marginLeft: 16,
    textAlign: 'center',
  },
  titleDelete: {
    textAlign: 'center',
    color: 'red',
  },
  textDelete: {
    fontSize: 10,
    marginVertical: 2,
    textAlign: 'center',
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
export default DeleteAll;
