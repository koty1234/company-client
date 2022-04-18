import { useEffect } from 'react';
import Head from 'next/head';
import { Divider } from '@mui/material';
import { gtm } from '../../components/lib/gtm';
import CustomQuestionsForm from 'src/components/account/custom-questions-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VendorTop from 'src/components/account/vendor-top';

const CustomQuestions = () => {
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
      <VendorTop />
      <Divider />
    <CustomQuestionsForm notify={notify}></CustomQuestionsForm>
      </main>
    </>
  );
};

export default CustomQuestions;
