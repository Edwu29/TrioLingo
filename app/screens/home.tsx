import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import {useEffect, useState} from 'react';
import { withNavigationFocus } from 'react-navigation';
import AsyncStorage from "@react-native-community/async-storage";
export default class TabOneScreen extends React.Component {
  constructor(props: any)
  {
    super(props);
  }
  state = {
    quiz: []
  }

  async fetchData()
  {
    let key = await AsyncStorage.getItem("key");
    fetch(`https://chenaaron.com/triolingo/firebase/get_quiz?key=${key}`)
        .then(response => response.json())
        .then(data => {
          this.setState({quiz:data})
          console.log("quiz!!! " + JSON.stringify(this.state.quiz));
        })
        .catch(error => console.log(error))
  }
  
  componentDidMount()
  {
    this.fetchData(); 
  }
  //can use quiz here i think?

  render(){
  return (
    <View style={styles.container}>
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
