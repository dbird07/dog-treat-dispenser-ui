import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface NumberStepperProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
}

export const NumberStepper: React.FC<NumberStepperProps> = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  label,
}) => {
  const { theme } = useTheme();

  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    onValueChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    onValueChange(newValue);
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {label}
        </Text>
      )}
      <View style={[
        styles.stepper,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        }
      ]}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: disabled || value <= min ? theme.colors.disabled : theme.colors.primary,
            }
          ]}
          onPress={handleDecrement}
          disabled={disabled || value <= min}
        >
          <Text style={[
            styles.buttonText,
            { color: theme.colors.surface }
          ]}>
            −
          </Text>
        </TouchableOpacity>
        
        <View style={[styles.valueContainer, { borderColor: theme.colors.border }]}>
          <Text style={[styles.value, { color: theme.colors.text }]}>
            {value}
          </Text>
        </View>
        
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: disabled || value >= max ? theme.colors.disabled : theme.colors.primary,
            }
          ]}
          onPress={handleIncrement}
          disabled={disabled || value >= max}
        >
          <Text style={[
            styles.buttonText,
            { color: theme.colors.surface }
          ]}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  button: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueContainer: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
  },
});
