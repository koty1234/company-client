import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { gtm } from '../components/lib/gtm';
import AccountProfileDetails  from "../components/account/account-profile-details";
import CompanyProfileDetails from "../components/account/company-profile-details";
import { DashboardLayout } from '../components/dashboard-layout';
import Axios from 'axios';
import domain from "../utils/domain";
import CheckoutForm from 'src/components/stripe/checkout-form';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const Payment = () => {

  const stripePromise = loadStripe("pk_test_51KmNReLdXBVrhWF2ZbOHV81YAcfgKOz0KiwI3aYexoKgKB2pJ3aR2nN0jpscNR78KfyRrViD2vEIwF3EHIr6buPF008Yl2hgIW")

  const [clientSecret, setClientSecret] = useState("");

  const [values, setValues] = useState({
    accountDetails: '',
    pageReady: true,
  });

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };


  useEffect(() => {
    fetch(`${domain}/payment/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: 110000 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

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
    <div >
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
        </Grid>
      </Container>
    </Box>
    </main>
  </>
);

}
else return null;
}

Payment.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Payment;
