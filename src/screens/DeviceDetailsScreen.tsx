import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import { ProgressRing } from '../components/ProgressRing';
import { TreatPill } from '../components/TreatPill';
import { Toggle } from '../components/Toggle';
import { Button } from '../components/Button';
import { NumberStepper } from '../components/NumberStepper';
import { Device, ActivityEvent } from '../types';

interface DeviceDetailsScreenProps {
  navigation: any;
  route: { params: { deviceId: string } };
}

export const DeviceDetailsScreen: React.FC<DeviceDetailsScreenProps> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { devices, activities, updateDevice, deleteDevice, testSound, refillTreats } = useApp();
  const { deviceId } = route.params;
  
  const device = devices.find(d => d.id === deviceId);
  const deviceActivities = activities
    .filter(a => a.deviceId === deviceId)
    .slice(0, 10)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const [isEditing, setIsEditing] = useState(false);
  const [refillAmount, setRefillAmount] = useState(device?.treatsRemaining || 0);

  if (!device) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            Device not found
          </Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            variant="primary"
          />
        </View>
      </SafeAreaView>
    );
  }

  const percentage = device.capacity > 0 ? device.treatsRemaining / device.capacity : 0;
  const isLow = percentage < 0.15;

  const handleToggle = () => {
    updateDevice(deviceId, { isOn: !device.isOn });
  };

  const handleTestSound = () => {
    testSound(deviceId);
    // Show success toast
  };

  const handleRefill = () => {
    if (refillAmount >= 0 && refillAmount <= device.capacity) {
      refillTreats(deviceId, refillAmount);
      setIsEditing(false);
      // Show success toast
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Device',
      `Are you sure you want to delete "${device.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteDevice(deviceId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('EditDevice', { deviceId });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = () => {
    if (!device.isOn) return theme.colors.disabled;
    if (isLow) return theme.colors.error;
    if (percentage < 0.5) return theme.colors.warning;
    return theme.colors.success;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backButton, { color: theme.colors.primary }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Device Details</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Text style={[styles.editButton, { color: theme.colors.primary }]}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Device Status Card */}
        <View style={[styles.statusCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <View style={styles.statusHeader}>
            <View>
              <Text style={[styles.deviceName, { color: theme.colors.text }]}>
                {device.name}
              </Text>
              <View style={styles.statusRow}>
                <View style={[
                  styles.statusIndicator,
                  { backgroundColor: getStatusColor() }
                ]} />
                <Text style={[styles.statusText, { color: theme.colors.textSecondary }]}>
                  {device.isOn ? 'Online' : 'Offline'}
                </Text>
              </View>
            </View>
            <Toggle
              value={device.isOn}
              onValueChange={handleToggle}
              size="large"
            />
          </View>

          <View style={styles.progressSection}>
            <ProgressRing
              progress={percentage}
              size={80}
              color={getStatusColor()}
              showPercentage
            />
            <View style={styles.progressInfo}>
              <TreatPill
                remaining={device.treatsRemaining}
                capacity={device.capacity}
                showProgress
              />
              <Text style={[styles.nextTreat, { color: theme.colors.textSecondary }]}>
                Next: {device.nextTreatTime || 'Manual only'}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <Button
              title="Test Sound"
              onPress={handleTestSound}
              variant="outline"
              icon="🔊"
              style={styles.actionButton}
            />
            <Button
              title="Refill Treats"
              onPress={() => setIsEditing(!isEditing)}
              variant="outline"
              icon="🍖"
              style={styles.actionButton}
            />
          </View>
        </View>

        {/* Refill Section */}
        {isEditing && (
          <View style={[styles.refillSection, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Refill Treats</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
              Enter new total in the device
            </Text>
            <NumberStepper
              value={refillAmount}
              onValueChange={setRefillAmount}
              min={0}
              max={device.capacity}
            />
            <View style={styles.refillButtons}>
              <Button
                title="Cancel"
                onPress={() => setIsEditing(false)}
                variant="ghost"
                style={styles.refillButton}
              />
              <Button
                title="Refill"
                onPress={handleRefill}
                variant="primary"
                style={styles.refillButton}
              />
            </View>
          </View>
        )}

        {/* Activity Log */}
        <View style={styles.activitySection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
          {deviceActivities.length === 0 ? (
            <View style={styles.emptyActivity}>
              <Text style={[styles.emptyActivityText, { color: theme.colors.textSecondary }]}>
                No recent activity
              </Text>
            </View>
          ) : (
            <View style={[styles.activityList, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
              {deviceActivities.map((activity, index) => (
                <View key={activity.id} style={[
                  styles.activityItem,
                  index < deviceActivities.length - 1 && { borderBottomColor: theme.colors.border }
                ]}>
                  <View style={styles.activityIcon}>
                    <Text style={styles.activityIconText}>
                      {activity.soundPlayed ? '🔊' : '🔇'}
                    </Text>
                    {activity.treatDispensed && (
                      <Text style={styles.treatIcon}>🍖</Text>
                    )}
                  </View>
                  <View style={styles.activityInfo}>
                    <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>
                      {formatTime(activity.timestamp)}
                    </Text>
                    <Text style={[styles.activityDescription, { color: theme.colors.text }]}>
                      Session {activity.sessionNumber} • {activity.treatDispensed ? 'Treat dispensed' : 'No treat'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerSection}>
          <Button
            title="Delete Device"
            onPress={handleDelete}
            variant="outline"
            style={[styles.deleteButton, { borderColor: theme.colors.error }]}
            textStyle={{ color: theme.colors.error }}
            icon="🗑️"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  editButton: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
  },
  statusCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  deviceName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 16,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  progressInfo: {
    flex: 1,
    gap: 12,
  },
  nextTreat: {
    fontSize: 16,
  },
  actionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  refillSection: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  refillButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  refillButton: {
    flex: 1,
  },
  activitySection: {
    marginBottom: 24,
  },
  emptyActivity: {
    padding: 40,
    alignItems: 'center',
  },
  emptyActivityText: {
    fontSize: 16,
  },
  activityList: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  activityIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIconText: {
    fontSize: 20,
  },
  treatIcon: {
    fontSize: 16,
    marginLeft: 4,
  },
  activityInfo: {
    flex: 1,
  },
  activityTime: {
    fontSize: 14,
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 16,
  },
  dangerSection: {
    marginBottom: 40,
  },
  deleteButton: {
    borderColor: '#EF4444',
  },
});
