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

function CompanyProfileDetails (props) {

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

  const [values, setValues] = useState({
    companyName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    presidentName: '',
    yib:'',
    revenue: '',
    businessPhone: '',
    businessEmail: '',
    businessType: '',
    website: '',
    companyId: props.user.companyId,
    pageReady: false,
    disabled: true,
  });


  useEffect(() => {
    getCompany();
  }, []);


  async function saveCompany() {
    const companyData = {
      companyName: values.companyName,
      address: values.address,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
      presidentName: values.presidentName,
      businessType: values.businessType,
      revenue: values.revenue,
      yib: values.yib,
      businessPhone: values.businessPhone,
      businessEmail: values.businessEmail,
      website: values.website,
    }

  await Axios.patch(`${domain}/company/${values.companyId}`, companyData);
  }

  async function getCompany() {
    if(values.companyId){
    let request = await Axios.get(`${domain}/company/${values.companyId}`);
    let company = request.data;
    setValues({
      ...values,
      companyName: company.companyName || "",
      address: company.address || "",
      city : company.city || "",
      state : company.state || "",
      postalCode : company.postalCode || "",
      presidentName : company.presidentName || "",
      revenue: company.revenue || "",
      yib : company.yib || "",
      businessPhone: company.businessPhone || "",
      businessEmail: company.businessEmail || "",
      businessType: company.businessType || "",
      website : company.website || "",
      pageReady: true,
    });
  }
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
      onSubmit = {saveCompany}
    >
      <Card sx={{mt:10}}>
        <CardHeader
          subheader="Update your company"
          title="Company"
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
                label="Company Name"
                name="companyName"
                onChange={handleChange}
                required
                value={values.companyName}
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
                label="Address"
                name="address"
                onChange={handleChange}
                required
                value={values.address}
                variant="outlined"
                disabled = {values.disabled}
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
                onChange={handleChange}
                required
                value={values.city}
                variant="outlined"
                disabled = {values.disabled}
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="State"
                name="state"
                onChange={handleChange}
                value={values.state}
                variant="outlined"
                disabled = {values.disabled}
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
                onChange={handleChange}
                value={values.postalCode}
                variant="outlined"
                disabled = {values.disabled}
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
                onChange={handleChange}
                required
                value={values.presidentName}
                variant="outlined"
                disabled = {values.disabled}
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
            defaultValue={values.businessType}
            select
            SelectProps={{ native: true }}
            onChange={handleChange}
            disabled = {values.disabled}
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
                label="Years in Business"
                name="yib"
                onChange={handleChange}
                required
                value={values.yib}
                variant="outlined"
                disabled = {values.disabled}
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
            defaultValue={values.revenue}
            SelectProps={{ native: true }}
            disabled = {values.disabled}
            onChange={handleChange}
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
                type="tel"
                label="Primary Business Phone"
                name="businessPhone"
                onChange={handleChange}
                required
                value={values.businessPhone}
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
                label="Primary Business Email"
                name="businessEmail"
                onChange={handleChange}
                required
                value={values.businessEmail}
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
                label="Website"
                name="website"
                onChange={handleChange}
                required
                value={values.website}
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
              md={12}
              xs={12}
              align="right"
            >
          <Button
            sx={{mr:2}}
            color="warning"
            variant="contained"
            onClick={allowEdit}
          >
            Edit Details
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled = {values.disabled}
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

export default CompanyProfileDetails;
