import React, { useEffect } from 'react'; 
import styled from 'styled-components'
import { useContractRead } from 'wagmi';
import { useProvider } from 'wagmi';
import profilInterface from "../contracts/Profil.json";
import {useAccount} from "wagmi";
import { hexDataLength } from 'ethers/lib/utils.js';

const contractAddress = process.env.NEW_PROFIL;

let youtubeLink;
let instaLink; 
let twitterLink; 
let tiktokLink; 
let twitchLink; 
let onlyfansLink; 
let patreonLink;

function Registerd() {

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

  

  useEffect(() => {
    youtubeLink = data._youtubeLink; 
    instaLink = data._instaLink; 
    twitterLink = data._twitterLink; 
    tiktokLink = data._tiktokLink; 
    twitchLink = data._twitchLink; 
    onlyfansLink = data._onlyfansLink; 
    patreonLink = data._patreonLink;
  }, [])

  return (
    <Container>
      <LeftContainer>
      <Wrapper>
        <TopWrap>{data._name}</TopWrap>
        <BodyWrap>
          <Link href={youtubeLink}><Capsule>Youtube</Capsule></Link>
          <Link href={data._instaLink}><Capsule>Instagram</Capsule></Link>
          <Link href={data._twitterLink}><Capsule>Twitter</Capsule></Link>
          <Link href={data._tiktokLink}><Capsule>Tiktok</Capsule></Link>
          <Link href={data._twitchLink}><Capsule>Twitch</Capsule></Link>
          <Link href={data._onlyfansLink}><Capsule>Onlyfans</Capsule></Link>
          <Link href={data._patreonLink}><Capsule>Patreon</Capsule></Link>
        </BodyWrap>
      </Wrapper>
      
      </LeftContainer>
      <RightContainer>
      <Title>Expose your work</Title>
      <Subtitle>(Coming very soon)</Subtitle>
      <Expose>
        <Top>
          <Left>Your last thread on Twitter</Left>
          <Right>
            <Box>Your fav post on Instagram</Box>
          </Right>
        </Top>
        <Body>
          <Row>
            <LittleBox>Your most viral tiktok</LittleBox>
            <LittleBox>Your most watched live on Twitch</LittleBox>
            <LittleBox style={{fontSize: "40px"}}>It's</LittleBox>
          </Row>
          <Row>
            <LittleBox style={{fontSize: "40px"}}>Up</LittleBox>
            <LittleBox style={{fontSize: "40px"}}>To</LittleBox>
            <LittleBox style={{fontSize: "40px"}}>You</LittleBox>
          </Row>
        </Body>
      </Expose>
      </RightContainer>
    </Container>
  )
}

export default Registerd

const Container = styled.div`
  width: 100vw; 
  height: auto;
  position: relative;
  margin-top: 80px;
  display: flex; 
  flex-direction: row;
  background: #DCCFAC;
  @media(max-width: 860px) {
    //margin-top: 0;
    //margin-top: -500px;
    flex-direction: column;
  }
  //display: flex; 
`;

const LeftContainer = styled.div`
  //position: relative;
  height: 300px;
  width: 50%;
  display: flex;
  @media(max-width: 860px) {
    width: 100%;
    //background: green;
    height: auto;
    justify-content: center;
    //background: green;
  }
`; 

const RightContainer = styled.div`
  position: relative;
  height: 700px; 
  width: 50%;
  display: flex; 
  flex-direction: column; 
  justify-content: center;
  @media(max-width: 860px) {
    width: 100%;
    background: transparent;
    align-items: center;
  }
`;

const Link = styled.a`
  text-decoration: none;
`; 

const TopWrap = styled.div`
  height: 20%; 
  width: 100%; 
  background: transparents;
  display: flex;
  padding-left: 20px;
  font-family: abril fatface; 
  font-size: 40px; 
  color: #FFFFFF; 
  font-weight: 300; 
  background: #3B3395;
`;

const BodyWrap = styled.div`
  height: 80%; 
  width: 100%;
  display: flex; 
  flex-direction: column;
`; 

const Capsule = styled.div`
  margin-top: 10px;
  height: fit-content; 
  background: #FFFFFF;
  color: #3B3395;
  //width: 20px; 
  width: fit-content;
  border-radius: 100px;
  font-family: abril fatface; 
  font-weight: 300;
  padding: 10px; 
  font-size: 30px; 
  font-weight: 300;
  cursor: pointer; 
  &:hover {
    background: rgb(0,13,219);
    background: linear-gradient(121deg, rgba(0,13,219,1) 0%, rgba(218,56,0,1) 35%, rgba(255,0,247,1) 100%);
    color: #FFFFFF;
  }
`; 


const Title = styled.text`
  background: transparent; 
  font-family: abril fatface; 
  font-size: 60px;
  //font-size: 5vw;
  //position: absolute;
  //top: -130px;
  //margin-left: 30px;
  color: #3B3395;
  @media(max-width: 500px) {
    font-size: 10vw;
  }
`; 

const Subtitle = styled.text`
  background: transparent; 
  font-family: abril fatface; 
  font-size: 20px; 
  color: #74623F;
  //position: absolute;
  //top: -40px;
  //margin-left: 190px;
`; 

const Wrapper = styled.div`
  height: 400px; 
  width: 37vw;
  border-radius: 50px;
  background: #3B3395;
  position: fixed; 
  //top: 350px; 
  left: 10%;
  display: flex; 
  flex-direction: column;
  padding: 10px;
  overflow: scroll;
  @media(max-width: 860px) {
    position: relative;
    top: 0;
    left: 0;
    width: 50%;
  }
  @media(max-width: 500px) {
    width: 90%;
  }
`; 

const Expose = styled.div`
  //height: 800px; 
  //width: 600px;
  height: auto;
  //width: 40%; 
  width: 90%;
  background: transparent;
  //position: relative; 
  //left: 50%;
  border-radius: 50px;
  border: dashed 4px #3B3395;
  display: flex;
  padding: 10px;
  flex-direction: column;
  @media(max-width: 1048px ) {
    //left: 55%;
    //margin-left: 40px;
    width: 417px;
  }
  @media(max-width: 860px) {
    //margin-top: 600px;
  }
  @media(max-width: 500px) {
    width: 417px;
  }
`; 

const Wrap = styled.div`
  position: relative; 
  height: 100%; 
  width: 100%; 
  background: transparent; 
  padding: 10px;
`; 

const Top = styled.div`
  background: transparent; 
  height: 200px; 
  width: 100%;
  display: flex; 
  flex-direction: row;
`; 

const Left = styled.div`
  height: 100%; 
  width: 60%; 
  background: #3B3395; 
  border-radius: 40px;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  font-family: abril fatface; 
  font-size: 40px;
  text-align: center;
  color: #FFFFFF;
  font-weight: 300;
  cursor: pointer;
  &:hover {
    background: rgb(0,13,219);
    background: linear-gradient(121deg, rgba(0,13,219,1) 0%, rgba(218,56,0,1) 35%, rgba(255,0,247,1) 100%);
  }
`;

const Right = styled.div`
  height: 100%; 
  width: 40%; 
  display: flex; 
  flex-direction: column;
  padding-left: 10px;
  justify-content: space-between;
`;

const Box = styled.div`
  height: 100%; 
  width: 100%;
  border-radius: 50px; 
  background: #3B3395;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  font-family: abril fatface; 
  font-size: 30px;
  text-align: center;
  font-weight: 300; 
  color: #FFFFFF;
  cursor: pointer;
  &:hover {
    background: rgb(0,13,219);
    background: linear-gradient(121deg, rgba(0,13,219,1) 0%, rgba(218,56,0,1) 35%, rgba(255,0,247,1) 100%);
  }
`; 

const Body = styled.div`
  width: 100%; 
  height: auto;
`; 

const Row = styled.div`
  width: 100%; 
  height: 150px; 
  background: transparent;
  margin-top: 10px;
  display: flex; 
  flex-direction: row; 
  justify-content: space-between;
`;

const LittleBox = styled.div`
  height: 100%; 
  width: 32%; 
  background: #3B3395; 
  border-radius: 30px;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  text-align: center;
  font-family: abril fatface; 
  font-size: 22px; 
  color: #FFFFFF;
  font-weight: 300; 
  cursor: pointer;
  &:hover {
    background: rgb(0,13,219);
    background: linear-gradient(121deg, rgba(0,13,219,1) 0%, rgba(218,56,0,1) 35%, rgba(255,0,247,1) 100%);
  }
`;