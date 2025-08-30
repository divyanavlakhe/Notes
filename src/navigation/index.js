import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainStack from './MainStack';
import NavigationService from './NavigationService';

const Routes = () => {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      <MainStack />
    </NavigationContainer>
  );
};

export default Routes;
