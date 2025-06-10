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
  const { setTableData, setIsTableCreated, updateFormData } = useFormTable();
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

    // Fill form with dummy data
    const dummyFormData = {
      portfolioName: portfolioName,
      clientId: 'AKIAXXXXXXXXXXXXXXXX',
      clientEmail: 'user@example.com',
      projectId: 'project-123456',
      region: 'us-east-1',
      privateKey: '-----BEGIN PRIVATE KEY-----\nXXXXXXXXXXXX\n-----END PRIVATE KEY-----'
    };
    updateFormData(dummyFormData);

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
                  py: 0.5, // compact vertical padding
                  px: 0.5, // compact horizontal padding
                  color: isActive ? '#fff' : '#000',
                  backgroundColor: isActive ? '#000' : '#fff',
                  borderRadius: '4px',
                  mb: 0.25,
                  alignItems: "center",
                  '& .MuiListItemIcon-root': {
                    color: isActive ? '#fff' : '#666',
                    minWidth: 0,
                    marginRight: "4px",
                    display: "flex",
                    alignItems: "center",
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
                    <Typography variant="caption" noWrap>
                      {portfolioName}
                      {provider && (
                        <Typography
                          component="span"
                          fontSize={10}
                          color={isActive ? '#fff' : 'text.secondary'}
                          sx={{ ml: 0.5 }}
                        >
                          ({provider})
                        </Typography>
                      )}
                    </Typography>
                  }
                  sx={{ marginLeft: 0 }}
                />
              </ListItem>
            </Tooltip>
          );
        })}
      </List>
    </Box>
  );
}
