import React, { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolioList, setPortfolioList] = useState([]);

  const addPortfolio = (portfolioData) => {
    const portfolioName = typeof portfolioData === 'string' ? portfolioData : portfolioData.name;
    
    // Check for duplicate name
    const isDuplicate = portfolioList.some(p => 
      (typeof p === 'string' ? p : p.name).toLowerCase() === portfolioName.toLowerCase()
    );

    if (isDuplicate) {
      window.dispatchEvent(new CustomEvent('showError', {
        detail: { message: 'A portfolio with this name already exists. Please choose a different name.' }
      }));
      return false;
    }

    setPortfolioList(prev => [portfolioData, ...prev]);
    return true;
  };

  const removePortfolio = (portfolioName) => {
    setPortfolioList(prev => prev.filter(p => 
      typeof p === 'string' ? p !== portfolioName : p.name !== portfolioName
    ));
  };

  return (
    <PortfolioContext.Provider 
      value={{ 
        portfolioList,
        setPortfolioList,
        addPortfolio,
        removePortfolio
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}; 