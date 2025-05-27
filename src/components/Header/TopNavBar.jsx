import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import amdlogo from "../../assets/amdlogo.png";

const TopNavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#000", px: 2 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <img
            src={amdlogo}
            alt="AMD Logo"
            style={{ height: 32, marginRight: 60 }}
          />
          <Typography variant="h6" fontWeight="bold" mr={4}>
            EPYC Cloud Cost Advisor
          </Typography>
          <Button color="inherit" sx={{textDecoration:'underline'}}>Manage Portfolio</Button>
          <Button color="inherit">Explorer</Button>
        </Box>

        {/* Right side: icons and email */}
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton color="inherit">
            <DescriptionIcon />
          </IconButton>
          <IconButton color="inherit">
            <HeadsetMicIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
          <Typography variant="body2">testuser@infobellit.com</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
