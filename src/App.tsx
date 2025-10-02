import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './theme/ThemeContext';
import { AppProvider } from './utils/AppContext';
import { AppNavigator } from './navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AppProvider>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          <AppNavigator />
        </AppProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
