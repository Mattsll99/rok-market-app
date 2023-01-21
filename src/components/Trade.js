import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BuyToken from './BuyToken';
import SellToken from './SellToken';
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { useProvider } from 'wagmi'
import { useAccount } from 'wagmi'
import exchangeInterface from '../contracts/Exchange.json';
import { ethers } from 'ethers';

function Trade({creatorAddress, tokenAddress,  price}) {
  //Query the tokenAddress
  //Query the seller address; 
  //Query all the buy offers
  //Querry all the sell offers
  //For each row map the right Trade component with the token address

  //Ensuite on utilise creatorAddress pour render data et execution function

  const[buy, setBuy] = useState(true); 
  const [sell, setSell] = useState(false);

  const[buyOffer, setBuyOffer] = useState("0"); 
  const[buyOfferAmount, setBuyOfferAmount] = useState("0");

  const[sellOffer, setSellOffer] = useState("0");
  const[sellOfferAmount, setSellOfferAmount] = useState("0");

  const [isHidden, setIsHidden] = useState(true);

  const[showOffer, setShowOffer] = useState(false);

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

  const provider = useProvider();
  const {address, isConnecting, isDisconnected} = useAccount();

  const {buyConfig} = usePrepareContractWrite({
    address: '0x6f1061a30609842457288C26bF84513702d2b17c', 
    abi: exchangeInterface, 
    functionName: 'makeBuyProposal', 
    signerOrProvider: provider,
    args: [creatorAddress, ethers.utils.parseEther(buyOffer).toString(), ethers.utils.parseEther(buyOfferAmount).toString()],
  })
  
  console.log(creatorAddress)
  const {buyData, isBuyLoading, isSuccess, write} = useContractWrite(buyConfig);

  const handleBuyProposal = () => {
    write()
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
            <RowLeft value={buyOfferAmount} onChange={(e) => setBuyOfferAmount(e.target.value)}></RowLeft>
            <Text>$CARDI for</Text>
            <RowLeft value={buyOffer} onChange={(e) => setBuyOffer(e.target.value)}></RowLeft>
            <Text>MATIC</Text>
            <Validate onClick={handleBuyProposal}>Validate</Validate>
          </Left>
          <Right>
            <TopRight>Sell</TopRight>
            <RowRight value={sellOfferAmount} onChange={(e) => setSellOfferAmount(e.target.value)}></RowRight>
            <Text>$CARDI for</Text>
            <RowRight value={sellOffer} onChange={(e) => setSellOffer(e.target.value)}></RowRight>
            <Text>MATIC</Text>
            <Validate>Validate</Validate>
          </Right>
        </OfferWrapper>
      }
      <Wrapper>
        <Top>
          <Title onClick={buyRoute}>Buy</Title>
          <Title onClick={sellRoute}>Sell</Title>
        </Top>
        <Body>
          {buy === true && <BuyToken creatorAddress={creatorAddress} tokenAddress={tokenAddress} price={price}/>}
          {sell === true && <SellToken />}
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

const TopRight = styled(TopLeft)``;

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

const RowRight = styled(RowLeft)``;

const Left = styled.div`
  height: 100%; 
  width: 50%; 
  border-right: solid 1px #FFFFFF;
  display: flex; 
  flex-direction: column;
  align-items: center;
`; 

const Right = styled(Left)`
  border: none;
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

const BuyWrap = styled.div`
  height: 100%; 
  width: 100%; 
  background: pink;
`; 

const SellWrap = styled.div`
  height: 100%; 
  width: 100%; 
  background: red;
`;