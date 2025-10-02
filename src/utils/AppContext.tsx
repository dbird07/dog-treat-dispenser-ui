import React, { createContext, useContext, useState, useCallback } from 'react';
import { Device, ActivityEvent, AppState } from '../types';
import { mockDevices, mockActivities } from '../data/mockData';

interface AppContextType extends AppState {
  addDevice: (device: Omit<Device, 'id' | 'createdAt'>) => void;
  updateDevice: (id: string, updates: Partial<Device>) => void;
  deleteDevice: (id: string) => void;
  toggleDevice: (id: string) => void;
  testSound: (id: string) => void;
  refillTreats: (id: string, amount: number) => void;
  addActivity: (activity: Omit<ActivityEvent, 'id'>) => void;
  refreshDevices: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const [activities, setActivities] = useState<ActivityEvent[]>(mockActivities);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addDevice = useCallback((deviceData: Omit<Device, 'id' | 'createdAt'>) => {
    const newDevice: Device = {
      ...deviceData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setDevices(prev => [...prev, newDevice]);
  }, []);

  const updateDevice = useCallback((id: string, updates: Partial<Device>) => {
    setDevices(prev => 
      prev.map(device => 
        device.id === id ? { ...device, ...updates } : device
      )
    );
  }, []);

  const deleteDevice = useCallback((id: string) => {
    setDevices(prev => prev.filter(device => device.id !== id));
    setActivities(prev => prev.filter(activity => activity.deviceId !== id));
  }, []);

  const toggleDevice = useCallback((id: string) => {
    setDevices(prev => 
      prev.map(device => 
        device.id === id ? { ...device, isOn: !device.isOn } : device
      )
    );
  }, []);

  const testSound = useCallback((id: string) => {
    // Mock sound test - just add an activity event
    const newActivity: ActivityEvent = {
      id: Date.now().toString(),
      deviceId: id,
      timestamp: new Date().toISOString(),
      soundPlayed: true,
      treatDispensed: false,
      sessionNumber: 1,
    };
    setActivities(prev => [newActivity, ...prev]);
  }, []);

  const refillTreats = useCallback((id: string, amount: number) => {
    setDevices(prev => 
      prev.map(device => 
        device.id === id ? { ...device, treatsRemaining: amount } : device
      )
    );
  }, []);

  const addActivity = useCallback((activityData: Omit<ActivityEvent, 'id'>) => {
    const newActivity: ActivityEvent = {
      ...activityData,
      id: Date.now().toString(),
    };
    setActivities(prev => [newActivity, ...prev]);
  }, []);

  const refreshDevices = useCallback(() => {
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const value: AppContextType = {
    devices,
    activities,
    isLoading,
    isDarkMode,
    addDevice,
    updateDevice,
    deleteDevice,
    toggleDevice,
    testSound,
    refillTreats,
    addActivity,
    refreshDevices,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
