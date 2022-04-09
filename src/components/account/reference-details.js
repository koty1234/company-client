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

  const [values, setValues] = useState({
    referenceArray: [],
    companyId: props.user.companyId,
    pageReady: false,
    disabled: true,
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
  console.log
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
    <ReferenceItem companyId = {values.companyId} referenceObject = {values.referenceArray[0]} title ={"Reference 1"}/>
    <ReferenceItem companyId = {values.companyId} referenceObject = {values.referenceArray[1]} title ={"Reference 2"}/>
    <ReferenceItem companyId = {values.companyId} referenceObject = {values.referenceArray[2]} title ={"Reference 3"}/>
    </Card>
    </Grid>

  );
}
else {
  return null;
}
}

export default ReferenceDetails;
