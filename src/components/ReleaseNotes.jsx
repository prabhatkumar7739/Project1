import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import {
  Divider,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";
import { releaseNotesTableData } from "./ReleaseNotes.data";

const BORDER_COLOR = "#BDBDBD";
const COMMON_FONT_SIZE = "14px";

const FeatureList = ({ features }) => (
  <div style={{ whiteSpace: "pre-wrap", textAlign: "center", fontSize: COMMON_FONT_SIZE }}>
    {features?.map((feature, idx) => (
      <div key={feature.label + idx} style={{ marginBottom: 4 }}>
        {feature.label && (
          <strong style={{ fontWeight: "bold", fontSize: COMMON_FONT_SIZE }}>{feature.label}:</strong>
        )}
        <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0, textAlign: "center", fontSize: COMMON_FONT_SIZE }}>
          {feature.values.map((val, i) => (
            <li
              key={i}
              style={{
                whiteSpace: "pre-wrap",
                padding: 0,
                margin: 0,
                fontSize: COMMON_FONT_SIZE,
                textAlign: "center",
              }}
            >
              {val}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const UpcomingList = ({ items }) => (
  <div style={{ textAlign: "center", fontSize: COMMON_FONT_SIZE }}>
    <ul style={{ listStyleType: "none", whiteSpace: "pre-wrap", paddingLeft: 0, margin: 0, textAlign: "center", fontSize: COMMON_FONT_SIZE }}>
      {items?.map((item, idx) => (
        <li key={item.label + idx} style={{ marginBottom: 4 }}>
          {item.label && (
            <strong style={{ fontWeight: "bold", fontSize: COMMON_FONT_SIZE }}>{item.label}:</strong>
          )}
          <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0, textAlign: "center", fontSize: COMMON_FONT_SIZE }}>
            {item.values.map((val, i) => (
              <li
                key={i}
                style={{
                  whiteSpace: "pre-wrap",
                  padding: 0,
                  margin: 0,
                  fontSize: COMMON_FONT_SIZE,
                  textAlign: "center",
                }}
              >
                {val}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
);

function ReleaseNotes({ handleClose }) {
  const theme = useTheme();

  if (!releaseNotesTableData || releaseNotesTableData.length === 0) {
    return (
      <>
        <DialogTitle>Release Notes</DialogTitle>
        <DialogContent>
          <Typography>No release notes available.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </>
    );
  }

  return (
    <>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          pb: 0,
          fontSize: COMMON_FONT_SIZE,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: COMMON_FONT_SIZE,
            fontWeight: "bold",
            textAlign: "center",
            flex: 1,
          }}
        >
          Release Notes
        </Typography>
        <Button
          onClick={handleClose}
          sx={{
            minWidth: 'auto',
            p: 0.5,
            color: '#ff0000',
            '&:hover': {
              color: '#cc0000',
            },
          }}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="body2"
          sx={{
            fontSize: COMMON_FONT_SIZE,
            mb: 1,
            textAlign: "center",
          }}
        >
          To access the latest features, please press{" "}
          <Typography
            component="span"
            sx={{
              fontWeight: "bold",
              display: "inline",
              textAlign: "center",
              fontSize: COMMON_FONT_SIZE,
            }}
          >
            Ctrl+Shift+R
          </Typography>{" "}
          on your keyboard. This shortcut will refresh application, ensuring
          that you are using the most up-to-date version with all the newest
          functionalities and improvements.
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: COMMON_FONT_SIZE, mb: 2, textAlign: "center" }}
        >
          Get real-time insights into estimated cost savings when switching to cloud instances powered by AMD within the same Cloud Service Provider(CSP).
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TableContainer 
            component={Paper} 
            sx={{ 
              ml: 0, 
              boxShadow: "none",
              maxHeight: '60vh',
              overflow: 'auto'
            }}
          >
            <Table
              sx={{
                minWidth: 600,
                borderCollapse: "separate",
                border: `1px solid ${BORDER_COLOR}`,
                "& .MuiTableCell-root": {
                  padding: '8px 12px',
                  height: '36px',
                  fontSize: '0.86rem',
                  lineHeight: '1.3',
                  color: '#000000',
                  bgcolor: '#ffffff',
                  verticalAlign: 'top',
                  textAlign: 'center',
                },
                "& .MuiTableHead-root .MuiTableCell-root": {
                  color: '#fff',
                  bgcolor: '#000',
                  fontSize: '0.92rem',
                  fontWeight: 'bold',
                  verticalAlign: 'top',
                  textAlign: 'center',
                },
              }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#000",
                    "& .MuiTableCell-root": {
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: COMMON_FONT_SIZE,
                      border: `1px solid ${BORDER_COLOR}`,
                      padding: "4px 8px",
                      height: 28,
                      lineHeight: 1.2,
                      textAlign: "center",
                      verticalAlign: "top",
                    },
                  }}
                >
                  <TableCell rowSpan={2}>Version</TableCell>
                  <TableCell rowSpan={2}>Release<br />Date</TableCell>
                  <TableCell colSpan={2}>What's New</TableCell>
                  <TableCell rowSpan={2}>Upcoming / What's Next</TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    backgroundColor: "#000",
                    "& .MuiTableCell-root": {
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: COMMON_FONT_SIZE,
                      border: `1px solid ${BORDER_COLOR}`,
                      padding: "4px 8px",
                      height: 28,
                      lineHeight: 1.2,
                      textAlign: "center",
                      verticalAlign: "top",
                    },
                  }}
                >
                  <TableCell>Major Features</TableCell>
                  <TableCell>Minor Improvements</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {releaseNotesTableData.map((row, idx) => (
                  <TableRow
                    key={row.version + idx}
                    sx={{
                      "& .MuiTableCell-root": {
                        border: `1px solid ${BORDER_COLOR} !important`,
                        fontSize: COMMON_FONT_SIZE,
                        backgroundColor: "#fff",
                        fontFamily: "inherit",
                        height: "auto",
                        minHeight: 28,
                        padding: "8px 12px",
                        textAlign: "center",
                        color: "#000000",
                        verticalAlign: "top",
                      },
                    }}
                  >
                    <TableCell sx={{ fontWeight: "bold" }}>{row.version}</TableCell>
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
      <DialogActions>
        <Button 
          onClick={handleClose} 
          variant="contained" 
          color="error"
          sx={{ 
            fontSize: COMMON_FONT_SIZE,
            textTransform: 'none',
          }}
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
