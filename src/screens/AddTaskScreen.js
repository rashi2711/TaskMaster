import React, {useState} from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert,
} from 'react-native';
import {loadTasks, saveTasks} from '../utils/storage';

const PRIORITIES = ['Low', 'Medium', 'High'];

const AddTaskScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Title is required';
    if (title.length > 100) e.title = 'Title must be under 100 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    try {
      const existing = (await loadTasks()) || [];
      const newTask = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        priority,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      await saveTasks([newTask, ...existing]);
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'Could not save task. Try again.');
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Task Title *</Text>
      <TextInput
        style={[styles.input, errors.title && styles.inputError]}
        value={title}
        onChangeText={setTitle}
        placeholder="What needs to be done?"
        placeholderTextColor="#bbb"
        maxLength={100}
      />
      {errors.title && <Text style={styles.error}>{errors.title}</Text>}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Add more details (optional)"
        placeholderTextColor="#bbb"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityRow}>
        {PRIORITIES.map(p => (
          <TouchableOpacity
            key={p}
            style={[styles.priorityBtn, priority === p && styles.priorityBtnActive]}
            onPress={() => setPriority(p)}
          >
            <Text style={[styles.priorityBtnText, priority === p && styles.priorityBtnTextActive]}>
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Task</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelBtnText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5FA', padding: 20},
  label: {fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6, marginTop: 16},
  input: {
    backgroundColor: '#fff', borderRadius: 10, padding: 14,
    fontSize: 15, color: '#1A1A2E', borderWidth: 1.5, borderColor: '#E8E8F0',
  },
  textArea: {height: 110},
  inputError: {borderColor: '#FF4757'},
  error: {color: '#FF4757', fontSize: 12, marginTop: 4},
  priorityRow: {flexDirection: 'row', gap: 10},
  priorityBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 10,
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#E8E8F0',
    alignItems: 'center',
  },
  priorityBtnActive: {backgroundColor: '#6C63FF', borderColor: '#6C63FF'},
  priorityBtnText: {fontWeight: '600', color: '#6C63FF', fontSize: 14},
  priorityBtnTextActive: {color: '#fff'},
  saveBtn: {
    backgroundColor: '#6C63FF', borderRadius: 12, padding: 16,
    alignItems: 'center', marginTop: 32,
  },
  saveBtnText: {color: '#fff', fontSize: 16, fontWeight: '700'},
  cancelBtn: {padding: 16, alignItems: 'center', marginTop: 8},
  cancelBtnText: {color: '#999', fontSize: 15},
});

export default AddTaskScreen;