import {React,useEffect,useState} from 'react'
import MainContainer from './navigation/MainContainer';
import SearchResult from './navigation/screens/SearchResult';
import SelectedResult from './navigation/screens/SelectedResult';


import SplashScreen from 'react-native-splash-screen'
import PassengersInformation from './navigation/screens/PassengersInformation';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Download from './navigation/screens/Download';

function App() {
  
  useEffect(()=>{
    SplashScreen.hide();
  },[])
  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
    <MainContainer/>
    {/* <Download/> */}
    </ApplicationProvider>
      </>
      
  );
}

export default App;