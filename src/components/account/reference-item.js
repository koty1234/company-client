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

function ReferenceItem (props) {

  const [values, setValues] = useState({
    referenceId: props.referenceObject._id,
    title: props.title,
    companyId: props.companyId,
    referenceName: props.referenceObject.referenceName || '',
    referencePhoneNumber: props.referenceObject.referencePhoneNumber || '',
    referenceEmail: props.referenceObject.referenceEmail || '',
    refLength: props.referenceObject.refLength || '',
    pageReady: false,
    disabled: true,
  });

  useEffect(() => {
    setValues({
        ...values,
        pageReady : true,
      });
  }, []);

  async function saveReference() {
    const refData = {
      companyId: values.companyId,
      referenceName: values.referenceName,
      referencePhoneNumber: values.referencePhoneNumber,
      referenceEmail: values.referenceEmail,
      refLength: values.refLength,
    }
    console.log(values.referenceId);

  let savedReference = await Axios.patch(`${domain}/reference/company/${values.referenceId}`, refData);
  console.log(savedReference);
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
      onSubmit = {saveReference}
    >
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
            item
            md={12}
            xs={12}>
            <h4>{values.title}</h4>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Company Name"
                name="referenceName"
                onChange={handleChange}
                required
                value={values.referenceName}
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
                label="Phone Number"
                name="referencePhoneNumber"
                onChange={handleChange}
                type="tel"
                required
                value={values.referencePhoneNumber}
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
                name="referenceEmail"
                onChange={handleChange}
                required
                value={values.referenceEmail}
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
                label="Length of Relationship"
                name="refLength"
                onChange={handleChange}
                type="number"
                value={values.refLength}
                variant="outlined"
                disabled = {values.disabled}
              />
            </Grid>
          </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            pt: 2
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
        </CardContent>
    </form>
  );
}
else return null;
}

export default ReferenceItem;
