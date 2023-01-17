import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useContractRead } from 'wagmi';
import { useProvider } from 'wagmi';
import {useAccount} from "wagmi";
import { useBalance } from 'wagmi';
import exchangeInterface from "../contracts/Exchange.json"

let myBalance; 

function Bottomdashboard() {

  const provider = useProvider();
  const {address, isConnecting, isDisconnected} = useAccount();


  /*const {data, isError, isLoading} = useContractRead({
    address: '0x09d68de4A710dD5c7fE5f891C686667B7fD23849', 
    abi: exchangeInterface, 
    functionName: 'getBalanceFrom', 
    signerOrProvider: provider,
    args: [address], //address of the user
    watch: true,
  })*/

  /*useEffect(() => {
    myBalance = data.toString();
  })*/

  const {data, isError, isLoading} = useBalance({
    address: address,
    token: "0x3a21a35a4edfd3c2edbb9cd2c2e7cbbbbd9ee01b",
    formatUnits: "ether",
  })

  //console.log(data.toString())

  return (
    <Container>
      <Box></Box>
      <Box></Box>
      <Box></Box>
      <Box></Box>
      <Box></Box>
      <Box></Box>
      <Box></Box>
    </Container>
  )
}

export default Bottomdashboard

const Container = styled.div`
  height: 60%; 
  width: 100%;
  border-radius: 40px;
  padding: 10px; 
  overflow: scroll;
  background: #DCCFAC;
  //display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  height: 80px; 
  width: 100%; 
  background: transparent;
  border-radius: 30px;
  position: relative;
  margin-bottom: 10px;
  border: solid 2px #3B3395;
  &:hover {
    background: #3B3395;
  }
`; 

const Row = styled.div`
  height: 60px; 
  width: 100%; 
  background: transparent;
  display: flex; 
  flex-direction: column; 
  justify-content: space-between;
  position: relative;
`; 

const LeftBox = styled.div`
  max-width: 60%; 
  width: auto; 
  height: 100%;
  border-radius: 100px;
  background: transparent;
  overflow: hidden;
  display: flex; 
  flex-direction: row;
  align-items: center;
  padding-right: 5px;
  padding-left: 5px;
  border: solid 1px #3B3395;
  color: #3B3395;
  &:hover {
    position: absolute;
    max-width: 100%; 
    width: 100%;
    background: #FFFFFF;
  }
`;

const RightBox = styled.div`
  max-width: 35%; 
  width: auto; 
  height: 100%;
  border-radius: 100px;
  background: #3B3395;
  overflow: hidden;
  display: flex; 
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  border: solid 1px #3B3395;
  color: #FFFFFF;
  &:hover {
    position : absolute; 
    max-width: 100%;
    width: 100%;
    overflow: scroll;
  }
`;

const Currency = styled.text`
  font-family: abril fatface; 
  font-weight: 300; 
  font-size: 25px;
`; 

const Address = styled.text`
  font-family: roboto mono; 
  font-size: 15px; 
  font-weight: 300; 
  color: #DCCFAC;
  margin-left: 10px;
`;

const Amount = styled.text`
  font-family: roboto mono; 
  font-weight: 300; 
  font-size: 30px;
`;