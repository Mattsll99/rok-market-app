import React, { useState } from 'react'
import styled from 'styled-components';
import { useProvider } from 'wagmi'
import { useAccount } from 'wagmi'
import exchangeInterface from '../contracts/Exchange.json';
import { ethers } from 'ethers';
import { erc20ABI } from 'wagmi';
import { useSigner } from 'wagmi';
import { useContract } from 'wagmi';
import { usePrepareContractWrite, useContractWrite } from 'wagmi'


function SellProposal({creatorAddress, tokenAddress, symbol, price}) {

  const[sellOffer, setSellOffer] = useState("0");
  const[sellOfferAmount, setSellOfferAmount] = useState("0");

  const { data: signer, isSignerError, isSignerLoading } = useSigner()

  const creatorToken = useContract({
    address: tokenAddress, 
    abi: erc20ABI, 
    signerOrProvider: signer
  })
  
  const {config} = usePrepareContractWrite({
    address: '0x0d719247AdA0053c7aD37AB4B1Da5FaE1e2a9151', 
    abi: exchangeInterface,  
    functionName: 'makeSellProposal', 
    signerOrProvider: signer,
    args: [creatorAddress,
      (typeof sellOffer !== 'undefined' && sellOffer.toString() !=="")? ethers.utils.parseEther(sellOffer).toString() : "0",
      (typeof sellOfferAmount !== 'undefined' && sellOfferAmount.toString() !=="")? ethers.utils.parseEther(sellOfferAmount).toString() : "0" ],
  })

  const {data, isLoading, isSuccess, write} = useContractWrite(config);

  async function handleSellOffer() {
    const result = await creatorToken.connect(signer).approve('0x0d719247AdA0053c7aD37AB4B1Da5FaE1e2a9151', ethers.utils.parseEther(sellOfferAmount).toString())
    await result.wait();
    const transaction = await write();
    await transaction.wait();
  }


  return (
    <Right>
      <TopRight>Sell</TopRight>
        <RowRight value={sellOfferAmount} placeholder="0" onChange={(e) => setSellOfferAmount(e.target.value)}></RowRight>
        <Text>{symbol} for</Text>
        <RowRight value={sellOffer} placeholder = "0" onChange={(e) => setSellOffer(e.target.value)}></RowRight>
        <Text>ROK</Text>
        <Validate onClick={handleSellOffer}>Validate</Validate>
    </Right>
  )
}

export default SellProposal

const Right = styled.div`
  height: 100%; 
  width: 50%; 
  //border-right: solid 1px #FFFFFF;
  display: flex; 
  flex-direction: column;
  align-items: center;
`; 

const TopRight = styled.div`
  height: 20%; 
  width: 100%; 
  display: flex; 
  justify-content: center;
  align-items: center;
  font-family: roboto mono; 
  font-size: 30px; 
  font-weight: 300; 
  color: #FFFFFF;
`;

const Text = styled.text`
  margin-top: 20px; 
  font-size: 25px; 
  font-weight: 300; 
  font-family: roboto mono; 
  color: #FFFFFF;
`;

const RowRight = styled.input`
  margin-top: 15px;
  height: 15%; 
  width: 80%;
  background: transparent; 
  font-size: 25px; 
  color: #FFFFFF;
  border-radius: 100px;
  border: dashed 2px #FFFFFF;
  font-family: roboto mono; 
  font-weight: 300;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Validate = styled.div`
  height: 50px; 
  width: 150px; 
  background: transparent; 
  border-radius: 100px;
  border: solid 2px #FFFFFF; 
  color: #FFFFFF;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  font-family: roboto mono; 
  font-size:25px; 
  margin-top: 20px; 
  font-weight: 300;
  cursor: pointer;
  &:hover {
    background: #FFFFFF; 
    color: #212121;
  }
`; 