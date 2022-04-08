import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { gtm } from '../../components/lib/gtm';
import CreditAppDetails  from "../../components/creditapp/credit-app-details";
import CustomCreditAppDetails  from "../../components/creditapp/custom-credit-app-details";
import { DashboardLayout } from '../../components/dashboard-layout';
import Axios from 'axios';
import domain from "../../utils/domain";
import TermsDetails from 'src/components/creditapp/terms-details';

function Account () {

  const [values, setValues] = useState({
    accountDetails: '',
    customCredAppDefaultId: '',
    customCredAppResidentialId: '',
    customCredAppCommercialId: '',
    currentCustomCredAppId: '',
    defaultButton: 'text',
    residentialButton: 'text',
    commercialButton: 'text',
    pageReady: false,
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
    getVendor();
  },[values.currentCustomCredAppId]);

  async function getUser() {
    let request = await Axios.get(`${domain}/user/`);
    let userDetails = request.data;
    return userDetails;
  }

  async function getVendor() {
   let userDetails = await getUser();
    let request = await Axios.get(`${domain}/vendor/${userDetails.vendorId}`);
    let vendorDetails = request.data;
    return (
    setValues({
      ...values,
      customCredAppDefaultId : vendorDetails.customCredAppId[0].Default,
      customCredAppResidentialId : vendorDetails.customCredAppId[1].Residential,
      customCredAppCommercialId : vendorDetails.customCredAppId[2].Commercial,
      accountDetails : userDetails,
      pageReady: true,
    }));
  }
  // only render if data is ready
  if(values.pageReady){
    // if it's first render - show default cred app data
    if(!values.currentCustomCredAppId){
      setValues({
        ...values,
        currentCustomCredAppId : values.customCredAppDefaultId,
        defaultButton : "contained",
      })
    }
  return(
  <>
    <Head>
      <title>
        Account | Material Kit
      </title>
    </Head>
    <main>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h3"
        >
          Credit App Builder
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={1}
            md={1}
            xs={4}
            align="left"
          >
          <Button
            color="primary"
            variant={values.defaultButton}
            onClick={() => setValues({...values, 
              currentCustomCredAppId: values.customCredAppDefaultId, 
              defaultButton: "contained", 
              residentialButton: "text", 
              commercialButton: "text"})}
          >
            Default
            </Button>
            </Grid>
            <Grid
            item
            lg={1}
            md={2}
            xs={4}
            align="left"
            mr={2}
          >
          <Button
            color="primary"
            variant={values.residentialButton}
            onClick={() => setValues({...values, 
              currentCustomCredAppId: values.customCredAppResidentialId,
              defaultButton: "text", 
              residentialButton: "contained", 
              commercialButton: "text"
            })}
          >
            Residental
            </Button>
            </Grid>
            <Grid
            item
            lg={1}
            md={2}
            xs={4}
            align="left"
          >
          <Button
            color="primary"
            variant={values.commercialButton}
            onClick={() => setValues({...values, 
              currentCustomCredAppId: values.customCredAppCommercialId,
              defaultButton: "text", 
              residentialButton: "text", 
              commercialButton: "contained",
            })}
          >
            Commercial
            </Button>
            </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
            <CreditAppDetails user={values.accountDetails}/>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
          <CustomCreditAppDetails user={values.accountDetails} customCredAppId={values.currentCustomCredAppId}/>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
          <TermsDetails user={values.accountDetails}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
    </main>
  </>
);

}
else return null;
}

Account.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Account;
