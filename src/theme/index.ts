import { lightColors, darkColors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius } from './spacing';
import { Theme } from '../types';

export const lightTheme: Theme = {
  colors: lightColors,
  spacing,
  borderRadius,
  typography,
};

export const darkTheme: Theme = {
  colors: darkColors,
  spacing,
  borderRadius,
  typography,
};

export { lightColors, darkColors, typography, spacing, borderRadius };
