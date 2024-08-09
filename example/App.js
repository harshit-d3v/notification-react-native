// example/App.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { AppWrapper, useNotification } from '../src'; // Use your package locally

// Component to demonstrate notification usage
const NotificationDemo = () => {
  const showNotification = useNotification();

  const handleSuccess = () => {
    showNotification({
      status: 'success',
      message: 'This is a success notification!',
      duration: 5000,
    });
  };

  const handleWarning = () => {
    showNotification({
      status: 'warning',
      message: 'This is a warning notification!',
    });
  };

  const handleError = () => {
    showNotification({
      status: 'error',
      message: 'This is an error notification!',
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Show Success Notification" onPress={handleSuccess} />
      <Button title="Show Warning Notification" onPress={handleWarning} />
      <Button title="Show Error Notification" onPress={handleError} />
    </View>
  );
};

// Main App component
const App = () => (
  <AppWrapper>
    <NotificationDemo />
  </AppWrapper>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default App;
