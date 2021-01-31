import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { MaterialCommunityIcons, Entypo  } from '@expo/vector-icons';
import { Card, Button } from 'react-native-elements';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>


      <Card containerStyle={styles.cardStyle}>
        <View>
          <Card.Title style={styles.cardTitle}><MaterialCommunityIcons name='calendar' color='#0D7DBC' size={30} />Current Quiz</Card.Title>
          <Card.Divider style={styles.cardDivider}>
            <Text>Hello there! There are no quizzes determined yet, please choose a language :).</Text>
          </Card.Divider>
        </View>
      </Card>

      <Card containerStyle={styles.cardStyle}>
        <Card.Title style={styles.cardTitle}><Entypo name="back-in-time" size={24} color="#0D7DBC" /> History</Card.Title>
        <Card.Divider style={styles.cardDivider}>
          <Text>Number of Quizzes Taken: 0</Text>
          <Text>Accuracy: 0%</Text>
        </Card.Divider>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
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
    fontSize: 12,
  },
  cardTitle: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    flex: 1,
  },
});
