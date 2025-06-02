import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Menu,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import amdlogo from "../../assets/amdlogo.png";
import UserMenu from "./UserMenu";
import SupportPopover from "./SupportPopover";
const TopNavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [supportAnchorEl, setSupportAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const isSupportOpen = Boolean(supportAnchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSupportClick = (event) => {
    setSupportAnchorEl(event.currentTarget);
  };

  const handleSupportClose = () => {
    setSupportAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#000", px: 2 }}>
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
          <Button color="inherit" sx={{ textDecoration: "underline" }}>
            Manage Portfolio
          </Button>
          <Button color="inherit">Explorer</Button>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <IconButton color="inherit">
            <DescriptionIcon />
          </IconButton>

          {/* Support Button */}
          <IconButton color="inherit" onClick={handleSupportClick}>
            <HeadsetMicIcon />
          </IconButton>
          <SupportPopover
            anchorEl={supportAnchorEl}
            handleClose={handleSupportClose}
          />

          {/* User Menu */}
          <IconButton
            color="inherit"
            onClick={handleMenuClick}
            aria-controls="user-menu"
            aria-haspopup="true"
          >
            <AccountCircleIcon />
          </IconButton>
          <Typography variant="body2">testuser@infobellit.com</Typography>

          <style>
            {`
              #user-menu .MuiPaper-root {
                background-color: #000 !important;
                color: #fff !important;
              }
              #user-menu .MuiMenuItem-root {
                color: #fff !important;
                margin-bottom: 8px !important;
              }
              #user-menu .MuiMenuItem-root:last-child {
                margin-bottom: 0 !important;
              }
              #user-menu .MuiDivider-root {
                background-color: #444 !important;
              }
            `}
          </style>

          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <UserMenu onClose={handleMenuClose} />
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;

