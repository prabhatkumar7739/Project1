import React from "react";
import {
  ListSubheader,
  useTheme,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SidebarSelect = ({ label = "", value = "", options, onValueChange }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const newValue = event.target.value;
    onValueChange(event);
    
    // Navigate based on selection
    if (newValue === "Datadog") {
      navigate('/datadog');
    } else if (newValue === "AWS CloudWatch") {
      navigate('/cloudwatch');
    }
  };

  return (
    <FormControl 
      variant="outlined" 
      size="small"
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-root": {
          height: "40px",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
            borderWidth: "2px"
          }
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "black"
        }
      }}
    >
      <InputLabel>Service Provider</InputLabel>
      <Select
        id="step-six-target"
        value={value}
        onChange={handleChange}
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
        {options.map((group, idx) => [
          idx === 1 && (
            <Divider
              key="divider"
              sx={{
                my: 1,
                borderColor: "#bdbdbd",
              }}
            />
          ),
          <ListSubheader
            key={group.label}
            disableSticky
            disableHighlight
            sx={{
              color: theme.palette.dark,
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "#fff !important",
              "&.Mui-focusVisible, &:hover, &:focus": {
                backgroundColor: "#fff !important",
                pointerEvents: "none"
              },
              "&.Mui-selected": {
                backgroundColor: "#fff !important",
              },
              cursor: "default"
            }}
          >
            {group.label}
          </ListSubheader>,
          ...group.options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ 
                height: "40px",
                "&:hover": {
                  backgroundColor: "transparent", // Remove hover background
                },
                "&.Mui-selected": {
                  backgroundColor: "transparent", // Remove selected background
                  "&:hover": {
                    backgroundColor: "transparent", // Remove hover on selected
                  },
                },
              }}
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