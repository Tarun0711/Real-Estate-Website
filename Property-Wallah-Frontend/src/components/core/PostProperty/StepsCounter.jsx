import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const StepsCounter = ({ currentStep }) => {
  const steps = ["Basic Details", "Location Details", "Property Profile", "Photos & Videos",'Pricing Details'    , "Amenities Section"];

  return (
    <Box sx={{ width: '100%',position: 'fixed', top: '0%', left: '0',background:'white', zIndex: '1000' , padding: '10px'}}>
      <Stepper activeStep={currentStep - 1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

StepsCounter.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default StepsCounter;
