import React from 'react';
import { StatusBar, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all screens
import HomeScreen from './src/screens/HomeScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#6C63FF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
          headerBackTitleVisible: false,
        }}
      >
        {/* Home Screen with Profile Button in Header */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: '📋 TaskMaster',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={{ marginRight: 16 }}
              >
                <Text style={{ fontSize: 26 }}>👤</Text>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={{ title: 'New Task' }}
        />

        <Stack.Screen
          name="TaskDetail"
          component={TaskDetailScreen}
          options={{ title: 'Task Details' }}
        />

        {/* Profile Screen */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ 
            title: '👤 My Profile',
            headerStyle: { backgroundColor: '#6C63FF' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;