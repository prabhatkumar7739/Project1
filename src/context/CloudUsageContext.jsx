import React, { createContext, useContext, useState } from 'react';

const CloudUsageContext = createContext();

export const CloudUsageProvider = ({ children }) => {
  const [reportData, setReportData] = useState({
    portfolio: null,
    services: []
  });

  const saveReport = (data) => {
    setReportData(data);
  };

  return (
    <CloudUsageContext.Provider value={{ reportData, saveReport }}>
      {children}
    </CloudUsageContext.Provider>
  );
};

export const useCloudUsage = () => {
  const context = useContext(CloudUsageContext);
  if (!context) {
    throw new Error('useCloudUsage must be used within a CloudUsageProvider');
  }
  return context;
}; 