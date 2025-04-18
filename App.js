import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';


import { store } from './store/store';  
import { Provider } from 'react-redux';
import RootNavigation from './navigation/RootNavigation'; 

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor="white" />
        <RootNavigation />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
