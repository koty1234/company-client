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
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import { display } from '@mui/system';
import { theme } from 'src/theme';

function ReferenceItem (props) {

  const [values, setValues] = useState({
    referenceId: props.referenceObject._id,
    title: props.title,
    companyId: props.companyId,
    referenceName: props.referenceObject.referenceName || '',
    referencePhoneNumber: props.referenceObject.referencePhoneNumber || '',
    referenceEmail: props.referenceObject.referenceEmail || '',
    refLength: props.referenceObject.refLength || '',
    editHidden: "show",
    saveHidden: "hidden",
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
  let savedReference = await Axios.patch(`${domain}/reference/company/${values.referenceId}`, refData);
  setValues({
    ...values,
    disabled : true,
    editHidden: "show",
    saveHidden: 'hidden',
  });
  props.passData(false);
  }


  function allowEdit() {
    setValues({
      ...values,
      disabled : false,
      editHidden: "hidden",
      saveHidden: 'show',
    });
    props.passData(true);
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

function iconSwapper(){
  if(values.editHidden == "show"){
  return(
  <FontAwesomeIcon
  className="awesomeAboutPhoto"
  icon={faEdit}
  color="#004dc9"
  size='2x'
  onClick={allowEdit}
                        />
  );
  }
  if(values.saveHidden == "show"){
  return(
                                      <FontAwesomeIcon
  className="awesomeAboutPhoto"
  icon={faCheck}
  color="green"
  size='2x'
  onClick={saveReference}
                        />);
  }
}

  if(values.pageReady){
  return (
    <form
      autoComplete="off"
      noValidate
    >
        <CardContent>
          <Grid
            container
            spacing={2}
          >
            <Grid
            item
            md={12}
            xs={12}>
            <h4>{values.title}</h4>
            </Grid>
            <Grid
              item
              md={2.90}
              xs={6}
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
              md={2.90}
              xs={6}
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
              md={2.90}
              xs={6}
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
              md={2.90}
              xs={6}
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
            <Grid
              item
              md={0.40}
              xs={0.40}
              mt={1}
            >
          {iconSwapper()}
          </Grid>
          </Grid>
        </CardContent>
    </form>
  );
}
else return null;
}

export default ReferenceItem;
