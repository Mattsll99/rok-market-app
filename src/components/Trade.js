import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BuyToken from './BuyToken';
import SellToken from './SellToken';
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { useProvider } from 'wagmi'
import { useAccount } from 'wagmi'
import exchangeInterface from '../contracts/Exchange.json';
//import MATICInterface from '../contracts/MATIC.json'
import ROKInterface from '../contracts/ROK.json'
import { ethers } from 'ethers';
import { erc20ABI } from 'wagmi';
import { useSigner } from 'wagmi';
import { useContract } from 'wagmi';
import  SellProposal  from './SellProposal';


function Trade({creatorAddress, tokenAddress, symbol, price}) {


  const[buy, setBuy] = useState(true); 
  const [sell, setSell] = useState(false);

  const[buyOffer, setBuyOffer] = useState("0"); 
  const[buyOfferAmount, setBuyOfferAmount] = useState("0");


  const [isHidden, setIsHidden] = useState(true);

  const[showOffer, setShowOffer] = useState(false);

  const { data: signer, isSignerError, isSignerLoading } = useSigner()

  const hideTrade = () => {
    setIsHidden(false);
  }

  const buyRoute = () => {
    setBuy(true);
    setSell(false);
  }

  const sellRoute = () => {
    setSell(true);
    setBuy(false);
  }

  const handleOffer = () => {
    setShowOffer(true);
  }

  const ROK = useContract({
    address: '0xa2640d174DC8a343D54546ed47EBdb85B467CF9e', 
    abi: erc20ABI, 
    signerOrProvider: signer
  })


  const {config} = usePrepareContractWrite({
    address: '0x1Dc419f50b9192927cA34f4b4C96c13814b365B7', 
    abi: exchangeInterface, 
    functionName: 'makeBuyProposal', 
    signerOrProvider: signer,
    args: [creatorAddress,
      (typeof buyOffer !== 'undefined' && buyOffer.toString() !=="")? ethers.utils.parseEther(buyOffer).toString() : "0",
      (typeof buyOfferAmount !== 'undefined' && buyOfferAmount.toString() !=="")? ethers.utils.parseEther(buyOfferAmount).toString() : "0" ],
  })
  
  const {buyData, isBuyLoading, isBuySuccess, write} = useContractWrite(config);

  const toPay = buyOffer * buyOfferAmount;
  const formatedPay = toPay.toString();



 

  async function handleBuyOffer() {
    const result = await ROK.connect(signer).approve('0x1Dc419f50b9192927cA34f4b4C96c13814b365B7', ethers.utils.parseEther('1000').toString())
    await result.wait();
    const transaction = await write();
    await transaction.wait();
  }


  return (
    <Above onClick = {hideTrade}> 
    {hideTrade === false }
    <Container>
      <Background onClick={handleOffer}>
        <BigTitle>Make an offer</BigTitle>
      </Background>
      {showOffer === true &&
        <OfferWrapper>
          <Left>
            <TopLeft>Buy</TopLeft>
            <RowLeft value={buyOfferAmount} placeholder = "0" onChange={(e) => setBuyOfferAmount(e.target.value)}></RowLeft>
            <Text>{symbol} for</Text>
            <RowLeft value={buyOffer} placeholder="0" onChange={(e) => setBuyOffer(e.target.value)}></RowLeft>
            <Text>ROK</Text>
            <Validate onClick={handleBuyOffer}>Validate</Validate>
          </Left>
          <SellProposal 
            creatorAddress={creatorAddress}
            tokenAddress={tokenAddress}
            symbol={symbol}
            price={price}
          />
        </OfferWrapper>
      }
      <Wrapper>
        <Top>
          <Title onClick={buyRoute}>Buy</Title>
          <Title onClick={sellRoute}>Sell</Title>
        </Top>
        <Body>
          {buy === true && <BuyToken creatorAddress={creatorAddress} tokenAddress={tokenAddress} symbol = {symbol } price={price}/>}
          {sell === true && <SellToken creatorAddress={creatorAddress} tokenAddress={tokenAddress} symbol = {symbol } price={price}/>}
        </Body>
      </Wrapper>
    </Container>
    </Above>
  )
}

export default Trade

const Container = styled.div`
  height: 100vh; 
  width: 100vw; 
  background: #212121; 
  position: fixed; 
  z-index: 4; 
  top: 0;
  left:0;
  background: rgba( 33, 33, 33, 0.25 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 6px );
  -webkit-backdrop-filter: blur( 6px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  display: flex; 
  justify-content: center; 
  align-items: center;
  overflow-y: scroll;
`; 

const Above = styled.div``;

const OfferWrapper = styled.div`
  height: 400px; 
  width: 600px; 
  background: #212121;
  border: solid 4px #FFFFFF;
  border-radius: 50px; 
  position: absolute; 
  margin-top: -120px;
  display: flex; 
  padding: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 6;
  display: flex;
  flex-direction: row;
`; 

const TopLeft = styled.div`
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

const Text = styled.text`
  margin-top: 20px; 
  font-size: 25px; 
  font-weight: 300; 
  font-family: roboto mono; 
  color: #FFFFFF;
`;



const RowLeft = styled.input`
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



const Left = styled.div`
  height: 100%; 
  width: 50%; 
  border-right: solid 1px #FFFFFF;
  display: flex; 
  flex-direction: column;
  align-items: center;
`; 



const Background = styled.div`
  height: 400px; 
  width: 600px; 
  background: #FFFFFF;
  border-radius: 50px;
  border: dashed 2px #3B3395;
  color: #3B3395;
  position: relative;
  cursor: pointer;
  &:hover {
    background: #212121;
    color: #FFFFFF; 
  }
  @media(max-width: 644px) {
    width: 95%;
  }
  @media(max-width: 519px) {
    width: 500px;
    margin-top: 140px;
  }
`; 

const BigTitle = styled.text`
  font-weight: 300; 
  font-size: 30px; 
  font-family; abril fatface; 
  position: absolute; 
  bottom: 10px; 
  left:0; 
  right:0; 
  margin-left: auto; 
  margin-right: auto;
`;

const Wrapper = styled.div`
  height: 400px; 
  width: 600px; 
  background: #3B3395;
  border-radius: 50px; 
  position: absolute; 
  margin-top: -120px;
  display: flex; 
  padding: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 5;
  @media(max-width: 644px) {
    width: 95%;
  }
  @media(max-width: 519px) {
    width: 500px;
    margin-top: 10px;
  }
`; 

const Top = styled.div`
  height: 15%; 
  width: 30%; 
  display: flex; 
  flex-direction: row; 
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #FFFFFF;
  padding: 20px; 
`;

const Title = styled.text`
  font-family: roboto mono; 
  font-weight: 300; 
  color: #212121;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: #FFFFFF; 
  }
`;

const Body = styled.div`
  height: 80%;
  width: 100%;
`;

