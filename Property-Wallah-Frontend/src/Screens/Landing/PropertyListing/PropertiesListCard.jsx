import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import ContactOwner from "./ContactOwner";
import { formatDate } from "../../../utils/DateFormater";
import { handleFavoriteToggle } from "../../../utils/FavouriteToggle";

const PropertiesListCard = ({ property }) => {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [bhk, setBhk] = useState();

  const navigate = useNavigate();
  const { pwUser } = useSelector((state) => state.profile);
  const { enqueueSnackbar } = useSnackbar();

  const {
    address = "",
    city = "",
    state = "",
    price = 0,
    propertyArea = 0,
    propertyImage = property?.media?.images?.[0] || 
      "http://www.c21bowman.com/listings/ajax.rsp?_action=photo&uid=123076134&id=22578913",
    propertyName = property.title,
    propertyId = property._id,
    contactNo = "",
    email = "",
  } = property || {};

  const postedDate = formatDate(property.updatedAt);

  useEffect(() => {
    const bhkCalculator = (area) => {
      if (area < 750) return 1;
      if (area < 1500) return 2;
      if (area < 2500) return 3;
      if (area < 4000) return 4;
      if (area < 5400) return 5;
      if (area < 7000) return 6;
      return 7;
    };
    setBhk(bhkCalculator(propertyArea));
  }, [propertyArea]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsFavorite(wishlist.some((item) => item._id === propertyId));
  }, [propertyId]);

  const handleNavigation = () => {
    // pwUser
       navigate(`/properties/${propertyName}/${propertyId}`)
      // : enqueueSnackbar("Login to explore property", { variant: "warning" });
  };

  const handleContactOwner = () => {
    pwUser
      ? setContactOpen(true)
      : enqueueSnackbar("Login to view owner details", { variant: "warning" });
  };

  return (
    <>
      <ContactOwner
        open={contactOpen}
        email={pwUser?.email}
        setOpen={setContactOpen}
      />

      <Paper
        elevation={1}
        sx={{
          mt: 2,
          p: 2,
          gap: 2,
          borderRadius: 2,
          boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
        className="md:flex"
      >
        {/* Left Section: Property Image */}
        <Box sx={{ flex: "0 0 300px", position: "relative" }}>
          <img
            src={propertyImage}
            alt="Property"
            loading="lazy"
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: "#fff",
              borderRadius: "16px",
              px: 1,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <VerifiedIcon color="success" fontSize="small" />
            <Typography variant="caption" color="textSecondary">
              Verified
            </Typography>
          </Box>
        </Box>

        {/* Right Section: Property Details */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography
            onClick={handleNavigation}
            sx={{ fontSize: "16px", fontWeight: 600, cursor: "pointer" }}
          >
            {propertyName}
          </Typography>
          <Typography
                      onClick={handleNavigation}

            sx={{ fontSize: "16px", fontWeight: 300, cursor: "pointer" }}
          >
            {property.propertyProfile.bedrooms} BHK {property.subCategory} in{" "}
            {property.location.state},{property.location.city}
          </Typography>
          <Typography
            sx={{ mt: 1, fontSize: "14px", color: "#555", fontWeight: 500 }}
          >
            ₹{(property.rentDetails.expectedRent / 10000).toFixed(2)} LKH ||{" "}
            {propertyArea} sqft | {property.isFinished ? ('Ready To Move'):('Under Construction')}
          </Typography>

          {/* Highlights */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {property.otherFeatures.slice(0, 3).map((item, index) => (
              <Box
                key={index}
                sx={{
                  fontSize: "12px",
                  color: "#777",
                  background: "#f0f0f0",
                  p: 0.5,
                  borderRadius: "4px",
                }}
              >
                {item}
              </Box>
            ))}
            {property.otherFeatures.length > 3 && (
              <Box
                sx={{
                  fontSize: "12px",
                  color: "#777",
                  background: "#f0f0f0",
                  p: 0.5,
                  borderRadius: "4px",
                }}
              >
                +{property.otherFeatures.length - 3} more
              </Box>
            )}
          </Box>

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
            }}
          >
            <IconButton
              size="small"
              sx={{
                color: isFavorite ? "red" : "#777",
                backgroundColor: isFavorite
                  ? "rgba(255, 0, 0, 0.1)"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isFavorite
                    ? "rgba(255, 0, 0, 0.2)"
                    : "rgba(0, 0, 0, 0.04)",
                },
              }}
              onClick={() => handleFavoriteToggle(property, isFavorite, setIsFavorite, enqueueSnackbar)}
            >
              <FavoriteBorderIcon />
            </IconButton>
            <Box>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpen(true)}
                sx={{ textTransform: "none", mr: 1 }}
              >
                View Number
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleContactOwner}
                sx={{ textTransform: "none" }}
              >
                Contact Owner
              </Button>
            </Box>
          </Box>
          <Typography sx={{ fontSize: "12px", color: "#888", mt: 1 }}>
            Posted on {postedDate}
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default PropertiesListCard;
