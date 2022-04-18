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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {COLORS} from 'src/theme/colors';

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
    logo: '',
    banner: '',
    companyId: props.user.companyId,
    pageReady: false,
    disabled: false,
    hidden: true,
    showOpenArrow: true,
    showCloseArrow: false,
  });


  useEffect(() => {
    getCompany();
  }, [values.logo]);


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
    let logo = await Axios.get(`${domain}/file/company/logo/${values.companyId}`);
    let banner = await Axios.get(`${domain}/file/company/banner/${values.companyId}`);
    let company = request.data;
    setValues({
      ...values,
      logo: logo.data.url,
      banner: banner.data.url,
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

function flipValues() {
  setValues({
    ...values,
    hidden:!values.hidden,
    showCloseArrow: !values.showCloseArrow,
    showOpenArrow: !values.showOpenArrow,
  })
}

async function logoSelected (event) {
  const file = event.target.files[0];
  const fileDetails = new FormData();
  fileDetails.append("companyId", values.companyId);
  fileDetails.append("uploadFile", file);
  fileDetails.append("type", "logo");
  fileDetails.append("side", "company");
  let savedFile = await Axios.post(`${domain}/file`, fileDetails, { headers: {'Content-Type': 'multipart/form-data'}});
  setValues({
    ...values,
    logo: '',
  })
}

async function bannerSelected (event) {
console.log("here");
const file = event.target.files[0]
const fileDetails = new FormData();
fileDetails.append("companyId", values.companyId);
fileDetails.append("uploadFile", file);
fileDetails.append("type", "banner");
fileDetails.append("side", "company");
let savedFile = await Axios.post(`${domain}/file`, fileDetails, { headers: {'Content-Type': 'multipart/form-data'}});
setValues({
  ...values,
  logo: '',
})
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
      <Card>
          <Grid
            container
            spacing={3}
            onClick={flipValues}
          >
                          <Grid
              item
              md={9}
              xs={9}
              m={3}
            >
              <h3>Company</h3>
              <p>Update your company details.</p>
            </Grid>
                          <Grid
              item
              md={2}
              xs={2}
              mr={3}
              mt={4}
              align="right"
            >
              <div hidden={values.showOpenArrow}>
              <FontAwesomeIcon onClick={flipValues} 
              icon={faCircleXmark} 
              size="2x" 
              color={COLORS.closePlusButton}/>
              </div>
              <div hidden={values.showCloseArrow}>
              <FontAwesomeIcon onClick={flipValues}
              icon={faEdit} 
              size="2x" 
              color={COLORS.expandPlusButton}/>
              </div>
            </Grid>
            </Grid>
            <Divider />
            <CardContent hidden={values.hidden}>
          <Grid
            container
            spacing={3}
          >
                        <Grid
              item
              md={3}
              xs={12}
            >
              <h5>Logo</h5>
            </Grid>
            <Grid
              item
              md={9}
              xs={12}
            >
              <h5>Banner</h5>
            </Grid>
                       <Grid
            item
            md={3}
            xs={12}
            >
                      <div className="fileUploadButton">
                      <label htmlFor="file-upload" className="file-upload">
                      <Box
                              sx={{
                                backgroundColor: 'background.default',
                                backgroundImage: `url(${values.logo})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'contain',
                                backgroundRepeat: "no-repeat",
                                borderRadius: 1,
                                padding: 1,
                                display: 'flex',
                                height: 200,
                                justifyContent: 'right',
                                overflow: 'hidden',
                                '&:hover': {
                                  backgroundColor: 'action.hover',
                                  cursor: 'pointer',
                                  opacity: 0.8
                                }
                              }}>
                                                      <FontAwesomeIcon
                        className="awesomeAboutPhoto"
                        icon={faEdit}
                        color="grey"
                        size='1x'
                      />
                                </Box>
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/x-png, image/jpeg, image/jpg"
                        onChange={logoSelected}
                        style={{display: "none"}}
                      />
                    </div>                                
              </Grid>
              <Grid
            item
            md={9}
            xs={12}
            >
                      <div className="bannerUploadButton">
                      <label htmlFor="banner-upload" className="banner-upload">
                      <Box
                              sx={{
                                backgroundColor: 'background.default',
                                backgroundImage: `url(${values.banner})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'contain',
                                backgroundRepeat: "no-repeat",
                                borderRadius: 1,
                                padding: 1,
                                display: 'flex',
                                height: 200,
                                justifyContent: 'right',
                                overflow: 'hidden',
                                '&:hover': {
                                  backgroundColor: 'action.hover',
                                  cursor: 'pointer',
                                  opacity: 0.8
                                }
                              }}>
                                                      <FontAwesomeIcon
                        className="awesomeAboutPhoto"
                        icon={faEdit}
                        color="grey"
                        size='1x'
                      />
                                </Box>
                      </label>
                      <input
                        id="banner-upload"
                        type="file"
                        accept="image/x-png, image/jpeg, image/jpg"
                        onChange={bannerSelected}
                        style={{display: "none"}}
                      />
                    </div>                                
              </Grid>
              <Grid
            item
            md={9}
            xs={5}
            >
              </Grid>
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
            <Divider />
        <Grid
              item
              md={12}
              xs={6}
              align="right"
            >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Save
          </Button>
          </Grid>
        </Grid>
        </CardContent>
      </Card>
    </form>
  );
}
else return null;
}

export default CompanyProfileDetails;
