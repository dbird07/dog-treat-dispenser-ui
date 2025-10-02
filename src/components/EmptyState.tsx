import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Button } from './Button';

interface EmptyStateProps {
  onAddDevice: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddDevice }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🐕</Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          No Devices Yet
        </Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Add your first treat dispenser to start training your dog with positive reinforcement.
        </Text>
        
        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🔊</Text>
            <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>
              Sound attraction
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🍖</Text>
            <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>
              Treat dispensing
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📈</Text>
            <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>
              Smart scheduling
            </Text>
          </View>
        </View>
        
        <Button
          title="Add Your First Device"
          onPress={onAddDevice}
          size="large"
          icon="➕"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  features: {
    gap: 16,
    marginBottom: 32,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    fontSize: 20,
  },
  featureText: {
    fontSize: 16,
  },
});
