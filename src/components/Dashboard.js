import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CreateProfil from './CreateProfil';
import Launch from './Launch';
import TopDashboard from './TopDashboard';
import { useContractRead } from 'wagmi';
import { useProvider } from 'wagmi';
import profilInterface from "../contracts/Profil.json";
import exchangeInterface from "../contracts/Exchange.json"
import {useAccount} from "wagmi";
import Bottomdashboard from './Bottomdashboard';


let name; 
let youtubeLink;
let instaLink; 
let snapLink
let twitterLink; 
let tiktokLink; 
let onlyfansLink; 
let tokenBalance;


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

  const [Show, setShow] = useState(false)

  const showMenu = () => {
    setShow(true);
  }

  const hideMenu = () => {
    setShow(false);
  }

  
 
  //var userNotConnected;
  console.log(window.innerWidth);

  if (window.innerWidth >= 930 && isDisconnected === false && data !== undefined) {
      return (
        <Container>
          <TopDashboard />
          <Launch />
        </Container>
      )
  }
  else if (window.innerWidth >= 930 && isDisconnected === false && data == undefined){
    return (
       <Container>
          <CreateProfil />
        </Container>
    )
  }
  else if (window.innerWidth >= 930) {
      return (
        <Container>
          <CreateProfil />
        </Container>
      )
    }
    else if (window.innerWidth < 930 && isDisconnected === false && data !== undefined) {
      return(
        <Wrap>
        <MenuBox onClick={showMenu}>Menu</MenuBox>
        {Show == true &&
          <MenuWrapper>
            <CloseButton onClick={hideMenu}>Close</CloseButton>
            <Container>
            <TopDashboard />
            <Launch />
            </Container>
          </MenuWrapper>
        }
        </Wrap>
      )
    }

    else if (window.innerWidth < 930 && isDisconnected === false && data == undefined) {
      return (
        <Wrap>
        <MenuBox onClick={showMenu}>Menu</MenuBox>
        {Show == true &&
          <MenuWrapper>
            <CloseButton onClick={hideMenu}>Close</CloseButton>
            <Container>
            <CreateProfil />
            </Container>
          </MenuWrapper>
        }
        </Wrap>
      )
    }
    else {
      return (
        <Wrap>
        <MenuBox onClick={showMenu}>Menu</MenuBox>
        {Show == true &&
          <MenuWrapper>
            <CloseButton onClick={hideMenu}>Close</CloseButton>
            <Container>
            <CreateProfil />
            </Container>
          </MenuWrapper>
        }
        </Wrap>
      )
    }
  }


export default Dashboard

// <TopDashboard />
const Container = styled.div`
  height: 600px;
  width: 300px;
  background: #3B3395;
  position: fixed; 
  right: 30px;
  top: 100px;
  border-radius: 50px;
  display: flex; 
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  @media(max-width: 930px) {
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto;
    top: 90px;
    position: relative;
  }
`;

const MenuBox= styled.div`
  height :60px; 
  width: 140px; 
  background: #3B3395;
  position: absolute;
  top: 120px;
  right:0;
  border-top-left-radius: 100px; 
  border-bottom-left-radius: 100px;
  display: flex; 
  justify-content: center;
  align-items: center;
  color: #FFFFFF; 
  font-family: abril fatface; 
  font-size: 30px;
  font-weight: 300;
  cursor: pointer; 
  &:hover {
    background: #212121; 
  }
`;

const CloseButton = styled.div`
  height :60px; 
  width: 140px; 
  background: #3B3395;
  position: absolute;
  top: 10px;
  right:0;
  border-top-left-radius: 100px; 
  border-bottom-left-radius: 100px;
  display: flex; 
  justify-content: center;
  align-items: center;
  color: #FFFFFF; 
  font-family: abril fatface; 
  font-size: 30px;
  font-weight: 300;
  cursor: pointer; 
  &:hover {
    background: #212121; 
  }
`;

const Wrap = styled.div``;

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

const MenuWrapper = styled.div`
  position: absolute; 
  height: 100vh; 
  width: 100vw; 
  z-index: 6;
  top: 0; 
  left: 0;
  background: rgba( 33, 33, 33, 0.25 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 6px );
  -webkit-backdrop-filter: blur( 6px );
  //border: 1px solid rgba( 255, 255, 255, 0.18 );
`; 

