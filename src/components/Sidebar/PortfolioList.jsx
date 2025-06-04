import React, { useState, useEffect } from "react";
import {List, ListItem, ListItemText, Box, Typography, useTheme, ListItemIcon, Paper,} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import { usePortfolio } from '../../context/PortfolioContext';
import { useFormTable } from '../../context/FormTableContext';

export default function PortfolioList() {
  const [activePortfolio, setActivePortfolio] = useState("UIAuto1488");
  const { portfolioList, addPortfolio } = usePortfolio();
  const { setTableData, setIsTableCreated } = useFormTable();
  const theme = useTheme();

  // Listen for save portfolio events
  useEffect(() => {
    const handleSavePortfolio = (event) => {
      const { portfolioName, cloudProvider } = event.detail;
      const success = addPortfolio({ name: portfolioName, provider: cloudProvider });
      if (success) {
        setActivePortfolio(portfolioName);
      }
    };

    window.addEventListener('saveToPortfolio', handleSavePortfolio);
    return () => {
      window.removeEventListener('saveToPortfolio', handleSavePortfolio);
    };
  }, [addPortfolio]);

  // Handle portfolio click
  const handlePortfolioClick = (portfolioName) => {
    setActivePortfolio(portfolioName);
    
    // Get stored data for this portfolio from localStorage
    const storedData = localStorage.getItem(`portfolio_${portfolioName}`);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setTableData(parsedData);
      setIsTableCreated(parsedData.length > 0);
    } else {
      setTableData([]);
      setIsTableCreated(false);
    }

    // Dispatch event to update portfolio name field
    window.dispatchEvent(new CustomEvent('updatePortfolioName', {
      detail: { portfolioName }
    }));
  };

  return (
    <Box sx={{ 
      height: "calc(100vh - 180px)", 
      overflow: "hidden",
      "&:hover": {
        overflowY: "auto"
      },
      position: "relative",
      backgroundColor: "#f5f5f5",
    }}>
      <List id="dashboard-portfolio-list" sx={{ p: 0 }}>
        {portfolioList.map((portfolio) => {
          const isActive = typeof portfolio === 'string' 
            ? portfolio === activePortfolio
            : portfolio.name === activePortfolio;
          const portfolioName = typeof portfolio === 'string' ? portfolio : portfolio.name;
          const provider = typeof portfolio === 'string' ? null : portfolio.provider;

          return (
            <ListItem
              key={portfolioName}
              button
              onClick={() => handlePortfolioClick(portfolioName)}
              sx={{
                py: 1,
                px: 2,
                color: isActive ? '#fff' : '#000',
                backgroundColor: isActive ? '#000' : 'transparent',
                '& .MuiListItemIcon-root': {
                  color: isActive ? '#fff' : '#666',
                  minWidth: 36
                },
                '&:hover': {
                  backgroundColor: isActive ? '#222' : '#e8e8e8',
                },
              }}
            >
              <ListItemIcon>
                <DescriptionIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2">
                    {portfolioName}
                    {provider && (
                      <Typography
                        component="span"
                        fontSize={12}
                        color={isActive ? '#fff' : 'text.secondary'}
                        sx={{ ml: 1 }}
                      >
                        ({provider})
                      </Typography>
                    )}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
