import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { gtm } from '../components/lib/gtm';
import AccountProfileDetails  from "../components/account/account-profile-details";
import CompanyProfileDetails from "../components/account/company-profile-details";
import { DashboardLayout } from '../components/dashboard-layout';
import Axios from 'axios';
import domain from "../utils/domain";
import ReferenceDetails from 'src/components/account/reference-details';

const Account = () => {

  const [values, setValues] = useState({
    accountDetails: '',
    pageReady: false,
  });


  useEffect(() => {
    getUser();
    gtm.push({ event: 'page_view' });
  }, []);

  async function getUser() {
    let request = await Axios.get(`${domain}/user/`);
    let userDetails = request.data;
    setValues({
      ...values,
      accountDetails : userDetails,
      pageReady: true
    })
  }

  if(values.pageReady){
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
          Account
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
          <AccountProfileDetails user={values.accountDetails}/>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
          <CompanyProfileDetails user={values.accountDetails}/>
          </Grid>
          <ReferenceDetails user={values.accountDetails}/>
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
