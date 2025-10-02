import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  hint,
  required = false,
  style,
  ...textInputProps
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, { color: theme.colors.text }]}>
        {label}
        {required && <Text style={{ color: theme.colors.error }}> *</Text>}
      </Text>
      
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            borderColor: error ? theme.colors.error : theme.colors.border,
            color: theme.colors.text,
          },
        ]}
        placeholderTextColor={theme.colors.textSecondary}
        {...textInputProps}
      />
      
      {error && (
        <Text style={[styles.error, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}
      
      {hint && !error && (
        <Text style={[styles.hint, { color: theme.colors.textSecondary }]}>
          {hint}
        </Text>
      )}
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
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 48,
  },
  error: {
    fontSize: 14,
    marginTop: 4,
  },
  hint: {
    fontSize: 14,
    marginTop: 4,
  },
});
