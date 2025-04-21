import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const filter = createFilterOptions();

const optionButtons = [
  "Buy",
  "Rent",
  "PG / Co-living",
  "Commercial",
  "Coworking",
  "Plots/Land",
  "Projects",
];

const SearchBox = () => {
  const { properties } = useSelector((state) => state.properties);

  const [value, setValue] = useState("");
  const [city, setCity] = useState("");
  const [searchOption, setSearchOption] = useState(optionButtons[0]);
  const [suggestions, setSuggestions] = useState([]); 
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();



  useEffect(() => {
    if (properties) {
      const formattedSuggestions = properties.map((property) => ({
        title: property.title,
        city: property.location.city,
        state: property.location.state,
        id: property._id,
      }));
      setSuggestions(formattedSuggestions);
      console.log(formattedSuggestions);
    }
  }, [properties]);

  const handleSearchClick = () => {
    if (!value.trim() || !city.trim()) {
      enqueueSnackbar("Enter a valid city for search", {
        variant: "warning",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
      return;
    }
    navigate("/properties");
  };

  const handleSelection = (newValue) => {
    if (newValue?.id) {
      navigate(`/properties/${newValue.title}/${newValue.id}`); // Navigate to property details
    } else if (newValue?.city || newValue?.state) {
      navigate(`/properties?location=${newValue.city || newValue.state}`); // Navigate to city/state results
    }
  };

  return (
    <Paper
      elevation={5}
      className="md:w-[60%] w-[100%]"
      sx={{
        background: "#fff",
        borderRadius: "15px",
        position: "absolute",
        bottom: 0,
        padding: "16px 0 0",
      }}
    >
      {/* Search Options */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: "20px",
          alignItems: "center",
          padding: "16px 0 0",
          mx:4,
          overflowY: "auto",
        }}
      >
        {optionButtons.map((btn, index) => (
          <Button
            key={index}
            disableRipple
            onClick={() => setSearchOption(btn)}
            sx={{
              textTransform: "capitalize",
              color: searchOption === btn ? "#000" : "#42526E",
              fontWeight: 600,
              borderBottom: searchOption === btn ? "3px solid #005CA8" : "3px solid transparent",
              borderRadius: 0,
              paddingBottom: 2,
              ":hover": { background: "#fff" },
            }}
          >
            {btn}
          </Button>
        ))}
      </Box>
      <Divider sx={{ background: "rgba(0,0,0,0.08)" }} />

      {/* Search Bar */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ padding: "16px 10px 16px 16px" }}>
          <Typography sx={{ color: "#42526E", fontSize: "14px", fontWeight: 600 }}>
            All Residential
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ background: "rgba(0,0,0,0.08)", ml: 2 }} />
        <Autocomplete
          value={city}
          onChange={(event, newValue) => {
            setCity(newValue?.city || "");
            handleSelection(newValue);
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            const { inputValue } = params;
            const isExisting = options.map(
              (option) => inputValue === option.city || inputValue === option.title
            );

            if (inputValue && !isExisting) {
              filtered.push({ inputValue, address: `No data found` });
            }
            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="search-autocomplete"
          options={suggestions}
          getOptionLabel={(option) =>
            typeof option === "string"
              ? option
              : option.inputValue || option.title || `${option.city}, ${option.state}` || ""
          }
          renderOption={(props, option) => (
            <li {...props}>{option.title || `${option.city}, ${option.state}`}</li>
          )}
          sx={{ width: "70%" }}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              sx={{ ml: 2, width: "95%" }}
              placeholder={'Search City or Property'}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        />
        <Box sx={{ padding: "16px" }}>
          <Button
            onClick={handleSearchClick}
            variant="contained"
            sx={{ textTransform: "capitalize", fontWeight: 700 }}
          >
            Search
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default SearchBox;
