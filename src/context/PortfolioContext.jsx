import React, { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolioList, setPortfolioList] = useState([]);

  const addPortfolio = (portfolioName) => {
    setPortfolioList(prev => [portfolioName, ...prev]);
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