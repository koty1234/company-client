import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import Axios from 'axios';
import domain from "../../utils/domain";
import ReferenceItem from '../account/reference-item';
import { TramRounded } from '@mui/icons-material';

function CreateReferenceForm (props) {

  const [disable, setDisable] = useState(true);

  const [values, setValues] = useState({
    referenceArray: [],
    pageReady: false,
  });

  if(!props.user) return null;

  async function getReferences() {
    if(!props.user.companyId) return;
    let referenceArray = await Axios.get(`${domain}/reference/company/${props.user.companyId}`);
    setValues({
      ...values,
      referenceArray : referenceArray.data,
      pageReady : true,
    })
  }

  function onSubmit(){
    props.hide(true);
    props.next(false);
  }
  
  useEffect(() => {
    getReferences();
  }, [props.user]);

  if(values.pageReady){
  return (
    <Grid 
    item
    md={12}
    xs={12}
    >
                  <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Enter References
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Let us know about your existing vendor relationships.
              </Typography>
            </Box>
    <ReferenceItem companyId = {values.companyId} referenceObject = {values.referenceArray[0]} title ={"Reference 1"} passData = {setDisable}/>
    <ReferenceItem companyId = {values.companyId} referenceObject = {values.referenceArray[1]} title ={"Reference 2"} passData = {setDisable}/>
    <ReferenceItem companyId = {values.companyId} referenceObject = {values.referenceArray[2]} title ={"Reference 3"} passData = {setDisable}/>
    <Grid
          item
          md={12}
          xs={12}
          marginX={3}
          style={{display: 'flex', justifyContent: 'flex-end'}}
          >
              <Button
                color="primary"
                fullWidth
                size="large"
                onClick={onSubmit}
                variant="contained"
                disabled = {disable}
              >
                Next
              </Button>
          </Grid>
    </Grid>

  );
}
else {
  return null;
}
}

export default CreateReferenceForm;
