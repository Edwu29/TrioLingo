import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "pink", justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.title}>
          31
        </Text>
        <Text style={styles.subtitle}>
          Words Discovered
        </Text>
      </View>

      <Card containerStyle={styles.cardStyle}>
        <Card.Title style={styles.cardTitle}><Ionicons name="calendar" size={30} color="#0D7DBC" />Current Quiz</Card.Title>
        <Card.Divider />
        <View style={{ backgroundColor: "white" }}>
          <Text style={styles.cardText}>Hello there! There are no quizzes determined yet, please choose a language in settings :).</Text>
        </View>
      </Card>

      <Card containerStyle={styles.cardStyle}>
        <Card.Title style={styles.cardTitle}> <Ionicons name="time" size={30} color="#0D7DBC" />History</Card.Title>
        <Card.Divider />
        <View style={{ backgroundColor: "white" }}>
          <Text style={styles.cardText}>Number of Quizzes Taken: 0</Text>
          <Text style={styles.cardText}>Accuracy: 0%</Text>
        </View>
      </Card>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 100
  },
  subtitle: {
    fontSize: 40
  },
  cardStyle: {
    borderRadius: 10,
    borderColor: '#D996B7',
    borderStyle: 'solid',
    borderWidth: 3,
  },
  cardDivider: {
    backgroundColor: 'white',
    flex: 1,
  },
  cardText: {
    color: "black",
  },
  cardTitle: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  }
});
