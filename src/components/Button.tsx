import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.md,
      ...getSizeStyles(),
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? theme.colors.disabled : theme.colors.primary,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? theme.colors.disabled : theme.colors.secondary,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? theme.colors.disabled : theme.colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...theme.typography.button,
      textAlign: 'center',
    };

    switch (variant) {
      case 'primary':
      case 'secondary':
        return {
          ...baseStyle,
          color: disabled ? theme.colors.textSecondary : theme.colors.surface,
        };
      case 'outline':
        return {
          ...baseStyle,
          color: disabled ? theme.colors.disabled : theme.colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          color: disabled ? theme.colors.disabled : theme.colors.primary,
        };
      default:
        return baseStyle;
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          minHeight: 36,
        };
      case 'large':
        return {
          paddingHorizontal: theme.spacing.xl,
          paddingVertical: theme.spacing.lg,
          minHeight: 56,
        };
      default:
        return {
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
          minHeight: 48,
        };
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {icon && (
        <Text style={{ marginRight: theme.spacing.sm }}>
          {icon}
        </Text>
      )}
      <Text style={[getTextStyles(), textStyle]}>
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};
