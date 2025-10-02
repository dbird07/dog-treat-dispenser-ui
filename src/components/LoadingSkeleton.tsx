import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface LoadingSkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const { theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          backgroundColor: theme.colors.border,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const DeviceCardSkeleton: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.cardSkeleton, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.cardHeader}>
        <LoadingSkeleton width={120} height={20} />
        <LoadingSkeleton width={40} height={24} borderRadius={12} />
      </View>
      <View style={styles.cardContent}>
        <LoadingSkeleton width={60} height={60} borderRadius={30} />
        <View style={styles.cardInfo}>
          <LoadingSkeleton width={80} height={16} />
          <LoadingSkeleton width={100} height={14} />
        </View>
      </View>
      <View style={styles.cardActions}>
        <LoadingSkeleton width={80} height={32} borderRadius={16} />
        <LoadingSkeleton width={60} height={32} borderRadius={16} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E5E7EB',
  },
  cardSkeleton: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  cardInfo: {
    flex: 1,
    gap: 8,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
});
