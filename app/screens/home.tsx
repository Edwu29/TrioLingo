import * as React from 'react';
import { StyleSheet, SectionList } from 'react-native';

import { Text, View } from '../components/Themed';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const DATA = [
  {
    title: "Current Quizzes",
    data: ["a quiz you haven't taken yet", "a photo you took recently"]
  },
  {
    title: "History",
    data: ["old quiz u got right", "old quiz you got wrong"]
  }
]

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function TabOneScreen() {
  return (

    <View>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
});
