import { Box, Button, Grid, TextField } from '@mui/material';
import {React, useState, useEffect} from 'react';
import Axios, * as others from "axios";
import { useRouter } from 'next/router';
import domain from "../../utils/domain";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VendorTop () {

    const [values, setValues] = useState({
        vendorId: "62558e4313dfed8fda1b9a1b",
        companyName: "",
        logo: "",
        pageReady: false,
      });
    
      useEffect(() => {
        getVendor();
      },[]);

      async function getVendor(){
        let request = await Axios.get(`${domain}/vendor/${values.vendorId}`);
        let logo = await Axios.get(`${domain}/file/vendor/logo/${values.vendorId}`);
        setValues({
            ...values,
            companyName: request.data.companyName,
            logo: logo.data.url,
            pageReady: true,
        })
      }

      if(values.pageReady){
        return (
            <Grid
                  container
                  spacing={3}
                >
                    <Grid
                    item
                    md={12}
                    xs={12}
                    mt={2}
                    align="center"
                  >
                             <Box
                              sx={{
                                backgroundColor: 'background.default',
                                backgroundImage: `url(${values.logo})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'contain',
                                backgroundRepeat: "no-repeat",
                                borderRadius: 1,
                                padding: 1,
                                display: 'flex',
                                height: 150,
                                justifyContent: 'right',
                                overflow: 'hidden',
                              }}></Box>
                  </Grid>
                      </Grid>
                      );
                            }
                            else return null;
    }
    export default VendorTop;