import React, {useState} from 'react'
import styled from 'styled-components'
import {usePrepareContractWrite, useContractWrite, useSigner} from 'wagmi';
import ExchangeInterface from '../contracts/Exchange.json';
import {useProvider} from 'wagmi'
import {useFeeData} from 'wagmi'
import { BigNumber, ethers } from 'ethers';
import { formatUnits, parseEther } from 'ethers/lib/utils.js';

var formatedSupply; 
var formatedKeep;
var formatedPrice;

const to1E8 = BigNumber.from('10000000000');



function Launch() {


  const provider = useProvider();
  const signer = useSigner()

  const [name, setName] = useState(""); 
  const [symbol, setSymbol] = useState(""); 
  const [supply, setSupply] = useState("0.0"); 
  const [keep, setKeep] = useState("0.0");     
  const [price, setPrice] = useState("0.0");

  const test = ethers.utils.parseEther(supply).toString();
  console.log(test);

  const digitKeep = (keep/100).toString();
  
  var formatedSupply;
  if (supply === "") {
    supply = "0";
  } else {
    formatedSupply = supply;
  }
  
  const handleSupply = (event) => {
    if(event === "") {
      event = "0"
    } else {
      setSupply(event.target.value)
    }
  }

  const {config} = usePrepareContractWrite({
    address: '0x6f1061a30609842457288C26bF84513702d2b17c', 
    abi: ExchangeInterface, 
    functionName: 'launchToken', 
    signerOrProvider: provider,
    args: [name, symbol, ethers.utils.parseEther(supply || "0").toString(), ethers.utils.parseEther(digitKeep).toString(), ethers.utils.parseEther(price).toString()],
  })

  const {data, isLoading, isSuccess, write} = useContractWrite(config);

  const launchMyToken = () => {
    write()
  }
  

  return (
    <Container>
      <Top>
        <Title>Launch Token</Title>
      </Top>
      <Row>
        <Input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
      </Row>
      <Row2>
      <Input placeholder='Symbol' value={symbol} onChange={(e) => setSymbol(e.target.value)}/>
      </Row2>
      <Row>
      <Input placeholder="Supply" value={supply} onChange={handleSupply}/>
      </Row>
      <Row2>
      <Input placeholder='You keep (max 10%)' value={keep} onChange={(e) => setKeep(e.target.value)}/>
      </Row2>
      <Row>
      <Input placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)}/>
      </Row>
      <Row>
        <Button onClick={launchMyToken}>Validate</Button>
      </Row>
    </Container>
  )
}

export default Launch

const Container = styled.div`
  height: 60%; 
  width: 100%;
  border-radius: 40px;
  border: dashed 2px #FFFFFF;
  padding: 10px; 
  overflow: scroll;
`;

const Top = styled.div`
  height: 20%;
  width: 100%; 
  border-radius: 100px;
  background: #FFFFFF;
  color: #212121;
  display: flex; 
  justify-content: center; 
  align-items: center;
`; 

const Title = styled.text`
  font-family: abril fatface; 
  font-size: 30px; 
  background: transparent;
  font-weight: 200;
`; 

const Row = styled.div`
  width: 100%; 
  height: 13%; 
  margin-top: 10px;
  display: flex; 
  flex-direction: row;
  justify-content: start;
  position: relative;
`; 

const Row2 = styled(Row)`
  justify-content: end;
`;

const Input = styled.input`
  height: 100%; 
  width: auto;
  //height: 60px;
  width: 160px;
  border-radius: 100px;
  background: transparent; 
  border: dashed 2px #FFFFFF;
  font-family: abril fatface; 
  font-size: 25px;
  padding: 10px; 
  color: #FFFFFF;
  decoration: none;
  text-align: center;
  font-weight: 300;
  &:hover {
    width: 100%;
    background: #FFFFFF;
    color: #212121;
  }
`;

const Button = styled.div`
  height: 100%; 
  width: 60%;
  position : absolute; 
  right: 0;
  border-radius: 100px;
  background: rgb(219,0,91);
  background: linear-gradient(137deg, rgba(219,0,91,1) 0%, rgba(209,86,26,1) 33%, rgba(0,11,255,1) 100%, rgba(255,0,247,1) 100%);   
  display: flex; 
  justify-content: center; 
  align-items: center;
  color: #FFFFFF; 
  cursor: pointer; 
  font-size: 30px; 
  font-family: abril fatface; 
  font-weight: 300;
  &:hover {
    background: #212121;
  }
`;