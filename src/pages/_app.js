import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import {UserContextProvider} from '../context/user-context';
import Axios, * as others from "axios";


const clientSideEmotionCache = createEmotionCache();
Axios.defaults.withCredentials = true;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  //UserContextProvider ensures a user is logged in

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Material Kit Pro
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <UserContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
        </UserContextProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
