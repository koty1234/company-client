import { useEffect } from 'react';
import Head from 'next/head';
import { Divider } from '@mui/material';
import { gtm } from '../../components/lib/gtm';
import  CreateCompanyForm from '../../components/aaa-components/create-company-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TopSection } from '../../components/aaa-components/top-section';

const CompanyCreate = () => {
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
    <CreateCompanyForm notify={notify}></CreateCompanyForm>
      </main>
    </>
  );
};

export default CompanyCreate;
