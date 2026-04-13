import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = '@taskmaster_tasks';

export const saveTasks = async tasks => {
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const loadTasks = async () => {
  const data = await AsyncStorage.getItem(TASKS_KEY);
  return data ? JSON.parse(data) : null;
};