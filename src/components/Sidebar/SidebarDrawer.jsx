import React from "react";
import {
  Divider,
  useTheme,
  IconButton,
  Box
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SidebarSelect from "./SidebarSelect";
import PortfolioHeader from "./PortfolioHeader";
import PortfolioList from "./PortfolioList";
import { useCloudProvider } from '../../context/CloudProviderContext';

const drawerWidth = "17%";

const selectOptions = [
  {
    label: "Cloud",
    options: [
      { label: "AWS", value: "AWS" },
      { label: "AZURE", value: "AZURE" },
      { label: "GCP", value: "GCP" },
    ],
  },
  {
    label: "Telemetry Connector",
    options: [
      { label: "Datadog", value: "Datadog" },
      { label: "AWS CloudWatch", value: "AWS CloudWatch" },
    ],
  },
];

export default function SidebarDrawer({ toggleDrawer }) {
  const theme = useTheme();
  const { selectedProvider, setSelectedProvider } = useCloudProvider();

  const handleProviderChange = (event) => {
    setSelectedProvider(event.target.value);
  };

  return (
    <Box sx={{ 
      width: drawerWidth, 
      marginTop: "10px", 
      padding: "5px",
      borderRight: "1px solid #e0e0e0",
      backgroundColor: "#f0f0f0",
      display: "flex",
      flexDirection: "column"
    }}>
      <Box sx={{ display: "flex" }}>
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
      </Box>

      <Divider sx={{ my: 2 }} />
      <PortfolioHeader />
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <PortfolioList />
      </Box>
    </Box>
  );
}