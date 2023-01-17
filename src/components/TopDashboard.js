import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useContractRead } from 'wagmi';
import { useProvider } from 'wagmi';
import profilInterface from "../contracts/Profil.json";
import {useAccount} from "wagmi";

let name;
let youtubeLink;
let instaLink; 
let twitterLink; 
let tiktokLink; 
let onlyfansLink; 

function TopDashboard() {

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
    name = data._name;
    youtubeLink = data._youtubeLink; 
    instaLink = data._instaLink; 
    twitterLink = data._twitterLink; 
    tiktokLink = data._tiktokLink; 
    onlyfansLink = data._onlyfansLink; 
  }, [])

  //console.log(twitterLink);

  return (
   <Container>
    <Top>
      <Title>{name}</Title>
    </Top>
    <Body>
    {instaLink != "" && 
      <Link href={instaLink}>
      <Cover>
        <Text>Instagram</Text>
      </Cover>
      </Link>}
      {tiktokLink != "" && 
      <Link href={tiktokLink}>
      <Cover>
        <Text>Tiktok</Text>
      </Cover>
      </Link>}
      {twitterLink != "" && 
      <Link href={twitterLink}>
      <Cover>
        <Text>Twitter</Text>
      </Cover>
      </Link>}
      {youtubeLink != "" && 
      <Link href={youtubeLink}>
      <Cover>
        <Text>Youtube</Text>
      </Cover>
      </Link>}
      {onlyfansLink != "" && 
      <Link href={onlyfansLink}>
      <Cover>
        <Text>Onlyfans</Text>
      </Cover>
      </Link>}
    </Body>
   </Container>
  )
}

export default TopDashboard

const Container = styled.div`
  width: 100%; 
  height: 35%; 
`; 

const Top = styled.div`
  height: 25%; 
  width:100%; 
  background: green
  display: flex; 
  justify-content: center; 
  align-items: center;
  color: #FFFFFF;
  font-weight: 600;
`;

const Cover = styled.div`
  display: inline-block; 
  width: auto; 
  padding:10px; 
  border: dashed 2px #FFFFFF; 
  background: transparent; 
  color: #FFFFFF; 
  border-radius: 100px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background: #FFFFFF;
    color: #3B3395;
  }
`; 


const Title = styled.text`
  font-family: abril fatface; 
  font-size: 30px; 
  background: transparent;
  font-weight: 200;
`; 

const Text = styled.text`
  font-family: abril fatface; 
  font-size: 25px; 
  background: transparent;
  font-weight: 200;
`;

const Body = styled.div`
  width: 100%; 
  height: 77%; 
  flex-direction: column;
  overflow: scroll;
`; 

const Link = styled.a`
  text-decoration: none;
`;