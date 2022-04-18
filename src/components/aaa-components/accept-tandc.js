import { Box, Button, Grid, Checkbox, Typography } from '@mui/material';
import {React, useState, useEffect} from 'react';
import Axios, * as others from "axios";
import { useRouter } from 'next/router';
import domain from "../../utils/domain";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignatureCanvas from 'react-signature-canvas'
import { margin } from '@mui/system';


function AcceptTandC (props) {
  const router = useRouter();

  const [vendorName, setVendorName] = useState("");
  const [sigPad, setSigPad] = useState({});

  const [values, setValues] = useState({
    vendorTandC: "",
    platformTandC: "",
    tandcConfirmed: false,
    pageReady: false,
  });

  if(!props.user || !props.vendorId) return null;

  async function getVendor() { 
    let vendor = await Axios.get(`${domain}/vendor/${props.vendorId}`);
    getCustomCredApp(vendor);
  }

  async function getCustomCredApp(vendor){
      let creditAppId = vendor.data.customCredAppId[0].Default
      setVendorName(vendor.data.companyName);
      let creditApp = await Axios.get(`${domain}/vendor/customcreditapp/${creditAppId}`);
      setValues({
          ...values,
          vendorTandC: creditApp.data.tandc,
          pageReady: true,
      });
  }

async function captureSignature(){
    let signatureCanvas = sigPad.getTrimmedCanvas().toDataURL('image/png');
    const signatureData = {
        creditAppId: props.creditAppId,
        signature: signatureCanvas,
    }
    await Axios.post(`${domain}/file/signature/`, signatureData);
}
  
  useEffect(() => {
    getVendor();
  }, [props]);


  if(!values.pageReady) return null;
  return (
    <form>
        <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Almost Done!
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                If you have any questions please reach out to us!.
              </Typography>
            </Box>

            <Grid
            item
            md={12}
            xs={12}
            >
                                            <Box
              sx={{
                  backgroundColor:"#ffffff",
                  padding: 2,
                  borderRadius: 1,
              }}
            >
            <pre style={{whiteSpace: "pre-wrap"}}>
                {values.vendorTandC}
            </pre>
            </Box>
            </Grid>
            <Grid
            item
            md={12}
            xs={12}
            >
                            <Box
              sx={{
                marginTop:3,
                alignItems: 'center',
                justifyContent: "flex-end",
                display: 'flex',
              }}
            >
              <Typography
                color="textSecondary"
                variant="body1"
              >
                I agree to the terms and conditions above.
                </Typography>
                </Box>
                </Grid>
                <Grid
            item
            md={12}
            xs={12}
            sx={{justifyContent: "flex-end", display:"flex"}}
            >
                <Box
                sx={{backgroundColor:"#ffffff",
                borderRadius:1,
                }}>
            <SignatureCanvas 
            penColor='black'
            ref={(ref) => {setSigPad(ref)}}
            canvasProps={{width: 400, height: 100, className: 'sigCanvas'}} />
            <hr style={{border:0, 
                height: 0,
                borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                marginLeft: 10,
                marginRight: 10,}}></hr>
            <p style={{textAlign:"center"}}>Please sign here</p>
            </Box>
                </Grid>
          
        <Grid
          item
          md={12}
          xs={12}
          mt={3}
          >
              <Button
                color="primary"
                fullWidth
                size="large"
                onClick={captureSignature}
                variant="contained"
              >
                Sign
              </Button>
          </Grid>
    </form>
  );
  }

  export default AcceptTandC;
