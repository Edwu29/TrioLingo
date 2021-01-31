import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Text, View } from '../components/Themed';
import { Card, Overlay, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import AsyncStorage from "@react-native-community/async-storage";
import Quiz from "../components/quiz";

export default class TabOneScreen extends React.Component {
  constructor(props: any) {
    super(props);
  }
  state = {
    quiz: [],
    visible: false,
    count: 0
  }

  componentDidMount() {
    AsyncStorage.getItem("key").then(key => {
      fetch(`https://chenaaron.com/triolingo/firebase/get_total?key=${key}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ count: data["count"] })
      })
      .catch(error => console.log(error))
    })
  }

  async fetchData() {
    let key = await AsyncStorage.getItem("key");
    fetch(`https://chenaaron.com/triolingo/firebase/get_quiz?key=${key}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ quiz: data })
      })
      .catch(error => console.log(error))
  }

  toggleOverlay = () => {
    this.setState({ visible: !this.state.visible }, () => {
      if (this.state.visible) {
        this.fetchData();
      }
    });
  };

  exitQuiz = () => {
    console.log("EXIT QUIZ");
    this.setState({ quiz: [], visible: false });
  }

  render() {
    let quiz = undefined;
    if (this.state.quiz.length > 0) {
      quiz = <Quiz questions={this.state.quiz} exitQuiz={this.exitQuiz}></Quiz>;
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ backgroundColor: "pink", justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.title}>
            {this.state.count}
          </Text>
          <Text style={styles.subtitle}>
            Words Discovered
            </Text>
        </View>

        <Card containerStyle={styles.cardStyle}>
          <Card.Title style={styles.cardTitle}>
            <Ionicons name="calendar" size={30} color="#0D7DBC" />
          Current Quiz
          </Card.Title>
          <Card.Divider />
          <SafeAreaView style={{ backgroundColor: "white" }}>
            <Text style={styles.cardText}>Hello there! There are no quizzes determined yet, please choose a language in settings :).</Text>
            <Button title="Take Quiz" onPress={this.toggleOverlay} />

            <SafeAreaView>
              <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay} overlayStyle={{ alignSelf: 'center', width: '100%', height: '100%', flex: 1 }}>
                <>
                  {quiz}
                </>
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
