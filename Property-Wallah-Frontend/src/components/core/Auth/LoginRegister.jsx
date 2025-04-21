import React, { useState, useEffect, useMemo } from "react";
import { Modal, Box, Button, TextField, Typography, IconButton, CircularProgress } from "@mui/material";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { sendOtp, verifyOtp } from "../../../Services/Operations/AuthServices";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  width: "500px",
};

const LoginModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSubmitting, setOtpSubmitting] = useState(false);
  const [otpError, setOtpError] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const memoizedIsLoggedIn = useMemo(() => isLoggedIn, [isLoggedIn]);

  useEffect(() => {
    if (memoizedIsLoggedIn) {
      handleClose();
    }
  }, [memoizedIsLoggedIn, handleClose]);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailSubmit = () => {
    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    if (email === originalEmail) {
      setOtpSent(true);
      setLoading(false);
    } else {
      dispatch(sendOtp(email))
        .then(() => {
          setOriginalEmail(email);
          setOtpSent(true);
          setCanResend(false);
          setTimer(120);
          setLoading(false);
        })
        .catch(() => {
          setErrorMessage("Failed to send OTP. Please try again.");
          setLoading(false);
        });
    }
  };

  const handleOtpChange = (value) => {
    setOtp(value);
    if (value.length === 6) handleOtpSubmit();
  };

  const handleOtpSubmit = () => {
    if (otp.length !== 6) {
      setErrorMessage("Please enter a 6-digit OTP.");
      return;
    }
    setOtpSubmitting(true);
    dispatch(verifyOtp(email, otp))
      .then(() => {
        setOtpError(false);
        resetState();
        handleClose();
      })
      .catch(() => {
        setOtpError(true);
        setErrorMessage("Invalid OTP. Please try again.");
        setOtpSubmitting(false);
      });
  };

  const resetState = () => {
    setOtp("");
    setOtpSent(false);
    setErrorMessage("")
    setEmail("");
    setOriginalEmail("");
    setTimer(120);
    setCanResend(false);
    setOtpSubmitting(false);
    setLoading(false);
  };

  useEffect(() => {
    let interval = null;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, otpSent]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const handleEditEmail = () => {
    setOtpSent(false);
    setOtp("");
    
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="login-modal-title">
      <Box sx={style}>
        <Typography id="login-modal-title" variant="h4">
          {otpSent ? "Enter OTP" : "Login / Register"}
        </Typography>
        <Typography sx={{ marginTop: 2, marginBottom: 4 }}>
          {otpSent ? "Enter the 6-digit code sent to your email." : "Enter your email address to login. We will send a one-time code to your email."}
        </Typography>

        {!otpSent ? (
          <Box>
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mt: 2 }}
              error={!!errorMessage}
              helperText={errorMessage}
              disabled={loading}
            />
            <Button
              sx={{ marginTop: 4 }}
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleEmailSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Continue"}
            </Button>
            <Typography variant="body2" sx={{ marginTop: 3 }}>
              By continuing, you agree to our{" "}
              <Link to="/terms" className="text-blue-400" target="_blank">
                Terms & Conditions
              </Link>
            </Typography>
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="body1">{email}</Typography>
              <IconButton onClick={handleEditEmail} disabled={otpSubmitting || loading}>
                <EditIcon />
              </IconButton>
            </Box>

            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    border: otpError ? "2px solid red" : "2px solid transparent",
                  }}
                  className="w-[38px] lg:w-[60px] bg-blue-100 rounded-[0.5rem] text-primary aspect-square text-center focus:outline-2 focus:outline-blue-200"
                  disabled={otpSubmitting}
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            {errorMessage && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {errorMessage}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleOtpSubmit}
              disabled={otpSubmitting}
            >
              {otpSubmitting ? <CircularProgress size={24} /> : "Submit OTP"}
            </Button>

            <Typography variant="body2" sx={{ marginTop: 3 }}>
              {canResend ? (
                <Button variant="text" onClick={handleEmailSubmit}>
                  Resend OTP
                </Button>
              ) : (
                `Resend OTP in ${formatTime(timer)}`
              )}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              By continuing, you agree to our{" "}
              <Link to="/terms" className="text-blue-400" target="_blank">
                Terms & Conditions
              </Link>
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default LoginModal;
