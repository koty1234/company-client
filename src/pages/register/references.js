import { useEffect, useContext } from 'react';
import Head from 'next/head';
import { Divider } from '@mui/material';
import { gtm } from '../../components/lib/gtm';
import UserContext from "../../context/user-context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TopSection } from '../../components/aaa-components/top-section';
import VendorTop from 'src/components/account/vendor-top';
import ReferenceDetails from 'src/components/account/reference-details';

const ReferenceCreate = () => {
    const {user} = useContext(UserContext);
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  function notify(message) {
    toast(message);
  }
  console.log(user);

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
    <ReferenceDetails user={user}/>
      </main>
    </>
  );
};

export default ReferenceCreate;