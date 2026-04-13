import React, {useState, useEffect, useCallback} from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert, RefreshControl,
} from 'react-native';
import TaskCard from '../components/TaskCard';
import {fetchTasksFromAPI} from '../api/taskApi';
import {saveTasks, loadTasks} from '../utils/storage';

const FILTERS = ['All', 'Active', 'Completed'];

const HomeScreen = ({navigation}) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const saved = await loadTasks();
      if (saved && saved.length > 0) {
        setTasks(saved);
      } else {
        const apiTasks = await fetchTasksFromAPI();
        setTasks(apiTasks);
        await saveTasks(apiTasks);
      }
    } catch {
      Alert.alert('Error', 'Failed to load tasks. Check your internet connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Refresh when returning from AddTask/Detail screens
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation, loadData]);

  const toggleTask = async id => {
    const updated = tasks.map(t =>
      t.id === id ? {...t, completed: !t.completed} : t,
    );
    setTasks(updated);
    await saveTasks(updated);
  };

  const filtered = tasks.filter(t => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{tasks.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNum, {color: '#6C63FF'}]}>{completedCount}</Text>
          <Text style={styles.statLabel}>Done</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNum, {color: '#FF4757'}]}>
            {tasks.length - completedCount}
          </Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      {/* Filter tabs */}
      <View style={styles.filterRow}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TaskCard
            task={item}
            onPress={() => navigation.navigate('TaskDetail', {taskId: item.id})}
            onToggle={() => toggleTask(item.id)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {
            setRefreshing(true);
            loadData();
          }} colors={['#6C63FF']} />
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>No tasks found</Text>
          </View>
        }
        contentContainerStyle={{paddingBottom: 100}}
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5FA'},
  center: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40},
  loadingText: {marginTop: 12, color: '#6C63FF', fontSize: 14},
  statsRow: {
    flexDirection: 'row', backgroundColor: '#fff',
    margin: 16, borderRadius: 14, padding: 16,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.06,
    shadowOffset: {width: 0, height: 2}, shadowRadius: 8,
  },
  statBox: {flex: 1, alignItems: 'center'},
  statNum: {fontSize: 24, fontWeight: '700', color: '#1A1A2E'},
  statLabel: {fontSize: 12, color: '#999', marginTop: 2},
  filterRow: {flexDirection: 'row', paddingHorizontal: 16, marginBottom: 8},
  filterBtn: {
    paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20,
    marginRight: 8, backgroundColor: '#EFEFFF',
  },
  filterBtnActive: {backgroundColor: '#6C63FF'},
  filterText: {fontSize: 13, color: '#6C63FF', fontWeight: '500'},
  filterTextActive: {color: '#fff'},
  emptyText: {color: '#999', fontSize: 15},
  fab: {
    position: 'absolute', bottom: 28, right: 24,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#6C63FF', alignItems: 'center',
    justifyContent: 'center', elevation: 6,
    shadowColor: '#6C63FF', shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 4}, shadowRadius: 12,
  },
  fabText: {color: '#fff', fontSize: 28, fontWeight: '300', marginTop: -2},
});

export default HomeScreen;