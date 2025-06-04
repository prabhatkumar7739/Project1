import React, { useState } from 'react';
import {
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import ClassIcon from '@mui/icons-material/Class';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import OnlineDocumentationDialog from './OnlineDocumentationDialog';
import AboutDialog from './AboutDialog';

const UserMenu = ({ onClose }) => {
  const [docOpen, setDocOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <PersonIcon fontSize="medium" sx={{ color: "#fff" }} />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
      <MenuItem component="a" href="/AMD%20CCA1.BDHf4xn9.pdf" target="_blank" rel="noopener noreferrer" onClick={onClose}>
        <ListItemIcon>
          <ClassIcon fontSize="medium" sx={{ color: "#fff" }} />
        </ListItemIcon>
        <ListItemText>User Guide</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => setDocOpen(true)}
      >
        <ListItemIcon>
          <HelpOutlineRoundedIcon fontSize="medium" sx={{ color: "#fff" }} />
        </ListItemIcon>
        <ListItemText>Online Documentation</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => setAboutOpen(true)}>
        <ListItemIcon>
          <InfoIcon fontSize="medium" sx={{ color: "#fff" }} />
        </ListItemIcon>
        <ListItemText>About</ListItemText>
      </MenuItem>
      <Divider sx={{ backgroundColor: "white", my: 0.5 }} />
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <LogoutIcon fontSize="medium" sx={{ color: "#fff" }} />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
      <OnlineDocumentationDialog open={docOpen} onClose={() => setDocOpen(false)} />
      <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
};

export default UserMenu;
