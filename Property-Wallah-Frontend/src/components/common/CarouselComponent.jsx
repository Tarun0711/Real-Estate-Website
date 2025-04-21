import { Box, Typography } from "@mui/material";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch } from "react-redux";
import { openSearchModal } from "../../Redux/SearchModalSlice";
const carouselCards = [
  {
    src: "/assets/HomeCarouselImages/d_hp_buy.webp",
    text: "Buying a home",
  },
  {
    src: "/assets/HomeCarouselImages/d_hp_rent.webp",
    text: "Renting a home",
  },
  {
    src: "/assets/HomeCarouselImages/d_hp_invest_new.png",
    text: "Invest in Real Estate",
  },
  {
    src: "/assets/HomeCarouselImages/d_hp_ppf.webp",
    text: "Sell/Rent your property",
  },
  {
    src: "/assets/HomeCarouselImages/d_hp_plot_land.webp",
    text: "Plots/Land",
  },
  {
    src: "/assets/HomeCarouselImages/d_hp_pg.webp",
    text: "PG and co-living",
  },
  {
    src: "/assets/HomeCarouselImages/d_hp_com_buy.webp",
    text: "Buying commercial spaces",
  },
  {
    src: "/assets/HomeCarouselImages/d_hp_com_lease.webp",
    text: "Lease commercial spaces",
  },
];

const CarouselComponent = () => {
  const dispatch = useDispatch();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <Carousel responsive={responsive}>
      {carouselCards.map((card, index) => (
        <Box key={index}>
          <img
            onClick={() => dispatch(openSearchModal())}
            src={card.src}
            alt="carouselPhoto"
            style={{
              maxWidth: "180px",
              marginRight:'20px',
              cursor: "pointer",
            }}
          />
          <Typography
            sx={{
                            color: "#253858",
              fontSize: "14px",
              fontWeight: 600,
              mt: 1,
            }}
          >
            {card.text}
          </Typography>
        </Box>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
