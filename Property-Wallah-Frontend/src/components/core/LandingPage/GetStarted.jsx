import {
    Box,
    Container,
    IconButton,
    Paper,
    Typography,
  } from "@mui/material";
  import React from "react";
  import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
  import { useNavigate } from "react-router-dom";
  import { useSelector } from "react-redux";
  import { useSnackbar } from "notistack";
import CarouselComponent from "../../common/CarouselComponent";
  
  const GetStarted = ({ openModal }) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
  
    const handleClick = () => {
        navigate("/polotno-editor");
    };
  
    return (
      <Container sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Typography>GET STARTED WITH EXPLORING REAL ESTATE OPTIONS</Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <CarouselComponent />
        </Box>
      </Container>
    );
  };
  
  export default GetStarted;
  