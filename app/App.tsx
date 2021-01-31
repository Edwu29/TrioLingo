import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
// import { EvaIconsPack } from 'eva-icons'; cannot find for some reason wtf
import AsyncStorage from '@react-native-community/async-storage';

async function ensureIdExists() {
  let id = await AsyncStorage.getItem('id');
  // check if id exists in our local storage
  if (!id) {
    // if it doesnt exist, we fetch from server

    // store id to local storage
  }
}

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
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
