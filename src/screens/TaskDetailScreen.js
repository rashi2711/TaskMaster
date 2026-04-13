import React, {useState, useEffect} from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert,
} from 'react-native';
import {loadTasks, saveTasks} from '../utils/storage';

const TaskDetailScreen = ({route, navigation}) => {
  const {taskId} = route.params;
  const [task, setTask] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  useEffect(() => {
    (async () => {
      const tasks = await loadTasks();
      const found = tasks?.find(t => t.id === taskId);
      setTask(found);
      setEditTitle(found?.title || '');
      setEditDesc(found?.description || '');
    })();
  }, [taskId]);

  const handleUpdate = async () => {
    if (!editTitle.trim()) {
      Alert.alert('Validation', 'Title cannot be empty');
      return;
    }
    const all = await loadTasks();
    const updated = all.map(t =>
      t.id === taskId ? {...t, title: editTitle, description: editDesc} : t,
    );
    await saveTasks(updated);
    setTask(prev => ({...prev, title: editTitle, description: editDesc}));
    setEditing(false);
  };

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          const all = await loadTasks();
          await saveTasks(all.filter(t => t.id !== taskId));
          navigation.goBack();
        },
      },
    ]);
  };

  if (!task) return <View style={styles.center}><Text>Loading...</Text></View>;

  const PRIORITY_COLORS = {High: '#FF4757', Medium: '#FFA502', Low: '#2ED573'};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={[styles.badge, {backgroundColor: PRIORITY_COLORS[task.priority] + '20'}]}>
            <Text style={[styles.badgeText, {color: PRIORITY_COLORS[task.priority]}]}>
              {task.priority}
            </Text>
          </View>
          <Text style={[styles.status, task.completed && styles.statusDone]}>
            {task.completed ? '✓ Completed' : '○ Pending'}
          </Text>
        </View>

        {editing ? (
          <>
            <TextInput
              style={styles.editInput}
              value={editTitle}
              onChangeText={setEditTitle}
              autoFocus
            />
            <TextInput
              style={[styles.editInput, styles.editArea]}
              value={editDesc}
              onChangeText={setEditDesc}
              multiline
              textAlignVertical="top"
            />
          </>
        ) : (
          <>
            <Text style={styles.title}>{task.title}</Text>
            {task.description ? (
              <Text style={styles.desc}>{task.description}</Text>
            ) : null}
          </>
        )}

        <Text style={styles.date}>
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.actions}>
        {editing ? (
          <>
            <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditing(false)}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.editBtn} onPress={() => setEditing(true)}>
              <Text style={styles.editBtnText}>Edit Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
              <Text style={styles.deleteBtnText}>Delete Task</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5FA', padding: 16},
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 20,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.06,
    shadowOffset: {width: 0, height: 2}, shadowRadius: 8,
  },
  row: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16},
  badge: {paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8},
  badgeText: {fontWeight: '600', fontSize: 12},
  status: {color: '#999', fontSize: 13, fontWeight: '500'},
  statusDone: {color: '#2ED573'},
  title: {fontSize: 20, fontWeight: '700', color: '#1A1A2E', lineHeight: 28},
  desc: {fontSize: 14, color: '#666', marginTop: 12, lineHeight: 21},
  date: {fontSize: 12, color: '#bbb', marginTop: 16},
  editInput: {
    borderWidth: 1.5, borderColor: '#6C63FF', borderRadius: 10,
    padding: 12, fontSize: 15, color: '#1A1A2E', marginBottom: 10,
  },
  editArea: {height: 100, textAlignVertical: 'top'},
  actions: {marginTop: 20},
  editBtn: {
    backgroundColor: '#6C63FF', borderRadius: 12, padding: 15,
    alignItems: 'center', marginBottom: 10,
  },
  editBtnText: {color: '#fff', fontWeight: '700', fontSize: 15},
  deleteBtn: {
    borderWidth: 1.5, borderColor: '#FF4757', borderRadius: 12,
    padding: 15, alignItems: 'center',
  },
  deleteBtnText: {color: '#FF4757', fontWeight: '700', fontSize: 15},
  saveBtn: {
    backgroundColor: '#2ED573', borderRadius: 12, padding: 15,
    alignItems: 'center', marginBottom: 10,
  },
  saveBtnText: {color: '#fff', fontWeight: '700', fontSize: 15},
  cancelBtn: {padding: 15, alignItems: 'center'},
  cancelBtnText: {color: '#999', fontSize: 15},
});

export default TaskDetailScreen;