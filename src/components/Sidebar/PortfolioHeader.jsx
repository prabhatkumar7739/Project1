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
