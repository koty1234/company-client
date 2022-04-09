import { Box, Button, Grid, TextField } from '@mui/material';
import {React, useState} from 'react';
import Axios, * as others from "axios";
import { useRouter } from 'next/router';
import domain from "../../utils/domain";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateCompanyForm ({notify}) {
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
  const [businessType, setBusinessType] = useState("");
  const [revenue, setRevenue] = useState("");

//for revenue select field ONLY
const revenueOptions = [
  {
    label: '$1 - $100,000',
    value: '0',
  },
  {
    label: '$100,000 - $500,000',
    value: '1'
  },
  {
    label: '$500,000 - $1,000,000',
    value: '2'
  },
  {
    label: '$1,000,000 - $2,500,000',
    value: '3'
  },
  {
    label: '$2,500,000 - $10,000,000',
    value: '4'
  },
  {
    label: '$10,000,000 - $50,000,000',
    value: '5'
  },
  {
    label: '$50,000,000+',
    value: '6'
  }
];


const businessTypeOptions = [
  {
    label: 'Sole Proprietorship',
    value: 'Sole Proprietorship',
  },
  {
    label: 'Partnership',
    value: 'Partnership'
  },
  {
    label: 'Corporation',
    value: 'Corporation'
  }
];



  async function submitData(e) {
    e.preventDefault();
    const companyData = {
      companyName: companyName,
      address: address,
      city: city,
      state: state,
      postalCode: postalCode,
      presidentName: presidentName,
      yib: yib,
      businessPhone: businessPhone,
      businessEmail: businessEmail,
      businessType: businessType,
      revenue: revenue,
    }
try {
    await Axios.post(`${domain}/company/`, companyData)
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
          md={3}
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
          md={3}
          xs={12}
        >
          <TextField
            fullWidth
            label="Business Type"
            name="businessType"
            select
            SelectProps={{ native: true }}
            onChange={(e) => setBusinessType(e.target.value)}
          >
          {businessTypeOptions.map((businessType) => (
            <option
              key={businessType.value}
              value={businessType.value}
            >
              {businessType.label}
            </option>
          ))}
            </TextField>
        </Grid>
        <Grid
          item
          md={3}
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
          md={3}
          xs={12}
        >
          <TextField
            fullWidth
            label="Annual Revenue"
            name="revenue"
            select
            SelectProps={{ native: true }}
            onChange={(e) => setRevenue(e.target.value)}
          >
          {revenueOptions.map((revenue) => (
            <option
              key={revenue.value}
              value={revenue.value}
            >
              {revenue.label}
            </option>
          ))}
            </TextField>
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

  export default CreateCompanyForm;
