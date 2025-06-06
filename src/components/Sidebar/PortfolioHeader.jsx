import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useFormTable } from "../../context/FormTableContext";
import { usePortfolio } from "../../context/PortfolioContext";
import { useNavigate, useLocation } from "react-router-dom";

function PortfolioHeader() {
  const { resetTable, setTableData } = useFormTable();
  const { setActivePortfolio } = usePortfolio();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddClick = () => {
    // Reset the form and table
    resetTable();
    setTableData([]);
    
    // Clear active portfolio selection
    setActivePortfolio(null);
    
    // Clear saved portfolio name and reset notification bar
    const resetNotificationEvent = new CustomEvent('resetNotification', {
      detail: { clearSavedPortfolio: true }
    });
    window.dispatchEvent(resetNotificationEvent);

    // Clear table data and form fields
    const clearTableEvent = new CustomEvent('clearTableData');
    window.dispatchEvent(clearTableEvent);

    // If on cost-advice or cloud-usage-report page, navigate to home
    if (location.pathname === '/cost-advice' || location.pathname === '/cloud-usage-report') {
      navigate('/');
    } else {
      // Otherwise, navigate to cloud usage report page as before
      navigate('/cloud-usage-report');
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      fontWeight={500}
      sx={{
        px: 2,
        mt: "10px",
        mb: 1
      }}
    >
      <Typography>Portfolios</Typography>
      <Tooltip
        title="Create New Portfolio"
        slotProps={{ tooltip: { sx: { fontSize: "0.8rem" } } }}
      >
        <IconButton
          size="medium"
          onClick={handleAddClick}
          sx={{
            p: 0,
            color: "#000",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <AddCircleIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default PortfolioHeader;
