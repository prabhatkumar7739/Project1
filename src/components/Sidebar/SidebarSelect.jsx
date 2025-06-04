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
    <FormControl 
      variant="outlined" 
      size="small"
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-root": {
          height: "40px"
        }
      }}
    >
      <InputLabel>Service Provider</InputLabel>
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
              color: theme.palette.dark,
              fontSize: "16px",
            }}
          >
            {group.label}
          </ListSubheader>,
          ...group.options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ height: "40px" }}
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
