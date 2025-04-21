import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { closeSearchModal } from "../../../Redux/SearchModalSlice";
import { Button, Divider, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { setSelectedCity } from "../../../Redux/SelectedCity";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "60px",
  left: "30px",
  width: "680px",
  height: "442px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  // Responsive design
  '@media (max-width: 1024px)': {
    width: '90%',
    height: 'auto',
    top: '10%',
    left: '5%',
  },
  '@media (max-width: 600px)': {
    width: '100%',
    height: 'auto',
    top: '5%',
    left: '0',
  },
};

const optionButtons = ["Buy", "Rent / Lease", "Plots/Land", "PG / Co-living"];

export default function SearchModal() {
  const { open } = useSelector((store) => store.searchModal);
  const { properties } = useSelector((state) => state.properties);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => dispatch(closeSearchModal());

  const [suggestions, setSuggestions] = useState([]);
  const [searchOption, setSearchOption] = useState(optionButtons[0]);
  const [city, setCity] = useState("All World");

  useEffect(() => {
    if (properties && properties.length > 0) {
      // Extract unique cities from properties
      const uniqueCities = [
        ...new Set(properties.map((property) => property.location.state)),
      ];
      setSuggestions(uniqueCities);
    }
  }, [properties]); // Trigger when properties change

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              sx={{
                color: "#041533",
                fontWeight: 700,
                lineHeight: "48px",
                fontSize: { xs: "24px", md: "32px" }, // Responsive typography
              }}
              className="md:text-2xl font-bold"
            >
              Explore real estate in...
            </Typography>
            <Box sx={{ overflowY: "auto", display: "flex", mt: 4, gap: 3,minWidth:300 }}>
              {optionButtons.map((btn, index) => (
                <Button
                  key={index}
                  onClick={() => setSearchOption(btn)}
                  disableRipple
                  sx={{
                    textTransform: "capitalize",
                    color: searchOption === btn ? "#000" : "#8993A4",
                    fontSize: "14px",
                    fontWeight: 400,
                    borderBottom:
                      searchOption === btn
                        ? "3px solid #005CA8"
                        : "3px solid #fff",
                    borderRadius: 0,
                    ":hover": {
                      background: "#fff",
                    },
                    paddingBottom: 2,
                  }}
                >
                  {btn}
                </Button>
              ))}
            </Box>
            <Box
              sx={{

                boxShadow: "0 3px 8px 0 rgba(0,106,194,0.2)",
                borderRadius: 1,
                mt: 3,
                // flexWrap: "wrap",
              }}
              className="flex md:flex-row flex-col"
            >
              <Box sx={{ p: "13px 10px 13px 13px" }}>
                <Typography
                  sx={{
                    color: "#253858",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                  }}
                >
                  Residential
                </Typography>
              </Box>
              <Divider
                orientation="vertical"
                sx={{ background: "rgba(0,0,0,0.08)", ml: 2 }}
              />
              <Autocomplete
                value={city}
                onChange={(event, newValue) => {
                  setCity(newValue);
                  if (newValue) {
                    dispatch(setSelectedCity(newValue));
                  }
                }}
                id="free-solo-with-text-demo"
                options={suggestions}
                sx={{ width: { xs: "100%", sm: "70%" } }} // Make Autocomplete field responsive
                freeSolo
                noOptionsText="No city found"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    sx={{
                      ml: 2,
                      width: "95%",
                      fontFamily: "Open Sans",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                    placeholder='Search City (e.g., "Noida")'
                  />
                )}
              />
              <Divider
                orientation="vertical"
                sx={{ background: "rgba(0,0,0,0.08)", ml: 2 }}
              />
              <Box sx={{ p: "16px" }}>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: 700,
                    width: { xs: "100%", sm: "auto" }, // Make button width responsive
                  }}
                  onClick={() => navigate('/properties')}
                >
                  Explore
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
