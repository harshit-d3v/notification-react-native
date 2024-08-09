import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

// Create the Notification Context
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const timerWidth = useRef(new Animated.Value(0)).current;

  const showNotification = ({ status, message, duration = 3000 }) => {
    setNotification({ status, message });
    setRemainingTime(duration / 1000);

    // Reset the timer width
    timerWidth.setValue(0);

    // Start the timer animation
    Animated.timing(timerWidth, {
      toValue: 100,
      duration,
      useNativeDriver: false,
    }).start();

    // Update the remaining time every second
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Hide notification after the specified duration
    setTimeout(() => {
      setNotification(null);
    }, duration);
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      {notification && (
        <View style={[styles.notification, getNotificationStyle(notification.status)]}>
          <Text style={styles.message}>
            {notification.message} 
            {/* ({remainingTime}s) */}
          </Text>
          <Animated.View style={[styles.timer, { 
            width: timerWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%']
            }),
            backgroundColor: getTimerColor(notification.status)
          }]} />
        </View>
      )}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotification = () => {
  return useContext(NotificationContext);
};

// Helper function to get notification style based on status
const getNotificationStyle = (status) => {
  switch (status) {
    case 'error':
      return styles.error;
    case 'warning':
      return styles.warning;
    case 'success':
      return styles.success;
    default:
      return {};
  }
};

// Helper function to get timer color based on status
const getTimerColor = (status) => {
  switch (status) {
    case 'error':
      return '#f44336'; // Red color for error
    case 'warning':
      return '#ff9800'; // Orange color for warning
    case 'success':
      return '#4caf50'; // Green color for success
    default:
      return '#000'; // Default color
  }
};

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 1000,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timer: {
    height: 4,
    marginTop: 8,
  },
  error: {
    borderColor: '#f44336', // Red color for error
    borderLeftWidth: 8,
    borderRightWidth: 8,
  },
  warning: {
    borderColor: '#ff9800', // Orange color for warning
    borderLeftWidth: 8,
    borderRightWidth: 8,
  },
  success: {
    borderColor: '#4caf50', // Green color for success
    borderLeftWidth: 8,
    borderRightWidth: 8,
  },
});