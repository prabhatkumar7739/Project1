import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useFormTable } from "../../context/FormTableContext";

function PortfolioHeader() {
  const { resetTable, setTableData } = useFormTable();

  const handleAddClick = () => {
    // Reset the form and table
    resetTable();
    setTableData([]);
    
    // Clear saved portfolio name and reset notification bar
    const resetNotificationEvent = new CustomEvent('resetNotification', {
      detail: { clearSavedPortfolio: true }
    });
    window.dispatchEvent(resetNotificationEvent);

    // Clear table data and form fields
    const clearTableEvent = new CustomEvent('clearTableData');
    window.dispatchEvent(clearTableEvent);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      fontWeight={500}
      height="2.5rem"
    >
      <Typography sx={{ pl: 1 }}>Portfolios</Typography>
      <Tooltip
        title="Create New Portfolio"
        slotProps={{ tooltip: { sx: { fontSize: "0.8rem" } } }}
      >
        <IconButton
          size="small"
          onClick={handleAddClick}
          sx={{
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <AddCircleIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default PortfolioHeader;
