import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Device } from '../types';
import { ProgressRing } from './ProgressRing';
import { TreatPill } from './TreatPill';
import { Toggle } from './Toggle';
import { Button } from './Button';

interface DeviceCardProps {
  device: Device;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onTest: (id: string) => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
  device,
  onToggle,
  onEdit,
  onTest,
}) => {
  const { theme } = useTheme();
  
  const percentage = device.capacity > 0 ? device.treatsRemaining / device.capacity : 0;
  const isLow = percentage < 0.15;

  const getStatusColor = () => {
    if (!device.isOn) return theme.colors.disabled;
    if (isLow) return theme.colors.error;
    if (percentage < 0.5) return theme.colors.warning;
    return theme.colors.success;
  };

  const getNextTreatText = () => {
    if (!device.isOn) return 'Off';
    if (device.nextTreatTime) return device.nextTreatTime;
    return 'Manual only';
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.shadow,
        }
      ]}
      onPress={() => onEdit(device.id)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {device.name}
          </Text>
          <View style={[
            styles.statusIndicator,
            { backgroundColor: getStatusColor() }
          ]} />
        </View>
        
        <Toggle
          value={device.isOn}
          onValueChange={() => onToggle(device.id)}
          size="small"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.progressSection}>
          <ProgressRing
            progress={percentage}
            size={60}
            color={getStatusColor()}
          />
          <View style={styles.progressInfo}>
            <TreatPill
              remaining={device.treatsRemaining}
              capacity={device.capacity}
              showProgress={false}
            />
            <Text style={[styles.nextTreat, { color: theme.colors.textSecondary }]}>
              Next: {getNextTreatText()}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="Test Sound"
            onPress={() => onTest(device.id)}
            variant="outline"
            size="small"
            icon="🔊"
          />
          <Button
            title="Edit"
            onPress={() => onEdit(device.id)}
            variant="ghost"
            size="small"
            icon="✏️"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  content: {
    gap: 16,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  progressInfo: {
    flex: 1,
    gap: 8,
  },
  nextTreat: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
});
