import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { Picker } from '@react-native-picker/picker';

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

export default class Settings extends React.Component {
  state = {
    language: "vi",
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: 'pink' }}>
          <Text style={styles.text}>Language:
            <Picker
              selectedValue={this.state.language}
              onValueChange={(itemValue) =>
                this.setState({ language: itemValue })
              }
              style={styles.picker}
            >
              {
                Object.keys(languages).map(language => {
                  return <Picker.Item key={language} label={language} value={language} />
                })
              }
            </Picker>
          </Text>
        </View>
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
    fontSize: 25,
    height: 150,
    width: 150,
    alignSelf: 'flex-end',
    marginLeft: 5,
  },
  text: {
    fontSize: 25,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: 5,
  }
});