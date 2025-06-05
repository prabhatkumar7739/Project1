import React, { useState } from "react";
import {
  Divider,
  useTheme,
  IconButton,
  Select,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SidebarSelect from "./SidebarSelect";
import PortfolioHeader from "./PortfolioHeader";
import PortfolioList from "./PortfolioList";
import { useCloudProvider } from '../../context/CloudProviderContext';

const drawerWidth = "17%";

const selectOptions = [
  {
    label: "Service Provider",
    options: [
      { label: "AWS", value: "AWS" },
      { label: "Azure", value: "Azure" },
      { label: "GCP", value: "GCP" },
    ],
  },
  {
    label: "Telemetry Collector",
    options: [{ label: "Datalog", value: "datalog" }],
  },
];

export default function SidebarDrawer({ toggleDrawer }) {
  const theme = useTheme();
  const { selectedProvider, setSelectedProvider } = useCloudProvider();

  const handleProviderChange = (event) => {
    setSelectedProvider(event.target.value);
  };

  return (
    <div style={{ 
      width: drawerWidth, 
      height: "100vh",
      marginTop: "10px", 
      padding: "5px",
      borderRight: "1px solid #e0e0e0",
      backgroundColor: "#f5f5f5"
    }}>
      <div style={{ display: "flex" }}>
        <SidebarSelect
          label="Service Provider"
          options={selectOptions}
          value={selectedProvider}
          onValueChange={handleProviderChange}
        />
        <IconButton
          id="btn-dashboard-togglePortfolios"
          onClick={toggleDrawer(false)}
          sx={{
            ml: "auto",
            p: 0,
            color: "black",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>
      </div>

      <Divider sx={{ my: 2 }} />
      <PortfolioHeader />
      <PortfolioList />
    </div>
  );
}
