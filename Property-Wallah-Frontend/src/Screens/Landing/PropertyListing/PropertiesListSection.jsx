import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropertiesListCard from "./PropertiesListCard";
import { fetchAllProperties } from "../../../Redux/PropertySlice";
import PropertyRecommendations from "../../../components/core/PropertyListing/PropertyRecommendations";
// import PropertiesListCard from "./PropertiesListCard";
// import { getFilteredProperties } from "../../../Redux/SearchBoxSlice";


// const properties = [
//   {
//     address: "123 Main St",
//     city: "Sample City",
//     state: "Sample State",
//     price: 2500000,
//     propertyArea: 1200,
//     propertyName: "Sample Property",
//     imageProperty: "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-scaled.jpg",
//     propertyId: "1",
//     contactNo: "1234567890",
//     email: "owner@example.com",
//     propertyOptions: "Rent",
//     propertyType: "Apartment",
//   },
//   {
//     address: "456 Elm St",
//     city: "Example Town",
//     state: "Example State",
//     price: 3200000,
//     propertyArea: 1500,
//     propertyName: "Elm Residences",
//     imageProperty: "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-scaled.jpg",
//     propertyId: "2",
//     contactNo: "9876543210",
//     email: "manager@example.com",
//     propertyOptions: "Sale",
//     propertyType: "Condo",
//   },
//   {
//     address: "789 Oak Ave",
//     city: "Oakville",
//     state: "Sample State",
//     price: 1800000,
//     propertyArea: 900,
//     propertyName: "Oak Apartments",
//     imageProperty: "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-scaled.jpg",
//     propertyId: "3",
//     contactNo: "1122334455",
//     email: "owner@oakexample.com",
//     propertyOptions: "Rent",
//     propertyType: "Apartment",
//   },
//   {
//     address: "321 Pine Blvd",
//     city: "Pine City",
//     state: "Forest State",
//     price: 5000000,
//     propertyArea: 2000,
//     propertyName: "Pine Villas",
//     imageProperty: "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-scaled.jpg",
//     propertyId: "4",
//     contactNo: "9988776655",
//     email: "sales@pinevillas.com",
//     propertyOptions: "Sale",
//     propertyType: "Villa",
//   },
//   {
//     address: "101 Maple Rd",
//     city: "Mapleton",
//     state: "Sample State",
//     price: 2700000,
//     propertyArea: 1300,
//     propertyName: "Maple Estates",
//     imageProperty: "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-scaled.jpg",
//     propertyId: "5",
//     contactNo: "4455667788",
//     email: "maple.estates@example.com",
//     propertyOptions: "Rent",
//     propertyType: "Townhouse",
//   },
//   {
//     address: "12 Birch Ln",
//     city: "Birchfield",
//     state: "Northern State",
//     price: 2200000,
//     propertyArea: 1000,
//     propertyName: "Birch Residences",
//     imageProperty: "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-scaled.jpg",
//     propertyId: "6",
//     contactNo: "5566778899",
//     email: "info@birchresidences.com",
//     propertyOptions: "Rent",
//     propertyType: "Cottage",
//   },
//   {
//     address: "15 Cedar Way",
//     city: "Cedarton",
//     state: "Mountain State",
//     price: 3100000,
//     propertyArea: 1400,
//     propertyName: "Cedar Heights",
//     imageProperty: "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-scaled.jpg",
//     propertyId: "7",
//     contactNo: "3344556677",
//     email: "sales@cedarheights.com",
//     propertyOptions: "Sale",
//     propertyType: "Penthouse",
//   },
//   {
//     address: "20 Willow St",
//     city: "Willowtown",
//     state: "Sample State",
//     price: 2900000,
//     propertyArea: 1250,
//     propertyName: "Willow Gardens",
//     imageProperty: "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-scaled.jpg",
//     propertyId: "8",
//     contactNo: "7788990011",
//     email: "contact@willowgardens.com",
//     propertyOptions: "Rent",
//     propertyType: "Townhouse",
//   },
//   {
//     address: "8 Spruce St",
//     city: "Spruceville",
//     state: "Green State",
//     price: 3500000,
//     propertyArea: 1600,
//     propertyName: "Spruce Mansions",
//     imageProperty: "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-scaled.jpg",
//     propertyId: "9",
//     contactNo: "2233445566",
//     email: "info@sprucemansions.com",
//     propertyOptions: "Sale",
//     propertyType: "Mansion",
//   },
//   {
//     address: "90 Redwood Dr",
//     city: "Redwood City",
//     state: "Southern State",
//     price: 4500000,
//     propertyArea: 2100,
//     propertyName: "Redwood Villas",
//     imageProperty: "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-scaled.jpg",
//     propertyId: "10",
//     contactNo: "1122556688",
//     email: "contact@redwoodvillas.com",
//     propertyOptions: "Sale",
//     propertyType: "Villa",
//   },
//   {
//     address: "78 Cypress Ln",
//     city: "Cypresstown",
//     state: "Eastern State",
//     price: 1900000,
//     propertyArea: 950,
//     propertyName: "Cypress Apartments",
//     imageProperty: "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-scaled.jpg",
//     propertyId: "11",
//     contactNo: "8899776655",
//     email: "support@cypressapts.com",
//     propertyOptions: "Rent",
//     propertyType: "Apartment",
//   },
// ];

const PropertiesListSection = () => {

  const { loading, properties } = useSelector((state) => state.properties);

  const selectedCity = useSelector((state) => state.selectedCity.selectedCity);

  // Example fallback values to avoid undefined errors
  const {
    budgetRange = [0, Infinity],
    propertyType = "All",
    area = [0, Infinity],
    city = { address: "India" },
    isPropertyLoading = false,
  } = useSelector((store) => store.search) || {};

  const [visibleProperties, setVisibleProperties] = useState(10);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProperties());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      setVisibleProperties((prevVisibleProperties) => prevVisibleProperties + 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const filters = {
      minPrice: budgetRange[0],
      maxPrice: budgetRange[1],
      minArea: area[0],
      maxArea: area[1],
      City: city.address || "India",
      PropertyType: propertyType,
    };
    // Uncomment if you are dispatching filters
    // dispatch(getFilteredProperties(filters));
  }, [budgetRange, area, city, propertyType, dispatch]);

  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        sx={{
          fontSize: "20px",
          lineHeight: "28px",
          fontWeight: 600,
          color: "#091E42",
        }}
      >
        {properties?.length || 0} results | Properties for {selectedCity || "India"}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        properties && properties.slice(0, visibleProperties).map((property, index) => (
          <React.Fragment key={index}>
            {index===3 &&
            <Box sx={{mb: 5}}>
              
            </Box>}
            <PropertiesListCard property={property} index={index} />
          </React.Fragment>
        ))
      )}
    </Box>
  );
};

export default PropertiesListSection;