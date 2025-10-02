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
import { FormField } from '../components/FormField';
import { NumberStepper } from '../components/NumberStepper';
import { FrequencySelector } from '../components/FrequencySelector';
import { Toggle } from '../components/Toggle';
import { Button } from '../components/Button';
import { DeviceFormData, FrequencyMode, TonePreset } from '../types';

interface AddDeviceScreenProps {
  navigation: any;
}

export const AddDeviceScreen: React.FC<AddDeviceScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { addDevice } = useApp();
  
  const [formData, setFormData] = useState<DeviceFormData>({
    name: { value: '', error: '', touched: false },
    capacity: { value: 40, error: '', touched: false },
    treatsRemaining: { value: 40, error: '', touched: false },
    frequencyMode: 'everyNth',
    everyNth: { value: 2, error: '', touched: false },
    probability: { value: 0.7, error: '', touched: false },
    fadeEnabled: true,
    tonePreset: 'whistle',
    isOn: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    let isValid = true;
    const newFormData = { ...formData };

    // Validate name
    if (!formData.name.value.trim()) {
      newFormData.name = { ...formData.name, error: 'Device name is required', touched: true };
      isValid = false;
    } else {
      newFormData.name = { ...formData.name, error: '', touched: true };
    }

    // Validate capacity
    if (formData.capacity.value < 1 || formData.capacity.value > 100) {
      newFormData.capacity = { ...formData.capacity, error: 'Capacity must be between 1 and 100', touched: true };
      isValid = false;
    } else {
      newFormData.capacity = { ...formData.capacity, error: '', touched: true };
    }

    // Validate treats remaining
    if (formData.treatsRemaining.value < 0 || formData.treatsRemaining.value > formData.capacity.value) {
      newFormData.treatsRemaining = { 
        ...formData.treatsRemaining, 
        error: `Must be between 0 and ${formData.capacity.value}`, 
        touched: true 
      };
      isValid = false;
    } else {
      newFormData.treatsRemaining = { ...formData.treatsRemaining, error: '', touched: true };
    }

    setFormData(newFormData);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const deviceData = {
        name: formData.name.value as string,
        capacity: formData.capacity.value as number,
        treatsRemaining: formData.treatsRemaining.value as number,
        isOn: formData.isOn,
        schedule: {
          mode: formData.frequencyMode,
          everyNth: formData.frequencyMode === 'everyNth' ? formData.everyNth.value as number : undefined,
          probability: formData.frequencyMode === 'probability' ? formData.probability.value as number : undefined,
          customSteps: formData.frequencyMode === 'custom' ? [
            { session: 1, probability: 1.0 },
            { session: 2, probability: 0.8 },
            { session: 3, probability: 0.6 },
            { session: 4, probability: 0.4 },
            { session: 5, probability: 0.2 },
          ] : undefined,
          fadeEnabled: formData.fadeEnabled,
        },
        tonePreset: formData.tonePreset,
        nextTreatTime: formData.isOn ? 'Manual only' : undefined,
      };

      addDevice(deviceData);
      setIsLoading(false);
      navigation.goBack();
    }, 1000);
  };

  const handleCancel = () => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard your changes?',
      [
        { text: 'Keep Editing', style: 'cancel' },
        { text: 'Discard', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  const tonePresets: { key: TonePreset; label: string; icon: string }[] = [
    { key: 'whistle', label: 'Whistle', icon: '🎵' },
    { key: 'chime', label: 'Chime', icon: '🔔' },
    { key: 'click', label: 'Click', icon: '👆' },
    { key: 'beep', label: 'Beep', icon: '📢' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={[styles.cancelButton, { color: theme.colors.primary }]}>Cancel</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Add Device</Text>
        <TouchableOpacity onPress={handleSave} disabled={isLoading}>
          <Text style={[
            styles.saveButton,
            { color: isLoading ? theme.colors.disabled : theme.colors.primary }
          ]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <FormField
          label="Device Name"
          placeholder="Enter device name"
          value={formData.name.value as string}
          onChangeText={(text) => setFormData(prev => ({
            ...prev,
            name: { value: text, error: '', touched: true }
          }))}
          error={formData.name.error}
          required
        />

        <NumberStepper
          label="Treat Capacity"
          value={formData.capacity.value as number}
          onValueChange={(value) => setFormData(prev => ({
            ...prev,
            capacity: { value, error: '', touched: true }
          }))}
          min={1}
          max={100}
          disabled={isLoading}
        />

        <NumberStepper
          label="Starting Treats Loaded"
          value={formData.treatsRemaining.value as number}
          onValueChange={(value) => setFormData(prev => ({
            ...prev,
            treatsRemaining: { value, error: '', touched: true }
          }))}
          min={0}
          max={formData.capacity.value as number}
          disabled={isLoading}
        />

        <FrequencySelector
          mode={formData.frequencyMode}
          onModeChange={(mode) => setFormData(prev => ({ ...prev, frequencyMode: mode }))}
          everyNth={formData.everyNth.value as number}
          onEveryNthChange={(value) => setFormData(prev => ({
            ...prev,
            everyNth: { value, error: '', touched: true }
          }))}
          probability={formData.probability.value as number}
          onProbabilityChange={(value) => setFormData(prev => ({
            ...prev,
            probability: { value, error: '', touched: true }
          }))}
        />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Sound Preset
          </Text>
          <View style={styles.toneGrid}>
            {tonePresets.map((preset) => (
              <TouchableOpacity
                key={preset.key}
                style={[
                  styles.toneButton,
                  {
                    backgroundColor: formData.tonePreset === preset.key ? theme.colors.primary : theme.colors.surface,
                    borderColor: formData.tonePreset === preset.key ? theme.colors.primary : theme.colors.border,
                  }
                ]}
                onPress={() => setFormData(prev => ({ ...prev, tonePreset: preset.key }))}
              >
                <Text style={styles.toneIcon}>{preset.icon}</Text>
                <Text style={[
                  styles.toneLabel,
                  { color: formData.tonePreset === preset.key ? theme.colors.surface : theme.colors.text }
                ]}>
                  {preset.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.section, styles.powerSection]}>
          <View style={styles.powerRow}>
            <View>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Power
              </Text>
              <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
                Turn device on/off
              </Text>
            </View>
            <Toggle
              value={formData.isOn}
              onValueChange={(value) => setFormData(prev => ({ ...prev, isOn: value }))}
              disabled={isLoading}
            />
          </View>
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
  cancelButton: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
  },
  toneGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  toneButton: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 8,
  },
  toneIcon: {
    fontSize: 24,
  },
  toneLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  powerSection: {
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 16,
    borderRadius: 12,
  },
  powerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
