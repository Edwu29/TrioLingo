import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';
import Modal from 'react-native-modal';
import AsyncStorage from "@react-native-community/async-storage";

export default class Cam extends React.Component {

  camera: Camera | null = null;
  state = {
    status: "",
    type: Camera.Constants.Type.front,
    show: true,
    fullScreen: false,
    translation: [],
    language: "Vietnamese"
  }

  constructor(props: string) {
    super(props);
    this.requestPermission();
  }

  async requestPermission() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ status: 'granted' });
  }

  toggleCameraType = () => {
    let newCameraType = this.state.type === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back;
    this.setState({ type: newCameraType });
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({ base64: true, quality: 0 });
      let resizedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri, [{ resize: { width: photo.width * .75, height: photo.height * .75 } }], { compress: .5, base64: true }
      );
      console.log(resizedPhoto.uri);
      console.log(resizedPhoto.width, photo.width);
      console.log(resizedPhoto.height, photo.height);

      let key = await AsyncStorage.getItem("key");

      let fetchOptions = {
        method: "POST",
        body: JSON.stringify({
          key: key,
          image: resizedPhoto.base64,
          language: this.state.language
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      };
      fetch("https://chenaaron.com/triolingo/users", fetchOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({ show: true, translation: data });
        })
        .catch(error => console.log(error))
    }
  };

  render() {
    if (this.state.status === "") {
      return <View />;
    }
    if (this.state.status !== "granted") {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={this.state.type} ref={ref => { this.camera = ref; }} >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.resize}
              onPress={this.toggleCameraType}>
              <MaterialCommunityIcons name="camera-switch" size={30} color="pink" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.capture}
              onPress={this.snap}>
              <Fontisto name="camera" size={54} color="pink" />
            </TouchableOpacity>
          </View>

          <Modal
            isVisible={this.state.show}
            coverScreen={false}
          >
            <View style={{ backgroundColor: "#FFFEF2" }}>
              <View
                style={{
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  overflow: 'hidden',
                  alignItems: 'center',
                  padding: "3%"
                }} >
                {
                  this.state.translation.length > 0 && <Text style={{ fontSize: 24 }}>
                    We found a {this.state.translation[0]["original"]}.
                    It translates to {this.state.translation[0]["translated"]} in {this.state.language}.
                  </Text>
                }
                {
                  this.state.translation.length == 0 && <Text style={{ fontSize: 24 }}>
                    We did not find anything! Try again.
                  </Text>
                }
              </View>

              <View style={{
                flexDirection: "row",
                justifyContent: "center", alignItems: "center"
              }}>
                <TouchableOpacity
                  style={styles.okButton}
                  onPress={() => {
                    console.log("OK Presed")
                    this.setState({ show: false })
                  }}
                >
                  <Text>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </Camera>
      </View >
    )
  }
}
/* // style = {{ backgroundColor: "ffffff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }} */

/* @hide const styles = StyleSheet.create({... }); */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    height: "50%"
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    width: '100%'
  },
  resize: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: 63
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  okButton: {
    marginVertical: '2%',
    paddingVertical: '3%',
    paddingHorizontal: '10%',
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  yesButton: {
    marginVertical: '5%',
    marginLeft: '25%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  noButton: {
    marginVertical: '5%',
    marginLeft: '25%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
});
/* @end */