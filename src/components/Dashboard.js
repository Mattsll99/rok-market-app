import React, { useEffect } from 'react'
import styled from 'styled-components'
import CreateProfil from './CreateProfil';
import Launch from './Launch';
import TopDashboard from './TopDashboard';
import { useContractRead } from 'wagmi';
import { useProvider } from 'wagmi';
import profilInterface from "../contracts/Profil.json";
import {useAccount} from "wagmi";
import Bottomdashboard from './Bottomdashboard';

let name; 
let youtubeLink;
let instaLink; 
let snapLink
let twitterLink; 
let tiktokLink; 
let onlyfansLink; 


function Dashboard() {

  const provider = useProvider();
  const {address, isConnecting, isDisconnected} = useAccount();

  
  const {data, isError, isLoading} = useContractRead({
    address: '0xBbB9CEfBcf0f4B2527Dc147840642d8Efdf55235', 
    abi: profilInterface, 
    functionName: 'seeProfil', 
    signerOrProvider: provider,
    args: [address], //address of the user
    watch: true,
  })

  /*useEffect(() => {
    if (isDisconnected === false) {
      name = data._name;
      youtubeLink = data._youtubeLink;
      instaLink = data._instaLink; 
      twitterLink = data._twitterLink; 
      tiktokLink = data._tiktokLink; 
      onlyfansLink = data._onlyfansLink; 
    } else {
      name =""; 
      youtubeLink = ""; 
      instaLink = ""; 
      twitterLink = ""; 
      tiktokLink = ""; 
      onlyfansLink = "";
    }
  }, [])*/

  /*name = data._name;
  youtubeLink = data._youtubeLink;
  instaLink = data._instaLink; 
  twitterLink = data._twitterLink; 
  tiktokLink = data._tiktokLink; 
  onlyfansLink = data._onlyfansLink; */
  var userNotConnected;

 
  /*if(userNotConnected=== true) {
    return (
      <Container>
        <CreateProfil />
      </Container>
    )
  }*/
  if (isDisconnected === false && name !=="") {
      return (
        <Container>
          <TopDashboard />
          <Launch />
        </Container>
      )
  }
  else {
      return (
        <Container>
          <CreateProfil />
        </Container>
      )
    }
  }


export default Dashboard

const Container = styled.div`
  height: 600px;
  width: 300px;
  background: #3B3395;
  position: fixed; 
  right: 30px;
  top: 150px;
  border-radius: 50px;
  display: flex; 
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;

const Button = styled.div`
  height: 50px; 
  width: 150px; 
  position : absolute; 
  bottom:10px; 
  right: 10px; 
  border-radius: 100px;
  background: rgb(219,0,91);
  background: linear-gradient(137deg, rgba(219,0,91,1) 0%, rgba(209,86,26,1) 33%, rgba(0,11,255,1) 100%, rgba(255,0,247,1) 100%);   
  display: flex; 
  justify-content: center; 
  align-items: center;
  color: #FFFFFF;
`; 

const Line = styled.div`
  width: 100%; 
  height: 50px; 
  margin-top: 20px;
  position: relative;
  display: flex; 
  align-items: center;
  justify-content: start;
`;

const Line2 = styled(Line)`
  justify-content: end;
`;

const Title = styled.text`
  background: transparent; 
  font-size: 35px; 
  font-weight: 500; 
  font-family: abril fatface;
  color: #FFFFFF;
`; 

const Wrapper = styled.div`
  margin-top: 80px;
  width: 100%; 
  height: 78%;
  border-radius: 40px;
  border: dashed 3px #FFFFFF;
  position: relative;
  padding: 10px;
  display: flex; 
  flex-direction: column;
  //justify-content: space-between;
`;

const Cover = styled.div`
  height: auto; 
  display: inline-block;
  //box-sizing: border-box;
  padding: 10px; 
  background: #FFFFFF;
  border-radius: 100px;
  color: #212121;
`;

const Subtitle = styled.text`
font-family: abril fatface; 
font-size: 25px; 
font-weight: 300; 
`; 

const Text = styled.text`
  font-family: abril fatface; 
  font-size: 30px; 
  font-weight: 400;
  margin-top: 20px;
`;