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
import { faCircleXmark, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import {COLORS} from 'src/theme/colors';

function CustomCreditAppDetails (props) {

  const [values, setValues] = useState({
      hidden: true,
      showOpenArrow: true,
      showCloseArrow: false,
      qOne: '',
      qTwo: '',
      qThree: '',
      qFour: '',
      qFive: '',
      qSix: '',
      qSeven: '',
      qEight: '',
      qNine: '',
      qTen: '',
      tandc:'',
      disabled: true,
      pageReady: false,
  })

  useEffect(() => {
    fillData();
  }, [props.customCredAppId]);

  function allowEdit() {
    setValues({
      ...values,
      disabled : false,
    });
  }

async function fillData() {
        if(!props.customCredAppId) return null;
        let customCredAppData = await Axios.get(`${domain}/vendor/customcreditapp/${props.customCredAppId}`)
        customCredAppData = customCredAppData.data;
        setValues({
            ...values,
            qOne : customCredAppData.qOne || "",
            qTwo : customCredAppData.qTwo|| "",
            qThree : customCredAppData.qThree|| "",
            qFour : customCredAppData.qFour|| "",
            qFive : customCredAppData.qFive|| "",
            qSix : customCredAppData.qSix|| "",
            qSeven : customCredAppData.qSeven|| "",
            qEight : customCredAppData.qEight|| "",
            qNine : customCredAppData.qNine|| "",
            qTen : customCredAppData.qTen|| "",
            tandc : customCredAppData.tandc|| "",
          });
}

async function submitData(e) {
    e.preventDefault();
    const customCredAppData = {
        qOne: values.qOne,
        qTwo: values.qTwo,
        qThree: values.qThree,
        qFour: values.qFour,
        qFive: values.qFive,
        qSix: values.qSix,
        qSeven: values.qSeven,
        qEight: values.qEight,
        qNine: values.qNine,
        qTen: values.qTen,
        tandc:'asd',

    }
try {
    let response = await Axios.patch(`${domain}/vendor/customcreditapp/${props.customCredAppId}`
    , customCredAppData)
  }
catch (error) {
  console.log(error.response);
}

setValues({
    ...values, 
    disabled: true,
})

}

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }


  return (
    <form
      autoComplete="off"
      noValidate
    >
      <Card>
      <Grid
            container
            spacing={3}
          >
              <Grid
              item
              md={9}
              xs={9}
              m={3}
            >
              <h3>Custom Questions</h3>
              <p>Set your custom questions here.</p>
            </Grid>
            <Grid
              item
              md={2}
              xs={2}
              mr={3}
              mt={5}
              align="right"
            >
              <div hidden={values.showOpenArrow}>
              <FontAwesomeIcon onClick={() => 
              setValues({...values, hidden: true,
                        showOpenArrow: true,
                        showCloseArrow: false,
                        disabled: true,
                        })} 
              icon={faCircleXmark} 
              size="2x" 
              color={COLORS.closePlusButton}/>
              </div>
              <div hidden={values.showCloseArrow}>
              <FontAwesomeIcon onClick={() =>
               setValues({...values, hidden: false,
                        showOpenArrow: false,
                        showCloseArrow: true,
                        })}
              icon={faPlusCircle} 
              size="2x" 
              color={COLORS.expandPlusButton}/>
              </div>
            </Grid>
              <Divider/>
              </Grid>
        <Divider />
        <CardContent hidden={values.hidden}>
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
                value={values.qOne}
                name="qOne"
                onChange={handleChange}
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
                value={values.qTwo}
                name="qTwo"
                onChange={handleChange}
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
                value={values.qThree}
                name="qThree"
                onChange={handleChange}
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
                value={values.qFour}
                name="qFour"
                onChange={handleChange}
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
                value={values.qFive}
                name="qFive"
                onChange={handleChange}
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
                value={values.qSix}
                name="qSix"
                onChange={handleChange}
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
                value={values.qSeven}
                name="qSeven"
                onChange={handleChange}
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
                value={values.qEight}
                name="qEight"
                onChange={handleChange}
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
                value={values.qNine}
                name="qNine"
                onChange={handleChange}
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
                value={values.qTen}
                name="qTen"
                onChange={handleChange}
                variant="outlined"
                disabled = {values.disabled}
              />
            </Grid>
            <Grid
            item
            md={8}
            xs={12}> </Grid>
            <Grid
              item
              md={3}
              xs={6}
              align="right"
            >
          <Button
            color="warning"
            variant="contained"
            onClick={allowEdit}
          >
            Edit Questions
          </Button>
          </Grid>
            <Grid
              item
              md={1}
              xs={6}
              align="right"
            >
          <Button
            color="primary"
            variant="contained"
            onClick={submitData}
          >
            Save
          </Button>
          </Grid>
          </Grid>
            </CardContent>
        <Divider />
      </Card>
    </form>
  );
}

export default CustomCreditAppDetails;
