import { Box, Container } from "@mui/material";
import React from "react";
import ExploreCards from "./ExploreCards";
import  DarkTypography from "../../common/DarkTypography";
import LightTypography from '../../common/LightTypography'

const ExploreList = [
  {
    imageSrc: "assets/HomeExploreImages/d_hp_buy_xl.webp",
    lightText: "BUY A HOME",
    titleText1: "Find, Buy & Own Your",
    titleText2: "Dream Home",
    sublineText1: "Explore from Apartments, land, builder floors,",
    sublineText2: "villas and more",
    btnText: "Explore Buying",
  },
  {
    imageSrc: "assets/HomeExploreImages/d_hp_rent_xl.webp",
    lightText: "RENT A HOME",
    titleText1: "Rental Homes for",
    titleText2: "Everyone",
    sublineText1: "Explore from Apartments, builder floors, villas",
    sublineText2: "and more",
    btnText: "Explore Renting",
  },
  {
    imageSrc: "assets/HomeExploreImages/d_hp_pl_xl.webp",
    lightText: "BUY PLOTS/LAND",
    titleText1: "Residential &",
    titleText2: "Commercial Plots/Land",
    sublineText1: "Explore Residential, Agricultural, Industrial and",
    sublineText2: "Commercial Plots/Land",
    btnText: "Explore Plots/Land",
  },
  {
    imageSrc: "assets/HomeExploreImages/d_hp_ppf_xl.webp",
    lightText: "POST YOUR PROPERTY",
    titleText1: "Register to post your",
    titleText2: "property for FREE",
    sublineText1: "Sell or rent your residential/ commercial",
    sublineText2: "property",
    btnText: "post your property for FREE",
  },
  {
    imageSrc: "assets/HomeExploreImages/d_hp_pg_xl.webp",
    lightText: "RENT A PG/ CO-LIVING",
    titleText1: "Paying Guest or Co-living",
    titleText2: "options",
    sublineText1: "Explore shared and private rooms in all top",
    sublineText2: "cities of india",
    btnText: "Explore PG/ Co-living",
  },
];

const MiddleSection = () => {
  return (
    <Container
      sx={{
        mt: 5,
        mb: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LightTypography text={"ALL PROPERTY NEEDS - ONE PORTAL"} />
        <DarkTypography
          text1={"Find Better Places to Live, Work"}
          text2={"and Wonder..."}
        />
      </Box>
      {ExploreList.map((item, index) => (
        <React.Fragment key={index}>
          <ExploreCards
            id={index}
            imageSrc={item.imageSrc}
            lightText={item.lightText}
            titleText1={item.titleText1}
            titleText2={item.titleText2}
            sublineText1={item.sublineText1}
            sublineText2={item.sublineText2}
            btnText={item.btnText}
          />
        </React.Fragment>
      ))}
    </Container>
  );
};

export default MiddleSection;
