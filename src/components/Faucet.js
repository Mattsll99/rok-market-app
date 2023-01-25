import React from 'react'
import styled from 'styled-components'
import { usePrepareContractWrite } from 'wagmi';
import { useContractWrite } from 'wagmi';
import { useProvider } from 'wagmi';
import ROKInterface from "../contracts/ROK.json"


function Faucet() {

  const provider = useProvider();

  const {config} = usePrepareContractWrite({
    address: '0xa2640d174DC8a343D54546ed47EBdb85B467CF9e', 
    abi: ROKInterface, 
    functionName: 'faucet', 
    signerOrProvider: provider,
  })

  const {data, isLoading, isSuccess, write} = useContractWrite(config);
  
  const getROK = () => {
    write()
  }
  

  return (
    <Container onClick={getROK}>Get ROK</Container>
  )
}

export default Faucet

const Container = styled.div`
  height: 60px; 
  width: 160px; 
  border-radius: 100px; 
  background: transparent;
  display: flex;
  justify-content: center; 
  align-items: center; 
  font-family: abril fatface; 
  font-weight: 300; 
  font-size: 25px; 
  //border: solid 2px #3B3395;
  background: #3B3395;
  color: #FFFFFF;
  cursor: pointer; 
  &:hover {
    background: #212121;
  }
`;