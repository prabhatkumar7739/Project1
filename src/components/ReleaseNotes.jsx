import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from "@mui/material";
import { releaseNotesTableData } from "./ReleaseNotes.data";

// ---- Table Column Render Helpers ----
const FeatureList = ({ features }) => (
  <div style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
    {features?.map((feature, idx) => (
      <div key={feature.label + idx}>
        {feature.label && <strong>{feature.label}:</strong>}
        <ul style={{ paddingLeft: 16 }}>
          {feature.values.map((val, i) => (
            <li key={i} style={{ whiteSpace: "pre-wrap" }}>{val}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const UpcomingList = ({ items }) => (
  <ul style={{ whiteSpace: "pre-wrap", paddingLeft: 16 }}>
    {items?.map((item, idx) => (
      <li key={item.label + idx}>
        {item.label && <strong>{item.label}:</strong>}
        <ul style={{ paddingLeft: 16 }}>
          {item.values.map((val, i) => (
            <li key={i}>{val}</li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);

function ReleaseNotes({ handleClose }) {
  const theme = useTheme();

  return (
    <>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: "1.17em",
            fontWeight: "bold",
          }}
        >
          Release Notes
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.9em",
            mb: 2,
          }}
        >
          To access the latest features, please press{" "}
          <Typography
            variant="span"
            sx={{
              fontWeight: "bold",
              display: "inline",
            }}
          >
            Ctrl+Shift+R
          </Typography>{" "}
          on your keyboard. This shortcut will refresh application, ensuring
          that you are using the most up-to-date version with all the newest
          functionalities and improvements. It's a quick and easy way to make
          sure you're always working with the latest tools available.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#000" }}>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Version
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Release Date
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center" colSpan={2}>
                    What's New
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Upcoming / What's Next
                  </TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#000" }}>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">
                    Major Features
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">
                    Minor Improvements
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {releaseNotesTableData.map((row, idx) => (
                  <TableRow key={row.version + idx}>
                    <TableCell>{row.version}</TableCell>
                    <TableCell>{row.releaseDate}</TableCell>
                    <TableCell>
                      <FeatureList features={row.majorFeatures} />
                    </TableCell>
                    <TableCell>
                      <FeatureList features={row.minorImprovements} />
                    </TableCell>
                    <TableCell>
                      <UpcomingList items={row.upComing} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          startIcon={<CloseIcon />}
          id={'step-two-target'}
          variant="contained"
          color="error"
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </>
  );
}

ReleaseNotes.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default ReleaseNotes; 