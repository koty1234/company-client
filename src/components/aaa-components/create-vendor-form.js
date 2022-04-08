import { Box, Button, Grid, TextField } from '@mui/material';
import {React, useState} from 'react';
import Axios, * as others from "axios";
import { useRouter } from 'next/router';
import domain from "../../utils/domain";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateVendorForm ({notify}) {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [presidentName, setPresidentName] = useState("");
  const [yib, setYib] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");


  async function submitData(e) {
    e.preventDefault();
    const vendorData = {
      companyName: companyName,
      address: address,
      city: city,
      state: state,
      postalCode: postalCode,
      presidentName: presidentName,
      yib: yib,
      businessPhone: businessPhone,
      businessEmail: businessEmail,
    }
try {
    await Axios.post(`${domain}/vendor/`, vendorData)
    router.push('/');
  }
catch (error) {
  notify(error.response);
}
}


  return (
  <Box
    sx={{
      backgroundColor: 'background.paper',
      minHeight: '100%',
      p: 3
    }}
  >
    <form onSubmit={submitData}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          md={6}
          xs={12}
        >
          <ToastContainer />
          <TextField
            fullWidth
            label="Company Name"
            name="companyName"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            fullWidth
            label="Address"
            name="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>

        <Grid
          item
          md={4}
          xs={12}
        >
          <TextField
            fullWidth
            label="City"
            name="city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
        >
          <TextField
            fullWidth
            label="Postal Code"
            name="postalCode"
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
        >
          <TextField
            fullWidth
            label="State/Region"
            name="state"
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            fullWidth
            label="President's Name"
            name="presidentName"
            required
            value={presidentName}
            onChange={(e) => setPresidentName(e.target.value)}
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            fullWidth
            label="Years In Business"
            name="yib"
            required
            value={yib}
            onChange={(e) => setYib(e.target.value)}
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            fullWidth
            label="Primary Business Phone"
            name="businessPhone"
            required
            value={businessPhone}
            onChange={(e) => setBusinessPhone(e.target.value)}
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            fullWidth
            label="Primary Business Email"
            name="businessEmail"
            required
            value={businessEmail}
            onChange={(e) => setBusinessEmail(e.target.value)}
          />
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          style={{display: 'flex', justifyContent: 'flex-end'}}
          >
          <Button
          type="submit"
          variant="contained"
          >
          Next
        </Button>
          </Grid>
      </Grid>
    </form>
  </Box>
  );
  }

  export default CreateVendorForm;
