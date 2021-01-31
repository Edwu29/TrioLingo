import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Text, View } from '../components/Themed';
import { Card, Overlay, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Quiz from '../components/quiz';


export default function TabOneScreen() {

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.cardStyle}>
        <View style={{ backgroundColor: "pink", justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.title}>
            31
        </Text>
          <Text style={styles.subtitle}>
            Words Discovered
        </Text>
        </View>

        <Card.Title style={styles.cardTitle}>
          <Ionicons name="calendar" size={30} color="#0D7DBC" />
          Current Quiz
          </Card.Title>
        <Card.Divider />
        <SafeAreaView style={{ backgroundColor: "white" }}>
          <Text style={styles.cardText}>Hello there! There are no quizzes determined yet, please choose a language in settings :).</Text>
          <Button title="Take Quiz" onPress={toggleOverlay} />

          <SafeAreaView>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ alignSelf: 'center', width: '100%', height: '100%', flex: 1 }}>
              <Quiz></Quiz>
            </Overlay>
          </SafeAreaView>

        </SafeAreaView>
      </Card>

      <Card containerStyle={styles.cardStyle}>
        <Card.Title style={styles.cardTitle}> <Ionicons name="time" size={30} color="#0D7DBC" />History</Card.Title>
        <Card.Divider />
        <View style={{ backgroundColor: "white" }}>
          <Text style={styles.cardText}>Number of Quizzes Taken: 0</Text>
          <Text style={styles.cardText}>Accuracy: 0%</Text>
        </View>
      </Card>
    </SafeAreaView>

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
