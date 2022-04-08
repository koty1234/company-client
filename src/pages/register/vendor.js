import { useEffect } from 'react';
import Head from 'next/head';
import { Divider } from '@mui/material';
import { gtm } from '../../components/lib/gtm';
import  CreateVendorForm  from '../../components/aaa-components/create-vendor-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TopSection } from '../../components/aaa-components/top-section';

const VendorCreate = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  function notify(message) {
    toast(message);
  }

  return (
    <>
      <Head>
        <title>
          Material Kit Pro
        </title>
      </Head>
      <main>
      <ToastContainer />
      <TopSection />
      <Divider />
    <CreateVendorForm notify={notify}></CreateVendorForm>
      </main>
    </>
  );
};

export default VendorCreate;
