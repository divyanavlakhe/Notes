import React, { useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, UIManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Route from './src/navigation';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Route />
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
