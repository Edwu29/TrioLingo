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
        <View>
          <Text style={styles.text}>Language: </Text>
          <Picker
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ language: itemValue })
            }
            style={styles.picker}
          >
            {
              Object.keys(languages).map(language => {
                return <Picker.Item label={language} value={language} />
              })
            }
          </Picker>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  picker: {
    width: '50%',
    alignSelf: 'flex-end',
  },
  text: {
    flex:1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'orange',
    width: 100,
  }
});