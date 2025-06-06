import React, { createContext, useState, useContext } from 'react';

export const FormTableContext = createContext();

export const FormTableProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isTableCreated, setIsTableCreated] = useState(false);

  const updateFormData = (newData) => {
    setFormData(newData);
  };

  const resetTable = () => {
    setTableData([]);
    setIsTableCreated(false);
    setIsFormFilled(false);
  };

  // Compute areButtonsEnabled based on tableData
  const areButtonsEnabled = tableData.length > 0;

  return (
    <FormTableContext.Provider value={{ 
      formData, 
      updateFormData,
      tableData,
      setTableData,
      isFormFilled,
      setIsFormFilled,
      isTableCreated,
      setIsTableCreated,
      areButtonsEnabled,
      resetTable
    }}>
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