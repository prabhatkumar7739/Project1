import React, { createContext, useContext, useState } from 'react';

const FormTableContext = createContext();

export const FormTableProvider = ({ children }) => {
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isTableCreated, setIsTableCreated] = useState(false);
  const [tableData, setTableData] = useState([]);

  const areButtonsEnabled = isTableCreated;

  const resetTable = () => {
    setIsTableCreated(false);
    setIsFormFilled(false);
    setTableData([]);
  };

  return (
    <FormTableContext.Provider 
      value={{ 
        isFormFilled, 
        setIsFormFilled, 
        isTableCreated, 
        setIsTableCreated,
        tableData,
        setTableData,
        areButtonsEnabled,
        resetTable
      }}
    >
      {children}
    </FormTableContext.Provider>
  );
};

export const useFormTable = () => {
  const context = useContext(FormTableContext);
  if (!context) {
    throw new Error('useFormTable must be used within a FormTableProvider');
  }
  return context;
}; 