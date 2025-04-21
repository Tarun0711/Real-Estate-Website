import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  p: 4,
};

export default function ContactModal({
  open,
  setOpen,
  contactNo,
  email,
  propertyName,
  price,
  propertyArea,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ "& .MuiBackdrop-root": { backgroundColor: "rgba(0,0,0,0.9)" } }}
      >
        <Box sx={style}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              fontFamily: "Open Sans",
              color: "#fff",
            }}
          >
            You are requesting to view advertiser details.
          </Typography>
          <Box sx={{ background: "#fff", mt: 2, p: 3 }}>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "Open Sans",
                color: "#333333",
              }}
            >
              POSTED BY DEALER:
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ mt: 1 }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily: "Open Sans",
                    color: "#666666",
                  }}
                >
                  {contactNo} | {email}
                </Typography>
              </Box>
              <Box sx={{ mr: 5 }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily: "Open Sans",
                    color: "#666666",
                  }}
                >
                  ₹
                  {price >= 1000000
                    ? (price / 1000000).toFixed(1) + "L"
                    : price >= 1000
                    ? (price / 1000).toFixed(1) + "K"
                    : price.toString()}{" "}
                  | {propertyName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "10px",
                    fontWeight: 600,
                    fontFamily: "Open Sans",
                    color: "#666666",
                  }}
                >
                  {propertyArea} sq.ft. | 3 BHK RESIDENTIAL APARTMENT
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}