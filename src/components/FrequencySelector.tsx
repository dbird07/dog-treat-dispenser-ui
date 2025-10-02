import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FrequencyMode } from '../types';

interface FrequencySelectorProps {
  mode: FrequencyMode;
  onModeChange: (mode: FrequencyMode) => void;
  everyNth?: number;
  onEveryNthChange?: (value: number) => void;
  probability?: number;
  onProbabilityChange?: (value: number) => void;
}

export const FrequencySelector: React.FC<FrequencySelectorProps> = ({
  mode,
  onModeChange,
  everyNth = 2,
  onEveryNthChange,
  probability = 0.5,
  onProbabilityChange,
}) => {
  const { theme } = useTheme();

  const modes = [
    { key: 'everyNth' as const, label: 'Every Nth', description: 'Every 2nd sound' },
    { key: 'probability' as const, label: 'Probability', description: '70% chance' },
    { key: 'custom' as const, label: 'Custom', description: 'Fade over time' },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.colors.text }]}>
        Treat Frequency
      </Text>
      <Text style={[styles.hint, { color: theme.colors.textSecondary }]}>
        How often to drop a treat when the sound plays
      </Text>
      
      <View style={styles.modeSelector}>
        {modes.map((modeOption) => (
          <TouchableOpacity
            key={modeOption.key}
            style={[
              styles.modeButton,
              {
                backgroundColor: mode === modeOption.key ? theme.colors.primary : theme.colors.surface,
                borderColor: mode === modeOption.key ? theme.colors.primary : theme.colors.border,
              }
            ]}
            onPress={() => onModeChange(modeOption.key)}
          >
            <Text style={[
              styles.modeLabel,
              { color: mode === modeOption.key ? theme.colors.surface : theme.colors.text }
            ]}>
              {modeOption.label}
            </Text>
            <Text style={[
              styles.modeDescription,
              { color: mode === modeOption.key ? theme.colors.surface : theme.colors.textSecondary }
            ]}>
              {modeOption.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {mode === 'everyNth' && onEveryNthChange && (
        <View style={styles.parameterContainer}>
          <Text style={[styles.parameterLabel, { color: theme.colors.text }]}>
            Every {everyNth} sound{everyNth !== 1 ? 's' : ''}
          </Text>
          <View style={styles.stepperContainer}>
            {[1, 2, 3, 4, 5].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.stepperButton,
                  {
                    backgroundColor: everyNth === value ? theme.colors.primary : theme.colors.surface,
                    borderColor: everyNth === value ? theme.colors.primary : theme.colors.border,
                  }
                ]}
                onPress={() => onEveryNthChange(value)}
              >
                <Text style={[
                  styles.stepperText,
                  { color: everyNth === value ? theme.colors.surface : theme.colors.text }
                ]}>
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {mode === 'probability' && onProbabilityChange && (
        <View style={styles.parameterContainer}>
          <Text style={[styles.parameterLabel, { color: theme.colors.text }]}>
            {Math.round(probability * 100)}% chance
          </Text>
          <View style={styles.sliderContainer}>
            <View style={[styles.sliderTrack, { backgroundColor: theme.colors.border }]}>
              <View style={[
                styles.sliderFill,
                { 
                  backgroundColor: theme.colors.primary,
                  width: `${probability * 100}%`,
                }
              ]} />
            </View>
            <View style={styles.sliderButtons}>
              {[0.1, 0.3, 0.5, 0.7, 0.9].map((value) => (
                <TouchableOpacity
                  key={value}
                  style={[
                    styles.sliderButton,
                    {
                      backgroundColor: Math.abs(probability - value) < 0.05 ? theme.colors.primary : theme.colors.surface,
                      borderColor: Math.abs(probability - value) < 0.05 ? theme.colors.primary : theme.colors.border,
                    }
                  ]}
                  onPress={() => onProbabilityChange(value)}
                >
                  <Text style={[
                    styles.sliderButtonText,
                    { color: Math.abs(probability - value) < 0.05 ? theme.colors.surface : theme.colors.text }
                  ]}>
                    {Math.round(value * 100)}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}

      {mode === 'custom' && (
        <View style={styles.parameterContainer}>
          <Text style={[styles.parameterLabel, { color: theme.colors.text }]}>
            Fade Schedule
          </Text>
          <Text style={[styles.hint, { color: theme.colors.textSecondary }]}>
            Reduce treat frequency across sessions
          </Text>
          <View style={styles.fadePreview}>
            {[1, 2, 3, 4, 5].map((session) => {
              const sessionProbability = Math.max(0.2, 1 - (session - 1) * 0.2);
              return (
                <View key={session} style={styles.fadeBar}>
                  <Text style={[styles.fadeLabel, { color: theme.colors.textSecondary }]}>
                    S{session}
                  </Text>
                  <View style={[styles.fadeTrack, { backgroundColor: theme.colors.border }]}>
                    <View style={[
                      styles.fadeFill,
                      { 
                        backgroundColor: theme.colors.primary,
                        width: `${sessionProbability * 100}%`,
                      }
                    ]} />
                  </View>
                  <Text style={[styles.fadePercentage, { color: theme.colors.textSecondary }]}>
                    {Math.round(sessionProbability * 100)}%
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  hint: {
    fontSize: 14,
    marginBottom: 16,
  },
  modeSelector: {
    gap: 8,
  },
  modeButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  modeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 14,
  },
  parameterContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 12,
  },
  parameterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  stepperContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  stepperButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperText: {
    fontSize: 16,
    fontWeight: '600',
  },
  sliderContainer: {
    gap: 12,
  },
  sliderTrack: {
    height: 4,
    borderRadius: 2,
    position: 'relative',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 2,
  },
  sliderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  sliderButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  fadePreview: {
    gap: 8,
  },
  fadeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fadeLabel: {
    fontSize: 12,
    width: 20,
  },
  fadeTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  fadeFill: {
    height: '100%',
    borderRadius: 4,
  },
  fadePercentage: {
    fontSize: 12,
    width: 30,
    textAlign: 'right',
  },
});
