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
import ReferenceItem from './reference-item';

function ReferenceDetails (props) {

  const [disable, setDisable] = useState(false);

  const [values, setValues] = useState({
    referenceArray: [],
    companyId: props.user.companyId,
    pageReady: false,
  });

  async function getReferences() {
    let referenceArray = await Axios.get(`${domain}/reference/company/${values.companyId}`);
    setValues({
      ...values,
      referenceArray : referenceArray.data,
      pageReady : true,
    })
  }

  useEffect(() => {
    getReferences();
  }, []);
  if(values.pageReady){
  return (
    <Grid 
    md={12}
    xs={12}>
    <Card sx={{mt:7}}>
    <CardHeader
      subheader="Update your references."
      title="References"
    />
        <Divider />
    <ReferenceItem companyId = {values.companyId} referenceObject = {values.referenceArray[0]} title ={"Reference 1"} passData = {setDisable}/>
    <ReferenceItem companyId = {values.companyId} referenceObject = {values.referenceArray[1]} title ={"Reference 2"} passData = {setDisable}/>
    <ReferenceItem companyId = {values.companyId} referenceObject = {values.referenceArray[2]} title ={"Reference 3"} passData = {setDisable}/>
    <Grid
          item
          md={12}
          xs={12}
          mr={2}
          mb={2}
          style={{display: 'flex', justifyContent: 'flex-end'}}
          >
          <Button
          type="submit"
          variant="contained"
          disabled={disable}
          >
          Save
        </Button>
          </Grid>
    </Card>
    </Grid>

  );
}
else {
  return null;
}
}

export default ReferenceDetails;
