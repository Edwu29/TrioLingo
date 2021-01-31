import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
// import { EvaIconsPack } from 'eva-icons'; cannot find for some reason wtf

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
