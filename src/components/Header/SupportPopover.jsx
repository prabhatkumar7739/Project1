import React from "react";
import {
  Popover,
  Typography,
  Box,
  Divider,
  ListItemIcon,
  ButtonBase,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import DOMPurify from "dompurify";

const SupportPopover = ({ anchorEl, handleClose, currentComponent = "Dashboard" }) => {
  const open = Boolean(anchorEl);

  const handleEmailRoute = () => {
    const email = "prabhatkonly@gmail.com";
    const sanitizedSubject = DOMPurify.sanitize(`CCA - Support Ticket Request - Regarding ${currentComponent} Page`);
    const encodedSubject = encodeURIComponent(sanitizedSubject);

    const bodyContent = `Hi [Support Team/Specific Name],\n\nI am writing to request support regarding CCA ${currentComponent} Page.
\n\nDescription of the Issue:\n\n[Provide a detailed explanation of the problem.]
\n\nSteps to Reproduce:\n\n1. [Step 1]\n2. [Step 2]\n3. [Step 3]
\n\nExpected Outcome:\n[Describe what you expected to happen.]
\n\nAttachments:\n[Include any relevant files or screenshots.]
\n\nContact Information:\nName: [Your Name]\nEmail: [Your Email]\nPhone: [Your Phone Number]
\n\nUrgency Level:\nIndicate urgency, e.g. [High, Medium, Low]
\n\nThank you for your assistance!\n\nBest regards,\n[Your Name]`;

    const sanitizedBody = DOMPurify.sanitize(bodyContent);
    const encodedBody = encodeURIComponent(sanitizedBody);

    window.location.href = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{
        sx: {
          backgroundColor: "#1a1a1a",
          color: "#fff",
          p: 2,
          borderRadius: 2,
          minWidth: 280,
        },
      }}
    >
      <Box display="flex" alignItems="center" mb={1}>
        <ListItemIcon sx={{ color: "#fff", minWidth: 36 }}>
          <PhoneIcon />
        </ListItemIcon>
        <Box>
          <Typography variant="body1" fontWeight="bold">
            Hotline Number
          </Typography>
          <Typography variant="body2">+1 (502) 388-6228</Typography>
        </Box>
      </Box>

      <Divider sx={{ backgroundColor: "#444", my: 1 }} />

      <ButtonBase
        onClick={handleEmailRoute}
        sx={{ display: "flex", alignItems: "center", width: "100%", textAlign: "left" }}
      >
        <ListItemIcon sx={{ color: "#fff", minWidth: 36 }}>
          <EmailIcon />
        </ListItemIcon>
        <Box>
          <Typography variant="body1" fontWeight="bold">
            Email
          </Typography>
          <Typography variant="body2" sx={{ color: "white", textDecoration: "underline" }}>
            prabhatkonly@gmail.com
          </Typography>
        </Box>
      </ButtonBase>
    </Popover>
  );
};

export default SupportPopover;
