import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const PRIORITY_COLORS = {
  High: '#FF4757',
  Medium: '#FFA502',
  Low: '#2ED573',
};

const TaskCard = ({task, onPress, onToggle}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.checkbox, task.completed && styles.checkboxDone]}
          onPress={onToggle}
        >
          {task.completed && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>

        <View style={styles.content}>
          <Text
            style={[styles.title, task.completed && styles.titleDone]}
            numberOfLines={2}
          >
            {task.title}
          </Text>
          <View style={styles.meta}>
            <View
              style={[
                styles.priorityBadge,
                {backgroundColor: PRIORITY_COLORS[task.priority] + '20'},
              ]}
            >
              <Text
                style={[
                  styles.priorityText,
                  {color: PRIORITY_COLORS[task.priority]},
                ]}
              >
                {task.priority}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  row: {flexDirection: 'row', alignItems: 'flex-start'},
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxDone: {backgroundColor: '#6C63FF'},
  checkmark: {color: '#fff', fontSize: 13, fontWeight: 'bold'},
  content: {flex: 1},
  title: {fontSize: 15, color: '#1A1A2E', fontWeight: '500', lineHeight: 21},
  titleDone: {
    textDecorationLine: 'line-through',
    color: '#999',
    fontWeight: '400',
  },
  meta: {flexDirection: 'row', marginTop: 8, alignItems: 'center'},
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  priorityText: {fontSize: 11, fontWeight: '600'},
});

export default TaskCard;