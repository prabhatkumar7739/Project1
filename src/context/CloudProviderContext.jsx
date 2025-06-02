import React, { createContext, useContext, useState } from 'react';

const CloudProviderContext = createContext();

export const useCloudProvider = () => {
  const context = useContext(CloudProviderContext);
  if (!context) {
    throw new Error('useCloudProvider must be used within a CloudProviderProvider');
  }
  return context;
};

export const CloudProviderProvider = ({ children }) => {
  const [selectedProvider, setSelectedProvider] = useState('AWS');

  return (
    <CloudProviderContext.Provider value={{ selectedProvider, setSelectedProvider }}>
      {children}
    </CloudProviderContext.Provider>
  );
}; 