export type Device = {
  id: string;
  name: string;
  capacity: number;
  treatsRemaining: number;
  isOn: boolean;
  schedule: {
    mode: 'everyNth' | 'probability' | 'custom';
    everyNth?: number;
    probability?: number; // 0–1
    customSteps?: Array<{ session: number; probability: number }>;
    fadeEnabled: boolean;
  };
  nextTreatTime?: string;
  tonePreset?: 'whistle' | 'chime' | 'click' | 'beep';
  createdAt: string;
  lastActivity?: string;
};

export type ActivityEvent = {
  id: string;
  deviceId: string;
  timestamp: string;
  soundPlayed: boolean;
  treatDispensed: boolean;
  sessionNumber: number;
};

export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    accent: string;
    disabled: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    h1: {
      fontSize: number;
      fontWeight: string;
      lineHeight: number;
    };
    h2: {
      fontSize: number;
      fontWeight: string;
      lineHeight: number;
    };
    h3: {
      fontSize: number;
      fontWeight: string;
      lineHeight: number;
    };
    body: {
      fontSize: number;
      fontWeight: string;
      lineHeight: number;
    };
    caption: {
      fontSize: number;
      fontWeight: string;
      lineHeight: number;
    };
  };
};

export type AppState = {
  devices: Device[];
  activities: ActivityEvent[];
  isLoading: boolean;
  isDarkMode: boolean;
};

export type NavigationProps = {
  Home: undefined;
  DeviceDetails: { deviceId: string };
  AddDevice: undefined;
  EditDevice: { deviceId: string };
};

export type FrequencyMode = 'everyNth' | 'probability' | 'custom';

export type TonePreset = 'whistle' | 'chime' | 'click' | 'beep';

export type FormField = {
  value: string | number;
  error?: string;
  touched: boolean;
};

export type DeviceFormData = {
  name: FormField;
  capacity: FormField;
  treatsRemaining: FormField;
  frequencyMode: FrequencyMode;
  everyNth: FormField;
  probability: FormField;
  fadeEnabled: boolean;
  tonePreset: TonePreset;
  isOn: boolean;
};
