import React from 'react';
import { TouchableOpacity, View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Toggle: React.FC<ToggleProps> = ({
  value,
  onValueChange,
  disabled = false,
  size = 'medium',
}) => {
  const { theme } = useTheme();
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { width: 40, height: 24, thumbSize: 18 };
      case 'large':
        return { width: 60, height: 36, thumbSize: 28 };
      default:
        return { width: 50, height: 30, thumbSize: 22 };
    }
  };

  const { width, height, thumbSize } = getSizeStyles();
  const thumbMargin = 4;

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [thumbMargin, width - thumbSize - thumbMargin],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.disabled, theme.colors.primary],
  });

  return (
    <TouchableOpacity
      onPress={() => !disabled && onValueChange(!value)}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Animated.View
        style={[
          styles.track,
          {
            width,
            height,
            backgroundColor,
            borderRadius: height / 2,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: theme.colors.surface,
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
