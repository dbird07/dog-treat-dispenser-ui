import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import { DeviceCard } from '../components/DeviceCard';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { devices, isLoading, refreshDevices, toggleDevice, testSound } = useApp();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    refreshDevices();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleAddDevice = () => {
    navigation.navigate('AddDevice');
  };

  const handleEditDevice = (deviceId: string) => {
    navigation.navigate('DeviceDetails', { deviceId });
  };

  const handleTestSound = (deviceId: string) => {
    testSound(deviceId);
    // Show toast notification (UI only)
  };

  const handleToggleDevice = (deviceId: string) => {
    toggleDevice(deviceId);
  };

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.headerContent}>
        <View>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Treat Dispensers
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            {devices.length} device{devices.length !== 1 ? 's' : ''} connected
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.settingsButton, { backgroundColor: theme.colors.background }]}
          onPress={() => {/* Settings navigation */}}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFAB = () => (
    <View style={styles.fabContainer}>
      <Button
        title=""
        onPress={handleAddDevice}
        size="large"
        icon="➕"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
      />
    </View>
  );

  if (devices.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {renderHeader()}
        <EmptyState onAddDevice={handleAddDevice} />
        {renderFAB()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {renderHeader()}
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
      >
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onToggle={handleToggleDevice}
            onEdit={handleEditDevice}
            onTest={handleTestSound}
          />
        ))}
        
        <View style={styles.bottomSpacing} />
      </ScrollView>
      
      {renderFAB()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  bottomSpacing: {
    height: 100, // Space for FAB
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
