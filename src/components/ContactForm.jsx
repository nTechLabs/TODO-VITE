import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormLabel,
  RadioGroup,
  Radio,
  Chip,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  Send,
  CheckCircle,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import interestOptions from "../values/interestOptions";

const ContactForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [contactFormData, setContactFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: null,
    gender: "",
    interests: [],
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // const interestOptions = [
  //   "Technology",
  //   "Business",
  //   "Design",
  //   "Marketing",
  //   "Education",
  //   "Healthcare",
  //   "Finance",
  //   "Entertainment",
  //   "Sports",
  //   "Travel",
  // ];

  const handleInputChange = (field) => (event) => {
    setContactFormData({
      ...contactFormData,
      [field]: event.target.value,
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const handleInterestChange = (interest) => {
    const updatedInterests = contactFormData.interests.includes(interest)
      ? contactFormData.interests.filter((item) => item !== interest)
      : [...contactFormData.interests, interest];

    setContactFormData({
      ...contactFormData,
      interests: updatedInterests,
    });
  };

  const handleDateChange = (date) => {
    setContactFormData({
      ...contactFormData,
      dateOfBirth: date,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!contactFormData.fullName.trim())
      newErrors.fullName = "Full name is required";
    if (!contactFormData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(contactFormData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!contactFormData.phone.trim())
      newErrors.phone = "Phone number is required";
    if (!contactFormData.address.trim())
      newErrors.address = "Address is required";
    if (!contactFormData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!contactFormData.gender) newErrors.gender = "Gender is required";
    if (contactFormData.interests.length === 0)
      newErrors.interests = "Please select at least one interest";
    if (!contactFormData.message.trim())
      newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", contactFormData);
      setShowSuccess(true);
      // Reset form
      setContactFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        dateOfBirth: null,
        gender: "",
        interests: [],
        message: "",
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 2,
              }}
            >
              Get In Touch
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 400,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Fill out the form below and we'll get back to you as soon as
              possible. We value your privacy and will never share your
              information.
            </Typography>
          </Box>

          <Card
            elevation={0}
            sx={{
              maxWidth: 800,
              mx: "auto",
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Full Name */}
                  <Grid>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={contactFormData.fullName}
                      onChange={handleInputChange("fullName")}
                      error={!!errors.fullName}
                      helperText={errors.fullName}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Email */}
                  <Grid>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={contactFormData.email}
                      onChange={handleInputChange("email")}
                      error={!!errors.email}
                      helperText={errors.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Phone */}
                  <Grid>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={contactFormData.phone}
                      onChange={handleInputChange("phone")}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Date of Birth */}
                  <Grid>
                    <DatePicker
                      label="Date of Birth"
                      value={contactFormData.dateOfBirth}
                      onChange={handleDateChange}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.dateOfBirth,
                          helperText: errors.dateOfBirth,
                          InputProps: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <CalendarToday />
                              </InputAdornment>
                            ),
                          },
                        },
                      }}
                    />
                  </Grid>

                  {/* Address */}
                  <Grid>
                    <TextField
                      fullWidth
                      label="Address"
                      multiline
                      rows={2}
                      value={contactFormData.address}
                      onChange={handleInputChange("address")}
                      error={!!errors.address}
                      helperText={errors.address}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ alignSelf: "flex-start", mt: 1 }}
                          >
                            <LocationOn color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* Gender */}
                  <Grid>
                    <FormControl fullWidth error={!!errors.gender}>
                      <FormLabel
                        component="legend"
                        sx={{ mb: 1, color: theme.palette.text.primary }}
                      >
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        value={contactFormData.gender}
                        onChange={handleInputChange("gender")}
                      >
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                      {errors.gender && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 1 }}
                        >
                          {errors.gender}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Interests */}
                  <Grid>
                    <FormControl fullWidth error={!!errors.interests}>
                      <FormLabel
                        component="legend"
                        sx={{ mb: 2, color: theme.palette.text.primary }}
                      >
                        Interests (Select all that apply)
                      </FormLabel>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {interestOptions.map((interest) => (
                          <Chip
                            key={interest}
                            label={interest}
                            clickable
                            color={
                              contactFormData.interests.includes(interest)
                                ? "primary"
                                : "default"
                            }
                            variant={
                              contactFormData.interests.includes(interest)
                                ? "filled"
                                : "outlined"
                            }
                            onClick={() => handleInterestChange(interest)}
                            sx={{
                              "&:hover": {
                                backgroundColor:
                                  contactFormData.interests.includes(interest)
                                    ? theme.palette.primary.dark
                                    : theme.palette.action.hover,
                              },
                            }}
                          />
                        ))}
                      </Box>
                      {errors.interests && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 1 }}
                        >
                          {errors.interests}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Message */}
                  <Grid>
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={4}
                      value={contactFormData.message}
                      onChange={handleInputChange("message")}
                      error={!!errors.message}
                      helperText={errors.message}
                      placeholder="Tell us more about your inquiry..."
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid>
                    <Box sx={{ textAlign: "center", mt: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<Send />}
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontSize: "1.1rem",
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          "&:hover": {
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        Send Message
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Container>

        {/* Success Snackbar */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setShowSuccess(false)}
            severity="success"
            icon={<CheckCircle />}
            sx={{ width: "100%" }}
          >
            Thank you! Your message has been sent successfully. We'll get back
            to you soon.
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
};

export default ContactForm;
