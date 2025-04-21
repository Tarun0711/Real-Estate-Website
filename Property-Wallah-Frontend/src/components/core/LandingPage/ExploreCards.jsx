import React from "react";
import { Box, Button, Typography } from "@mui/material";
import DarkTypography from "../../common/DarkTypography";
import LightTypography from "../../common/LightTypography";
import EastIcon from "@mui/icons-material/East";
import { useDispatch } from "react-redux";
import { openSearchModal } from "../../../Redux/SearchModalSlice";
import { useNavigate } from "react-router-dom";

const ExploreCards = ({
  id,
  imageSrc,
  lightText,
  titleText1,
  titleText2,
  sublineText1,
  sublineText2,
  btnText,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      {id === 3 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
            textAlign: "center",
          }}
        >
          <LightTypography text={"ARE YOU AN OWNER?"} />
          <DarkTypography
            text1={"Sell or Rent your property faster"}
            text2={"with Property Wallah"}
          />
        </Box>
      )}
      {id === 4 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              mt: 1,
              color: "#041533",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "28px",
            }}
          >
            Our services for owners
          </Typography>
          <Typography
            sx={{
              mt: 1,
              color: "#42526E",
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: "20px",
            }}
          >
            Make your life easier with our services
          </Typography>
          <Box
            sx={{
              minHeight: "200px",
              minWidth: "100%",
              maxWidth: "512px",
              background: "#fff5e4",
              mt: 2,
              borderRadius: "8px",
              p: { xs: 2, sm: 3, md: 4 },
              textAlign: "left",
            }}
          >
            <Box>
              <img
                src="assets/d_hp_owner_assist_benefits.webp"
                alt="assistImage"
                style={{
                  width: "100%",
                  maxWidth: "150px",
                }}
              />
              <Typography
                sx={{
                  mt: 3,
                  color: "#041533",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "28px",
                }}
              >
                Get assistance in selling faster
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  color: "#8993A4",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Dedicated Relationship manager to help you sell your property
                faster
              </Typography>
              <Button
                disableRipple
                onClick={() => navigate("/subscription")}
                sx={{
                  textTransform: "none",
                  color: "#0078DB",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "20px",
                  mt: 1,
                  display: "flex",
                }}
              >
                Explore now
                <EastIcon sx={{ ml: 1 }} />
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ overflow: "hidden", borderRadius: 2, flex: 1 }}>
          <img
            src={imageSrc}
            alt="exploreImage"
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box sx={{ ml: { sm: 4, xs: 0 }, mt: { xs: 3, sm: 0 }, flex: 1 }}>
          <LightTypography text={lightText} />
          <Typography
            sx={{
              mt: 1,
              color: "#091E42",
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "32px",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {titleText1} <br /> {titleText2}
          </Typography>
          <Typography
            sx={{
              mt: 1,
              color: "#42526E",
              fontSize: "16px",
              fontWeight: 400,
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {sublineText1} <br /> {sublineText2}
          </Typography>
          <Button
            onClick={
              btnText === "post your property for FREE"
                ? () => navigate("/postproperty")
                : () => dispatch(openSearchModal())
            }
            disableRipple
            sx={{
              mt: 3,
              background: "#0078DB",
              padding: "12px 16px",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 700,
              color: "#fff",
              textTransform: "capitalize",
              ":hover": {
                background: "#006AC2",
              },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {btnText}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ExploreCards;
