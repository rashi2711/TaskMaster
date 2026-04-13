import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Switch,
} from 'react-native';
import { loadTasks } from '../utils/storage';

const ProfileScreen = ({ navigation }) => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    streak: 7, // Fake streak for demo (you can make it real later)
  });
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const tasks = await loadTasks() || [];
        const completed = tasks.filter(t => t.completed).length;
        
        setStats({
          totalTasks: tasks.length,
          completedTasks: completed,
          pendingTasks: tasks.length - completed,
          streak: 7, // You can enhance this with date logic later
        });
      } catch (error) {
        console.error('Failed to load profile stats:', error);
      }
    };

    loadStats();

    // Refresh stats when returning to profile
    const unsubscribe = navigation.addListener('focus', loadStats);
    return unsubscribe;
  }, [navigation]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Logged out', 'See you soon! 👋');
            // In real app, clear auth + navigate to login
            navigation.navigate('Home');
          }
        },
      ]
    );
  };

  const completionRate = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0;

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/120/6C63FF/FFFFFF?text=RG' }} 
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>Rashi Garg</Text>
        <Text style={styles.bio}>Trainee Software Engineer • Bhopal</Text>
        <Text style={styles.email}>rashi.garg@example.com</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalTasks}</Text>
          <Text style={styles.statLabel}>Total Tasks</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#2ED573' }]}>
            {stats.completedTasks}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#FF4757' }]}>
            {stats.pendingTasks}
          </Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      {/* Progress Circle */}
      <View style={styles.progressContainer}>
        <View style={styles.progressCircle}>
          <Text style={styles.progressText}>{completionRate}%</Text>
          <Text style={styles.progressLabel}>Completion Rate</Text>
        </View>
        <Text style={styles.streakText}>🔥 {stats.streak} Day Streak</Text>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#767577', true: '#6C63FF' }}
            thumbColor={darkMode ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#767577', true: '#6C63FF' }}
            thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity style={styles.settingRow} onPress={() => Alert.alert('Coming Soon', 'Theme customization will be added soon.')}>
          <Text style={styles.settingText}>App Theme</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow} onPress={() => Alert.alert('About', 'TaskMaster v1.0\nBuilt for Kadel Labs application')}>
          <Text style={styles.settingText}>About TaskMaster</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.exportBtn} onPress={() => Alert.alert('Export', 'Tasks exported successfully (demo)')}>
          <Text style={styles.exportText}>📤 Export My Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Made with ❤️ for Kadel Labs Application</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FA',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#6C63FF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    padding: 4,
    marginBottom: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  bio: {
    fontSize: 15,
    color: '#E0E0FF',
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    color: '#C0C0FF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -30,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  progressCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 12,
    borderColor: '#6C63FF',
    elevation: 5,
  },
  progressText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#6C63FF',
  },
  progressLabel: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  streakText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#FF9500',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  chevron: {
    fontSize: 20,
    color: '#999',
  },
  actions: {
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  exportBtn: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  exportText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutBtn: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#FF4757',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FF4757',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginBottom: 30,
  },
});

export default ProfileScreen;