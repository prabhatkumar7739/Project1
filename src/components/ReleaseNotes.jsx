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
        <ul style={{ paddingLeft: 16, margin: 0, textAlign: "center", fontSize: COMMON_FONT_SIZE }}>
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
    <ul style={{ whiteSpace: "pre-wrap", paddingLeft: 16, margin: 0, textAlign: "center", fontSize: COMMON_FONT_SIZE }}>
      {items?.map((item, idx) => (
        <li key={item.label + idx} style={{ marginBottom: 4 }}>
          {item.label && (
            <strong style={{ fontWeight: "bold", fontSize: COMMON_FONT_SIZE }}>{item.label}:</strong>
          )}
          <ul style={{ paddingLeft: 16, margin: 0, textAlign: "center", fontSize: COMMON_FONT_SIZE }}>
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

  return (
    <>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          pb: 0,
          fontSize: COMMON_FONT_SIZE,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: COMMON_FONT_SIZE,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Release Notes
        </Typography>
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
            variant="span"
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
          functionalities and improvements. It's a quick and easy way to make
          sure you're always working with the latest tools available.
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: COMMON_FONT_SIZE, mb: 2, textAlign: "center" }}
        >
          Get real-time insights into estimated cost savings when switching to cloud instances powered by AMD within the same Cloud Service Provider(CSP).
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TableContainer component={Paper} sx={{ ml: 0, boxShadow: "none" }}>
            <Table
              sx={{
                minWidth: 600,
                borderCollapse: "separate",
                border: `1px solid ${BORDER_COLOR}`,
                "& .MuiTableCell-root": {
                  border: `1px solid ${BORDER_COLOR} !important`,
                  verticalAlign: "top",
                  padding: "4px 8px",
                  fontSize: COMMON_FONT_SIZE,
                  height: 28,
                  lineHeight: 1.2,
                  textAlign: "center",
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
                    },
                  }}
                >
                  <TableCell rowSpan={2} sx={{ verticalAlign: "middle", fontSize: COMMON_FONT_SIZE }}>
                    Version
                  </TableCell>
                  <TableCell rowSpan={2} sx={{ verticalAlign: "middle", fontSize: COMMON_FONT_SIZE }}>
                    Release Date
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: COMMON_FONT_SIZE }} colSpan={2}>
                    What's New
                  </TableCell>
                  <TableCell rowSpan={2} sx={{ verticalAlign: "middle", fontSize: COMMON_FONT_SIZE }}>
                    Upcoming / What's Next
                  </TableCell>
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
                    },
                  }}
                >
                  <TableCell sx={{ textAlign: "center", fontSize: COMMON_FONT_SIZE }}>Major Features</TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: COMMON_FONT_SIZE }}>Minor Improvements</TableCell>
                  {/* No cell for Upcoming / What's Next in second row, as it's rowspan=2 above */}
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
                        height: 28,
                        padding: "4px 8px",
                        textAlign: "center",
                      },
                    }}
                  >
                    <TableCell sx={{ fontWeight: "bold", fontSize: COMMON_FONT_SIZE }}>
                      {row.version}
                    </TableCell>
                    <TableCell sx={{ fontSize: COMMON_FONT_SIZE }}>{row.releaseDate}</TableCell>
                    <TableCell sx={{ fontSize: COMMON_FONT_SIZE }}>
                      <FeatureList features={row.majorFeatures} />
                    </TableCell>
                    <TableCell sx={{ fontSize: COMMON_FONT_SIZE }}>
                      <FeatureList features={row.minorImprovements} />
                    </TableCell>
                    <TableCell sx={{ fontSize: COMMON_FONT_SIZE }}>
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
          id={"step-two-target"}
          variant="contained"
          color="error"
          onClick={handleClose}
          sx={{ fontSize: COMMON_FONT_SIZE }}
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