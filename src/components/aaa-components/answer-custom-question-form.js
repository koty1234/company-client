import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import {React, useState, useEffect} from 'react';
import Axios, * as others from "axios";
import { useRouter } from 'next/router';
import domain from "../../utils/domain";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SettingsRemoteTwoTone } from '@mui/icons-material';


function AnswerCustomQuestionForm (props) {
  const [vendorName, setVendorName] = useState("");

  const [values, setValues] = useState({
    qOne: "",
    qTwo: "",
    qThree: "",
    qFour: "",
    qFive: "",
    aOne: "",
    aTwo: "",
    aThree: "",
    aFour: "",
    aFive: "",
    creditAppId: "",
    rowOne: true,
    rowTwo: true,
    rowThree: true,
    rowFour: true,
    rowFive: true,
    pageReady: false,
  });

  if(!props.user || !props.vendorId) return null;

  async function getVendor() { 
    let vendor = await Axios.get(`${domain}/vendor/${props.vendorId}`);
    getCustomCredApp(vendor);
  }

  async function getCustomCredApp(vendor){
      let creditAppId = vendor.data.customCredAppId[0].Default
      setVendorName(vendor.data.companyName);
      let creditApp = await Axios.get(`${domain}/vendor/customcreditapp/${creditAppId}`);
      setHidden(creditApp);
  }

  async function setHidden(customCredApp){
      if(customCredApp.data.qOne) setValues(values.rowOne = false);
      if(customCredApp.data.qTwo) setValues(values.rowTwo = false);
      if(customCredApp.data.qThree) setValues(values.rowThree = false);
      if(customCredApp.data.qFour) setValues(values.rowFour = false);
      if(customCredApp.data.qFive) setValues(values.rowFive = false);
      setValues({
        ...values,
        creditAppId: customCredApp.data._id,
        qOne: customCredApp.data.qOne || "",
        qTwo: customCredApp.data.qTwo || "",
        qThree: customCredApp.data.qThree || "",
        qFour: customCredApp.data.qFour || "",
        qFive: customCredApp.data.qFive || "",
        pageReady: true,
    });
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  async function submitData(e){
      e.preventDefault();
      const creditAppData = {
          companyId: props.user.companyId,
          customCredAppId: values.creditAppId,
          aOne: values.aOne || "",
          aTwo: values.aTwo || "",
          aThree: values.aThree || "",
          aFour: values.aFour || "",
          aFive: values.aFive || "",
          tandc: true,
      }
    try{
        let result = await Axios.post(`${domain}/creditapp/`, creditAppData);
        props.dataToNext(result.data._id);
        props.hide(true);
        props.next(false);
    }
    catch (errorMessage) {
        console.log(errorMessage);
    }
  }
  
  useEffect(() => {
    getVendor();
  }, [props.vendorId]);

console.log(values.pageReady);
  if(!values.pageReady) return null;
  return (
    <form
    onSubmit={submitData}>
        <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Almost Done!
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                These questions are specific to {vendorName}.
              </Typography>
            </Box>
          <div hidden={values.rowOne} >
          <TextField
            margin='normal'
            fullWidth
            label={values.qOne}
            name="aOne"
            required={!values.rowOne}
            value={values.aOne}
            onChange={handleChange}
          />
        </div>
        <div hidden={values.rowTwo}>
          <TextField
          margin='normal'
            fullWidth
            label={values.qTwo}
            name="aTwo"
            required={!values.rowTwo}
            value={values.aTwo}
            onChange={handleChange}
          />
        </div>
        <div hidden={values.rowThree}>
          <TextField
            margin='normal'
            fullWidth
            label={values.qThree}
            name="aThree"
            required={!values.rowThree}
            value={values.aThree}
            onChange={handleChange}
          />
        </div>
        <div hidden={values.rowFour}>
          <TextField
            margin='normal'
            fullWidth
            label={values.qFour}
            name="aFour"
            required={!values.rowFour}
            value={values.aFour}
            onChange={handleChange}
          />
        </div>
        <div hidden={values.rowFive}>
          <TextField
            margin='normal'
            fullWidth
            label={values.qFive}
            name="aFive"
            required={!values.rowFive}
            value={values.aFive}
            onChange={handleChange}
          />
        </div>
        <Grid
          item
          md={12}
          xs={12}
          mt={3}
          >
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Next
              </Button>
          </Grid>
    </form>
  );
  }

  export default AnswerCustomQuestionForm;
