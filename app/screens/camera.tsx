import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default class Cam extends React.Component {

  camera: Camera | null = null;
  state = {
    status: "",
    type: Camera.Constants.Type.front
  }

  constructor(props: string)
  {
    super(props);
    this.requestPermission();
  }

  async requestPermission() { 
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({status:'granted'});
  }

  toggleCameraType = () => {
    let newCameraType = this.state.type === Camera.Constants.Type.back
    ? Camera.Constants.Type.front
    : Camera.Constants.Type.back;
    this.setState({type: newCameraType});
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
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
        <Camera style={styles.camera} type={this.state.type}  ref={ref =>{this.camera = ref;}} >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.toggleCameraType}>
              <Text>Flip</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
            }
}

/* @hide const styles = StyleSheet.create({ ... }); */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
/* @end */