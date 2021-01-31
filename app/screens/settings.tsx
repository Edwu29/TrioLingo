import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { Picker } from '@react-native-picker/picker';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import GLOBAL from './global';

const languages = {
  Arabic: "ar",
  Chinese_S: "zh",
  Chinese_T: "zh-TW",
  French: "fr",
  German: "de",
  Hindi: "hi",
  Indonesian: "id",
  Italian: "it",
  Japanese: "ja",
  Korean: "ko",
  Myanmar: "my",
  Russian: "ru",
  Spanish: "es",
  Tagalog: "tl",
  Thai: "th",
  Turkish: "tr",
  Vietnamese: "vi",
};

// Object.keys(languages).map(language => {
//   return {label:{language}, value:{language}} 
// })

export default class Settings extends React.Component {
  state = {
    language: "vi",
  }

  render() {
    return (
      <View style={styles.container}>
        <Card containerStyle={styles.cardStyle}>
          <Card.Title style={styles.cardTitle}><Ionicons name="language" size={24} color="black" />Languages</Card.Title>
          <Card.Divider />
          {/* <Text style={styles.text}>Languages:</Text> */}
          <View style={{ backgroundColor: 'white' }}>
            <TouchableOpacity>
              {/* {label: 'USA', value: 'usa'} */}
              <DropDownPicker
                items={[
                  { label: 'Arabic', value: 'ar' },
                  { label: 'Chinese_S', value: 'zh' },
                  { label: 'Chinese_T', value: 'zh-TW' },
                  { label: 'French', value: 'fr' },
                  { label: 'German', value: 'de' },
                  { label: 'Hindi', value: 'hi' },
                  { label: 'Indonesian', value: 'id' },
                  { label: 'Italian', value: 'it' },
                  { label: 'Japanese', value: 'ja' },
                  { label: 'Korean', value: 'ko' },
                  { label: 'Myanmar', value: 'my' },
                  { label: 'Russian', value: 'ru' },
                  { label: 'Spanish', value: 'es' },
                  { label: 'Tagalog', value: 'tl' },
                  { label: 'Thai', value: 'th' },
                  { label: 'Turkish', value: 'tr' },
                  { label: 'Vietnamese', value: 'vi' },
                ]}
                containerStyle={{ height: 40 }}
                onChangeItem={(itemValue) => {
                  this.setState({ language: itemValue })
                  GLOBAL.language = itemValue["label"];
                }
                }
                labelStyle={{
                  color: "#000",
                }}
                placeholder="Select a language."
              >
              </DropDownPicker>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  picker: {
    fontSize: 20,
    height: 50,
    width: 150,
    alignSelf: 'center',
    margin: 0,
  },
  text: {
    fontSize: 25,
    alignSelf: 'center',
    marginLeft: 5,
  },
  cardStyle: {
    borderRadius: 10,
    borderColor: '#D996B7',
    borderStyle: 'solid',
    borderWidth: 3,
  },
  cardTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});