import Head from 'next/head';
import React, {useContext, useEffect, useState} from "react";
import { Box, Container, Grid } from '@mui/material';
import { Budget } from '../components/dashboard/budget';
import { LatestProducts } from '../components/dashboard/latest-products';
import { Sales } from '../components/dashboard/sales';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalProfit } from '../components/dashboard/total-profit';
import { TrafficByDevice } from '../components/dashboard/traffic-by-device';
import IncomingCreditApps  from '../components/dashboard/incoming-credit-apps';
import { DashboardLayout } from '../components/dashboard-layout';
import { useRouter } from 'next/router';
import { gtm } from '../components/lib/gtm';
import UserContext from "../context/user-context";

function Dashboard () {
  const router = useRouter();
  const {user} = useContext(UserContext);

  const [values, setValues] = useState({
    pageReady: true,
  });

  if(!values.pageReady) return null;
  return(
  <>
    <Head>
      <title>
        Dashboard | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <IncomingCreditApps />
          </Grid>



          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  );
    }

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
