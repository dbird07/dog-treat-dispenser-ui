import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface TreatPillProps {
  remaining: number;
  capacity: number;
  showProgress?: boolean;
}

export const TreatPill: React.FC<TreatPillProps> = ({
  remaining,
  capacity,
  showProgress = true,
}) => {
  const { theme } = useTheme();
  
  const percentage = capacity > 0 ? remaining / capacity : 0;
  const isLow = percentage < 0.15;
  
  const getColor = () => {
    if (isLow) return theme.colors.error;
    if (percentage < 0.5) return theme.colors.warning;
    return theme.colors.success;
  };

  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
      }
    ]}>
      {showProgress && (
        <View style={[
          styles.progressBar,
          { 
            backgroundColor: theme.colors.border,
            width: '100%',
          }
        ]}>
          <View style={[
            styles.progressFill,
            { 
              backgroundColor: getColor(),
              width: `${percentage * 100}%`,
            }
          ]} />
        </View>
      )}
      <Text style={[
        styles.text,
        { 
          color: theme.colors.text,
          fontWeight: isLow ? '600' : '400',
        }
      ]}>
        {remaining}/{capacity}
      </Text>
      {isLow && (
        <Text style={[styles.lowText, { color: theme.colors.error }]}>
          Low
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 60,
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    borderRadius: 1,
  },
  progressFill: {
    height: '100%',
    borderRadius: 1,
  },
  text: {
    fontSize: 12,
    marginRight: 4,
  },
  lowText: {
    fontSize: 10,
    fontWeight: '600',
  },
});
