
import React, {useContext, useEffect, useState} from "react";
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import Axios from 'axios';
import domain from "../../utils/domain";
import UserContext from "../../context/user-context";
import User from './user';
import VendorTop from 'src/components/account/vendor-top';
import CreateCompanyForm from 'src/components/aaa-components/create-company-form';
import CreateReferenceForm from 'src/components/aaa-components/create-reference-form';
import AnswerCustomQuestionForm from 'src/components/aaa-components/answer-custom-question-form';
import AcceptTandC from "src/components/aaa-components/accept-tandc";

function Register () {
    const [ready, setReady] = useState(false);
    const [vendorId, setVendorId] = useState('625817c19f4a776729903cf7');
    const [user, setUser] = useState('');
    const [referenceArray, setReferenceArray] = useState([]);
    const [userDiv, setUserDiv] = useState(false);
    const [companyDiv, setCompanyDiv] = useState(true);
    const [referenceDiv, setReferenceDiv] = useState(true);
    const [customQuestionDiv, setCustomQuestionDiv] = useState(true);
    const [tandcDiv, settandcDiv] = useState(true);
    const [creditAppId, setCreditAppId] = useState('');

    async function checkStage() {

        const userRes = await Axios.get(`${domain}/user/isLoggedIn`);
        if(!userRes.data) {
            setReady(true);
            return;
        }

    const userDetails = await Axios.get(`${domain}/user`);
        if(!userDetails.data.companyId){
            setUserDiv(true);
            setCompanyDiv(false);
            setReady(true);
            return;
        }
        let referenceArray = await Axios.get(`${domain}/reference/company/${userDetails.data.companyId}`);
        if(referenceArray.data[0].referenceEmail == " "){
            setUser(userDetails.data);
            setReferenceArray(referenceArray);
            setUserDiv(true);
            setCompanyDiv(true);
            setReferenceDiv(false);
            setReady(true);
            return;
        }
        else {
            setUser(userDetails.data);
            setReferenceArray(referenceArray);
            setUserDiv(true);
            setCompanyDiv(true);
            setReferenceDiv(true);
            setCustomQuestionDiv(false);
            setReady(true);
        }
    }

useEffect(() =>{
    checkStage();
}, []);

if(!ready) return null;
    return (
      <>
        <Box
          component="main"
          sx={{
            display: 'flex',
            flexGrow: 1,
            minHeight: '100%'
          }}
        >
          <Container maxWidth="lg">
          <VendorTop vendorId = {vendorId}/>
          <div hidden={userDiv}>
          <User hide={setUserDiv} next={setCompanyDiv}/>
          </div>
          <div hidden={companyDiv}>
          <CreateCompanyForm hide={setCompanyDiv} next={setReferenceDiv}/>
          </div>
          <div hidden={referenceDiv}>
          <CreateReferenceForm user={user} referenceArray={referenceArray} hide={setReferenceDiv} next={setCustomQuestionDiv}/>
          </div>
          <div hidden={customQuestionDiv}>
          <AnswerCustomQuestionForm user={user} vendorId={vendorId} hide={setCustomQuestionDiv} next={settandcDiv} dataToNext={setCreditAppId}/>
          </div>
          <div hidden={tandcDiv}>
          <AcceptTandC user={user} vendorId={vendorId} creditAppId={creditAppId}/>
          </div>
          </Container>
      </Box>
    </>
    );
}
export default Register;