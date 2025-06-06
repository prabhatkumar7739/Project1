import React, { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  useTheme,
  ListItemIcon,
  Tooltip
} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import { usePortfolio } from '../../context/PortfolioContext';
import { useFormTable } from '../../context/FormTableContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PortfolioList() {
  const { portfolioList, addPortfolio, activePortfolio, setActivePortfolio } = usePortfolio();
  const { setTableData, setIsTableCreated } = useFormTable();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

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
  }, [addPortfolio, setActivePortfolio]);

  const handlePortfolioClick = (portfolio) => {
    const portfolioName = typeof portfolio === 'string' ? portfolio : portfolio.name;
    setActivePortfolio(portfolioName);

    const storedData = localStorage.getItem(`portfolio_${portfolioName}`);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setTableData(parsedData);
      setIsTableCreated(parsedData.length > 0);
    } else {
      setTableData([]);
      setIsTableCreated(false);
    }

    window.dispatchEvent(new CustomEvent('updatePortfolioName', {
      detail: {
        portfolioName,
        enableButtons: true
      }
    }));

    if (['/cost-advice', '/cloud-usage'].includes(location.pathname)) {
      navigate('/');
    }
  };

  return (
    <Box sx={{
      height: "calc(100vh - 180px)",
      overflow: "hidden",
      "&:hover": {
        overflowY: "auto"
      },
      position: "relative",
      backgroundColor: "#f0f0f0",
    }}>
      <List id="dashboard-portfolio-list" sx={{ p: 0 }}>
        {portfolioList.map((portfolio) => {
          const isActive = typeof portfolio === 'string'
            ? portfolio === activePortfolio
            : portfolio.name === activePortfolio;
          const portfolioName = typeof portfolio === 'string' ? portfolio : portfolio.name;
          const provider = typeof portfolio === 'string' ? null : portfolio.provider;

          return (
            <Tooltip title={portfolioName} arrow placement="right" key={portfolioName}>
              <ListItem
                button
                onClick={() => handlePortfolioClick(portfolio)}
                sx={{
                  py: 1,
                  px: 2,
                  color: isActive ? '#fff' : '#000',
                  backgroundColor: isActive ? '#000' : '#fff',
                  borderRadius: '6px',
                  mb: 0.5,
                  '& .MuiListItemIcon-root': {
                    color: isActive ? '#fff' : '#666',
                    minWidth: 30
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
                    <Typography variant="body2" noWrap>
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
            </Tooltip>
          );
        })}
      </List>
    </Box>
  );
}
