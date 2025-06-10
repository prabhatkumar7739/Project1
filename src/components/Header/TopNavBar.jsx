import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Menu,
  Dialog,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import amdlogo from "../../assets/amdlogo.png";
import UserMenu from "./UserMenu";
import SupportPopover from "./SupportPopover";
import ReleaseNotes from "../ReleaseNotes";

const TopNavBar = ({ currentView = 'portfolio', onViewChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [supportAnchorEl, setSupportAnchorEl] = useState(null);
  const [isReleaseNotesOpen, setIsReleaseNotesOpen] = useState(false);

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

  const handleReleaseNotesOpen = () => {
    setIsReleaseNotesOpen(true);
  };

  const handleReleaseNotesClose = () => {
    setIsReleaseNotesOpen(false);
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
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Titillium Web', sans-serif",
              fontWeight: 600,
              fontSize: "1.25rem",
              letterSpacing: "0.02em",
              marginRight: 4
            }}
          >
            EPYC Cloud Cost Advisor
          </Typography>
          <Button

            // id="step-one-target"  
            color="inherit"
            sx={{
              textDecoration: currentView === 'portfolio' ? "underline" : "none",
              mr: 2,
              fontFamily: "'Titillium Web', sans-serif",
              fontWeight: 400,
              textTransform: "none",
              fontSize: "1rem"
            }}
            onClick={() => onViewChange('portfolio')}
          >
            Manage Portfolio
          </Button>
          <Button
            color="inherit"
            sx={{
              textDecoration: currentView === 'explorer' ? "underline" : "none",
              fontFamily: "'Titillium Web', sans-serif",
              fontWeight: 400,
              textTransform: "none",
              fontSize: "1rem"
            }}
            onClick={() => onViewChange('explorer')}
          >
            Explorer
          </Button>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <IconButton  id="step-one-target" color="inherit" onClick={handleReleaseNotesOpen}>
            
            <DescriptionIcon />
          </IconButton>

          {/* Support Button */}
          <IconButton color="inherit"  id="step-three-target" onClick={handleSupportClick}>
            <HeadsetMicIcon/>
          </IconButton>
          <SupportPopover
            anchorEl={supportAnchorEl}
            handleClose={handleSupportClose}
          />

          {/* User Menu */}
          <IconButton
          id="step-four-target"
            color="inherit"
            onClick={handleMenuClick}
            aria-controls="user-menu"
            aria-haspopup="true"
          >
            <AccountCircleIcon />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Titillium Web', sans-serif",
              fontWeight: 400,
              fontSize: "0.875rem"
            }}
          >
            testuser@infobellit.com
          </Typography>

          <style>
            {`
              #user-menu .MuiPaper-root {
                background-color: #000 !important;
                color: #fff !important;
                font-family: 'Titillium Web', sans-serif !important;
              }
              #user-menu .MuiMenuItem-root {
                color: #fff !important;
                margin-bottom: 8px !important;
                font-family: 'Titillium Web', sans-serif !important;
                font-weight: 400 !important;
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

          {/* Release Notes Dialog */}
          <Dialog
            open={isReleaseNotesOpen}
            onClose={handleReleaseNotesClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
              sx: {
                minHeight: '80vh',
                maxHeight: '90vh',
                bgcolor: '#ffffff'
              }
            }}
          >
            <ReleaseNotes handleClose={handleReleaseNotesClose} />
          </Dialog>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;

