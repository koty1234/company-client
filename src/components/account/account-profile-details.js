import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import Axios from 'axios';
import domain from "../../utils/domain";

function AccountProfileDetails (props) {

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    pageReady: false,
    disabled: true,
  });

  useEffect(() => {
    setValues({
      ...values,
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      email: props.user.email,
      phone: props.user.phone || "",
      position: props.user.position || "",
      pageReady: true,
    });

  }, []);

  async function saveUser() {
    const userData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      position: values.position,
    }

  let savedUser = await Axios.patch(`${domain}/user/`, userData);
  console.log(savedUser);
  }

  function allowEdit() {
    setValues({
      ...values,
      disabled : false,
    });
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }
  if(values.pageReady){
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit = {saveUser}
    >
      <Card>
        <CardHeader
          subheader="Update your profile."
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
                disabled = {values.disabled}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
                disabled = {values.disabled}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
                disabled = {values.disabled}
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Position"
                name="position"
                onChange={handleChange}
                required
                value={values.position}
                variant="outlined"
                disabled = {values.disabled}
              />
            </Grid>
            
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
            <Grid
              item
              md={2}
              xs={6}
              align="right"
            >
          <Button
            color="warning"
            variant="contained"
            onClick={allowEdit}
          >
            Edit Details
          </Button>
          </Grid>
          <Grid
              item
              md={2}
              xs={6}
              align="right"
            >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Save Details
          </Button>
          </Grid>
        </Box>
      </Card>
    </form>
  );
}
else return null;
}

export default AccountProfileDetails;
