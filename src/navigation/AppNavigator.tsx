import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../theme/ThemeContext';
import { HomeScreen } from '../screens/HomeScreen';
import { AddDeviceScreen } from '../screens/AddDeviceScreen';
import { DeviceDetailsScreen } from '../screens/DeviceDetailsScreen';
import { EditDeviceScreen } from '../screens/EditDeviceScreen';
import { NavigationProps } from '../types';

const Stack = createStackNavigator<NavigationProps>();

export const AppNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: theme.colors.background },
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen 
          name="AddDevice" 
          component={AddDeviceScreen}
          options={{
            presentation: 'modal',
            gestureEnabled: true,
          }}
        />
        <Stack.Screen 
          name="DeviceDetails" 
          component={DeviceDetailsScreen}
          options={{
            gestureEnabled: true,
          }}
        />
        <Stack.Screen 
          name="EditDevice" 
          component={EditDeviceScreen}
          options={{
            presentation: 'modal',
            gestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
