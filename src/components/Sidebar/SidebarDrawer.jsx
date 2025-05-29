import React, { useState } from "react";
import {
  Divider,
  useTheme,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SidebarSelect from "./SidebarSelect";
import PortfolioHeader from "./PortfolioHeader";
import PortfolioList from "./PortfolioList";

const drawerWidth = "20%";

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
  const borderColor = theme.palette.sidebar?.border || theme.palette.divider;

  // State for selected service provider
  const [selectedProvider, setSelectedProvider] = useState("AWS");

  // Handle selection change
  const handleProviderChange = (event) => {
    setSelectedProvider(event.target.value);
  };

  return (
    <div style={{ width: drawerWidth, marginTop: "10px", padding: "5px" }}>
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
