import {useState, useEffect} from 'react';
import {Alert} from 'react-native';

import {saveEntry} from '../../../services/Entries';
import {getEntries} from '../../../services/Entries';

const QrCheck = () => {
  const [entries, setEntries] = useState([]);
  const [change, setChange] = useState(0);
  const [clear, setClear] = useState(false);
  const [ActivityOn, setActivityOn] = useState(false);

  const onSave = (item, checkin) => {
    const data = {
      id: item.id,
      name: item.name,
      isCheckin: checkin,
    };
    saveEntry(data);
  };
  const onTest = (QrData) => {
    setClear(false);
    entries.forEach((bank) => {
      if (bank.name.toUpperCase() === QrData.name.toUpperCase()) {
        setActivityOn(true);
        Alert.alert(
          'Atenção',
          `Tem certeza que deseja dar "Check-In" em ${bank.name}?`,
          [
            {
              text: 'Cancel',
              onPress: () => {
                setActivityOn(false);
              },
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                onSave(bank, true);
                setChange(change + 1);
                setActivityOn(false);
                setClear(true);
              },
            },
          ],
          {cancelable: false},
        );
      }
    });
  };

  useEffect(() => {
    async function loadEntries() {
      const data = await getEntries();
      setEntries(data.filtered('isCheckin == false'));
    }

    loadEntries();
  }, []);

  return [change, onTest, clear, ActivityOn];
};

export default QrCheck;
