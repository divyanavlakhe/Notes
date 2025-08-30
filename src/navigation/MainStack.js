import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screen/home';
import AddEditTask from '../screen/addEditTask';
import BottomTabBar from '../component/bottomTabBar';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabBar">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="AddEditTask" component={AddEditTask} options={{ headerShown: false }} />
      <Stack.Screen name="BottomTabBar" component={BottomTabBar} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainStack;
