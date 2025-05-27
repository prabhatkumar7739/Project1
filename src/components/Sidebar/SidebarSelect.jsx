import React from "react";
import {
  ListSubheader,
  useTheme,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";

const SidebarSelect = ({ label = "", value = "", options, onValueChange }) => {
  const theme = useTheme();
  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onValueChange}
        label={label}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 300,
              overflowY: "auto",
              color: theme.palette.grey[800],
            },
          },
        }}
      >
        {options.map((group) => [
          <ListSubheader
            key={group.label}
            sx={{
              color: theme.palette.text.primary,
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            {group.label}
          </ListSubheader>,
          ...group.options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ height: "36px", fontSize: "0.875rem" }}
            >
              {option.label}
            </MenuItem>
          )),
        ])}
      </Select>
    </FormControl>
  );
};

export default SidebarSelect;
