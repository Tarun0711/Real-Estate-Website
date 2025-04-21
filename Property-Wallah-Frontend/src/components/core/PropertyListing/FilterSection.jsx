import {
    Box,
    Chip,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    Paper,
    Slider,
    Switch,
  } from "@mui/material";
  import React from "react";
  import Accordion from "@mui/material/Accordion";
  import AccordionSummary from "@mui/material/AccordionSummary";
  import AccordionDetails from "@mui/material/AccordionDetails";
  import Typography from "@mui/material/Typography";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import { useDispatch, useSelector } from "react-redux";
  import {
    handleArea,
    handleBudgetRange,
    handleChange,
    handleNoOfBedrooms,
    handlePropertyType,
    handleWithPhotos,
  } from "../../../Redux/SearchBoxSlice";
  import DoneIcon from "@mui/icons-material/Done";
  import AddIcon from "@mui/icons-material/Add";
  
  const noOfBedroomsList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const propertyTypeList = ["Flat/Apartment", "Independent House", "Villa","Independent/Builder Floor","Plot/Land","1 RK/Studio Apartment","Farm House","Service Apartment"];
 


  function valuetext(value) {
    return `${value}`;
  }
  
  const FiltersSection = () => {
    const {
      budgetRange,
      noOfBedrooms,
      propertyType,
      area,
      withPhotos,
      expanded,
    } = useSelector((store) => store.search);
    const dispatch = useDispatch();
  
    return (
      <>
        <Paper variant="outlined" sx={{ padding: "24px 20px",borderRadius: 2 }}>
          <Box>
            <Accordion
              expanded={expanded.includes("panel1") ? true : false}
              onChange={() => dispatch(handleChange("panel1"))}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ mb: 1 }}
              >
                <Typography
                  sx={{
                    color: "#091E42",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 600,
                    fontFamily: "Open Sans",
                  }}
                >
                  Budget
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Slider
                  getAriaLabel={() => "Budget range"}
                  onChange={(e, newValue) =>
                    dispatch(handleBudgetRange(newValue))
                  }
                  value={budgetRange}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="on"
                  min={0}
                  max={200000}
                  step={10000}
                  sx={{
                    mt: 2,
                    width: "92%",
                    height: "2px",
                    padding: "13px 0",
                    "& .MuiSlider-thumb": {
                      height: 12.25,
                      width: 12.25,
                    },
                    "& .MuiSlider-track": {
                      height: "2px",
                    },
                    "& .MuiSlider-valueLabel": {
                      backgroundColor: "#091E42",
                      borderRadius: 1,
                    },
                  }}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded.includes("panel2") ? true : false}
              onChange={() => dispatch(handleChange("panel2"))}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{ mb: 1 }}
              >
                <Typography
                  sx={{
                    color: "#091E42",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 600,
                    fontFamily: "Open Sans",
                    paddingTop: 1,
                  }}
                >
                  No. of Bedrooms
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "grid",
                  gap: 1,
                  gridTemplateColumns: "repeat(3, 1fr)",
                }}
              >
                {noOfBedroomsList.map((room, idx) => (
                  <Chip
                    key={idx}
                    label={`${room} BHK`}
                    disableRipple
                    variant={"outlined"}
                    icon={
                      noOfBedrooms.includes(room) ? <DoneIcon /> : <AddIcon />
                    }
                    onClick={() => dispatch(handleNoOfBedrooms(room))}
                    sx={{
                      color: noOfBedrooms.includes(room) ? "#000" : "#42526E",
                      backgroundColor: noOfBedrooms.includes(room)
                        ? "#f0f9ff"
                        : "#fff",
                      borderColor: noOfBedrooms.includes(room)
                        ? "#a3daff"
                        : "#42526E",
                      fontWeight: noOfBedrooms.includes(room) ? 600 : 400,
                      "& .MuiChip-icon": {
                        fontFamily: "Open Sans",
                        fontSize: "14px",
                        color: noOfBedrooms.includes(room)
                          ? "#0078db"
                          : "#42526E",
                      },
                    }}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded.includes("panel3") ? true : false}
              onChange={() => dispatch(handleChange("panel3"))}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
                sx={{ mb: 1 }}
              >
                <Typography
                  sx={{
                    color: "#091E42",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 600,
                    fontFamily: "Open Sans",
                    paddingTop: 1,
                  }}
                >
                  Type of Property
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {propertyTypeList.map((type, idx) => (
                  <Chip
                    key={idx}
                    label={type}
                    disableRipple
                    variant={"outlined"}
                    icon={
                      propertyType.includes(type) ? <DoneIcon /> : <AddIcon />
                    }
                    onClick={() => dispatch(handlePropertyType(type))}
                    sx={{
                      color: propertyType.includes(type) ? "#000" : "#42526E",
                      backgroundColor: propertyType.includes(type)
                        ? "#f0f9ff"
                        : "#fff",
                      borderColor: propertyType.includes(type)
                        ? "#a3daff"
                        : "#42526E",
                      fontWeight: propertyType.includes(type) ? 600 : 400,
                      "& .MuiChip-icon": {
                        fontFamily: "Open Sans",
                        fontSize: "14px",
                        color: propertyType.includes(type)
                          ? "#0078db"
                          : "#42526E",
                      },
                      mb: 1,
                    }}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded.includes("panel4") ? true : false}
              onChange={() => dispatch(handleChange("panel4"))}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4a-content"
                id="panel4a-header"
                sx={{ mb: 1 }}
              >
                <Typography
                  sx={{
                    color: "#091E42",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 600,
                    fontFamily: "Open Sans",
                    paddingTop: 1,
                  }}
                >
                  Area
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Slider
                  getAriaLabel={() => "Area range"}
                  onChange={(e, newValue) => dispatch(handleArea(newValue))}
                  value={area}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="on"
                  min={0}
                  max={4000}
                  step={100}
                  sx={{
                    mt: 2,
                    width: "92%",
                    height: "2px",
                    padding: "13px 0",
                    "& .MuiSlider-thumb": {
                      height: 12.25,
                      width: 12.25,
                    },
                    "& .MuiSlider-track": {
                      height: "2px",
                    },
                    "& .MuiSlider-valueLabel": {
                      backgroundColor: "#091E42",
                      borderRadius: 1,
                    },
                  }}
                />
              </AccordionDetails>
            </Accordion>
          </Box>
          <Divider />
          <FormControl component="fieldset" sx={{ mt: 2, width: "100%" }}>
            <FormGroup aria-label="position" sx={{ width: "100%" }}>
              <FormControlLabel
                value="start"
                checked={withPhotos}
                onChange={() => dispatch(handleWithPhotos())}
                control={<Switch color="primary" />}
                label={
                  <Typography
                    sx={{
                      color: "#091E42",
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 600,
                      fontFamily: "Open Sans",
                    }}
                  >
                    Properties with photos
                  </Typography>
                }
                labelPlacement="start"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mr: 1,
                }}
              />
            </FormGroup>
          </FormControl>
        </Paper>
      </>
    );
  };
  
  export default FiltersSection;