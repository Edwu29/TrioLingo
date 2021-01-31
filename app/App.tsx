import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import GLOBAL from './screens/global';

import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
// import { EvaIconsPack } from 'eva-icons'; cannot find for some reason wtf
import AsyncStorage from "@react-native-community/async-storage";

async function ensureIdExists() {
  let key = await AsyncStorage.getItem("key");
  // check if key exists in our local storage
  if (!key) {
    // if it doesnt exist, we fetch from server
    fetch("https://chenaaron.com/triolingo/firebase/initialize_database")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        AsyncStorage.setItem("key", data["key"]); // store key to local storage
      })
      .catch((error) => console.log(error));
  } else {
    //if key exists.
    console.log("this is existing key" +key);
  }

  // check for language key
  let language = await AsyncStorage.getItem("language");
  if (language) {
    GLOBAL.language = language;
  }
}

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();  

  if (!isLoadingComplete) {
    return null;
  } else {
    ensureIdExists();
    return (
      <>
        {/* <ApplicationProvider {...eva} theme={eva.light}> */}
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
        {/* </ApplicationProvider> */}
      </>
    );
  }
}
