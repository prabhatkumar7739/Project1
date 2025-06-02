<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import {List, ListItem, ListItemText, Box, Typography, useTheme, ListItemIcon, Paper,} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import { usePortfolio } from '../../context/PortfolioContext';

export default function PortfolioList() {
  const [activePortfolio, setActivePortfolio] = useState("UIAuto1488");
  const { portfolioList, addPortfolio } = usePortfolio();
=======
import React, { useState } from "react";
import {List, ListItem, ListItemText, Box, Typography, useTheme, ListItemIcon, Paper,} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
const portfolios = [
  "UIAuto1535-renamed", "UIAuto1488", "UIAuto1534-renamed", "UIAuto1531-renamed",
  "UIAuto1532-renamed", "UIAuto1530-renamed", "UIAuto1529-renamed", "UIAuto1514-renamed",
  "UIAuto1499-renamed", "UIAuto1487", "UIAuto1484"
];

export default function PortfolioList() {
  const [activePortfolio, setActivePortfolio] = useState("UIAuto1488");
>>>>>>> origin/main
  const theme = useTheme();

  // Listen for save portfolio events
  useEffect(() => {
    const handleSavePortfolio = (event) => {
      const { portfolioName, cloudProvider } = event.detail;
      // Add the portfolio with the user-provided name and cloud provider
      addPortfolio({ name: portfolioName, provider: cloudProvider });
    };

    window.addEventListener('saveToPortfolio', handleSavePortfolio);
    return () => {
      window.removeEventListener('saveToPortfolio', handleSavePortfolio);
    };
  }, [addPortfolio]);

  return (
<<<<<<< HEAD
    <Box sx={{ 
      height: "70vh", 
      overflow: "hidden",
      "&:hover": {
        overflowY: "auto"
      },
      position: "relative",
      zIndex: 0,
      borderRight: "1px solid #e0e0e0",
      borderLeft: "1px solid #e0e0e0",
      borderBottom: "1px solid #e0e0e0",
      backgroundColor: "#fff",
      '& .MuiPaper-root': {
        position: 'relative',
        zIndex: 0,
        mx: 1,
        '&:first-of-type': {
          mt: 1
        }
      }
    }}>
      <List id="dashboard-portfolio-list" disablePadding>
        {portfolioList.map((portfolio) => {
          const isActive = typeof portfolio === 'string' 
            ? portfolio === activePortfolio
            : portfolio.name === activePortfolio;
          const portfolioName = typeof portfolio === 'string' ? portfolio : portfolio.name;
          const provider = typeof portfolio === 'string' ? null : portfolio.provider;

          return (
            <Paper
              key={portfolioName}
=======
    <Box sx={{ height: "70vh", overflowY: "auto" }}>
      <List id="dashboard-portfolio-list" disablePadding>
        {portfolios.map((portfolio) => {
          const isActive = portfolio === activePortfolio;

          return (
            <Paper
              key={portfolio}
>>>>>>> origin/main
              elevation={0}
              sx={{
                mb: 1,
                border: "1px solid #e0e0e0",
                borderRadius: "6px",
<<<<<<< HEAD
                backgroundColor: isActive ? "#000" : "#fff",
                position: "relative",
                zIndex: 1,
                transition: "background-color 0.3s ease"
=======
                backgroundColor: isActive ? "#f5f5f5" : "#ffffff",
>>>>>>> origin/main
              }}
            >
              <ListItem
                button
<<<<<<< HEAD
                onClick={() => setActivePortfolio(portfolioName)}
                selected={isActive}
                sx={{
                  p: 1,
                  color: isActive ? '#fff' : '#000',
                  '& .MuiListItemIcon-root': {
                    color: isActive ? '#fff' : '#3f3f3f',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'transparent',
                  },
                  '&:hover': {
                    backgroundColor: isActive ? '#222' : '#e0e0e0',
=======
                onClick={() => setActivePortfolio(portfolio)}
                selected={isActive}
                sx={{
                  p: 1,
                  "&.Mui-selected": {
                    backgroundColor: "#e0e0e0",
                    "&:hover": {
                      backgroundColor: "#d5d5d5",
                    },
>>>>>>> origin/main
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
<<<<<<< HEAD
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography fontSize={14} sx={{ color: isActive ? '#fff' : '#000' }}>
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
=======
                  < DescriptionIcon sx={{ color: "#3f3f3f" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography fontSize={14}>
                      {portfolio}
>>>>>>> origin/main
                    </Typography>
                  }
                />
              </ListItem>
            </Paper>
          );
        })}
      </List>
    </Box>
  );
}
