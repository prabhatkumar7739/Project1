import React from "react";
import {
  Box, 
  Divider, 
  useTheme,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SidebarSelect from './SidebarSelect';
import PortfolioHeader from "./PortfolioHeader";
import PortfolioList from "./PortfolioList";

const drawerWidth = '20%';

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

  return (
    // <Box
    //   bgcolor="inherit"
    //   mt={theme.spacing(8.375)}
    //   sx={{
    //     width: drawerWidth,
    //     flexShrink: 0,
    //     borderRight: `1px solid ${borderColor}`,
    //   }}
    // >
    <div style={{width: drawerWidth,marginTop:'10px',padding:'5px'}}>
 <div style={{display:'flex'}}>
        <SidebarSelect
          label="Service Provider"
          options={selectOptions}
          value={selectOptions[0].options[0].value}
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
     
    // </Box>
  );
}
