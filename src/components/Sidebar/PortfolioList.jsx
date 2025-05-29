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
  const theme = useTheme();

  return (
    <Box sx={{ height: "70vh", overflowY: "auto" }}>
      <List id="dashboard-portfolio-list" disablePadding>
        {portfolios.map((portfolio) => {
          const isActive = portfolio === activePortfolio;

          return (
            <Paper
              key={portfolio}
              elevation={0}
              sx={{
                mb: 1,
                border: "1px solid #e0e0e0",
                borderRadius: "6px",
                backgroundColor: isActive ? "#f5f5f5" : "#ffffff",
              }}
            >
              <ListItem
                button
                onClick={() => setActivePortfolio(portfolio)}
                selected={isActive}
                sx={{
                  p: 1,
                  "&.Mui-selected": {
                    backgroundColor: "#e0e0e0",
                    "&:hover": {
                      backgroundColor: "#d5d5d5",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  < DescriptionIcon sx={{ color: "#3f3f3f" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography fontSize={14}>
                      {portfolio}
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
