import { Appearance } from 'react-native';
import { lightColors } from './colors.light';
import { darkColors } from './colors.dark';

export const colors =
  Appearance.getColorScheme() === 'dark'
    ? darkColors
    : lightColors;
