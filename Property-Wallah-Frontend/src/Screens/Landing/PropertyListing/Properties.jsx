import { Box, Breadcrumbs, Container, Grid, Link } from "@mui/material";
import React from "react";
import {Navbar} from '../../../components/common/Navbar';
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import StraightSharpIcon from "@mui/icons-material/StraightSharp";
import PropertiesListSection from "./PropertiesListSection";
import FiltersSection from "../../../components/core/PropertyListing/FilterSection";
import Footer from "../../../components/core/LandingPage/Footer";




function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 300,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 40,
          right: 100,
        }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Properties = (props) => {
  const navigate = useNavigate();

  const breadcrumbs = [
    <Link
      key="1"
      color="#8993A4"
      onClick={() => navigate("/")}
      sx={{
        cursor: "pointer",
        textDecoration: "none",
        ":hover": {
          color: "#8993A4",
        },
        fontSize: "12px",
              }}
    >
      Home
    </Link>,
    <Link
      key="1"
      color="#8993A4"
      sx={{
        cursor: "pointer",
        textDecoration: "none",
        ":hover": {
          color: "#8993A4",
        },
        fontSize: "12px",
              }}
    >
      Properties
    </Link>,
  ];

  return (
    <>
      <Box sx={{ background: "#f4f5f7", minHeight: "100vh" }}>
        <Navbar isHome={true} openModal={() => navigate("/")} />
        <Container sx={{ paddingTop: 0.5 }}>
          <Breadcrumbs
            id="back-to-top-anchor"
            separator="›"
            aria-label="breadcrumb"
            sx={{ mt: 9, ml: 1 }}
          >
            {breadcrumbs}
          </Breadcrumbs>
          <Grid container sx={{position:"relative"}} spacing={2}>
            <Grid item md={3.5} >
               <FiltersSection /> 
            </Grid>
            {/* <Grid item md={0.2}>
              
            </Grid> */}
            <Grid item md={8.5} >
              <PropertiesListSection/>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <ScrollTop {...props}>
        <Fab
          disableRipple
          size="small"
          aria-label="scroll back to top"
          sx={{
            background: "#D6EFFF",
            ":hover": { background: "#D6EFFF" },
            boxShadow: "none",
            padding: "25px",
          }}
        >
          <StraightSharpIcon sx={{ color: "#0078db", fontSize: "20px" }} />
        </Fab>
      </ScrollTop>
      <Footer/>
    </>
  );
};

export default Properties;
