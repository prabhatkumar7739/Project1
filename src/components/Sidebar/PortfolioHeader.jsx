import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function PortfolioHeader() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      fontWeight={500}
      height="2.5rem"
      px={2}
    >
      <Typography variant="subtitle1">Portfolios</Typography>
      <Tooltip title="Create New Portfolio">
        <IconButton
          size="small"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.main",
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