import { ethers } from 'ethers'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useContract, useContractRead, usePrepareContractWrite, useSigner } from 'wagmi'
import { useContractWrite } from 'wagmi'
import { useProvider } from 'wagmi'
import { useAccount } from 'wagmi'
import { erc20ABI } from 'wagmi'
import exchangeInterface from '../contracts/Exchange.json';
//https://ethereum.stackexchange.com/questions/141613/wagmi-usewaitfortransaction-not-waiting-long-enough


//Utiliser le même fonctionnement avec mappingvia address token
function BuyToken({creatorAddress, tokenAddress, price}) {

  const referenceTokenAddress = '0x0000000000000000000000000000000000001010';

  const provider = useProvider();
  const { data: signer, isSignerError, isSignerLoading } = useSigner()
  const {address, isConnecting, isDisconnected} = useAccount();

  const [showBuy, setShowBuy] = useState(false);
  const [amount, setAmount] = useState("0");

  const creatorToken = useContract({
    address: tokenAddress, 
    abi: erc20ABI, 
    signerOrProvider: signer,
  })

  const referenceToken = useContract({
    address: referenceTokenAddress, 
    abi: erc20ABI, 
    signerOrProvider: signer,
  })


  const displayBuy = () => {
    setShowBuy(true);
  }

  const hideBuy = () => {
    setShowBuy(false);
  }

  const handleChange = (event) => {
    setAmount(event.target.value);
  }
  //Access the price of the token 
  const {data, isError, isLoading} = useContractRead({
    address: '0x181b18F84A6B5491b006165059347FD66C448e9c', 
    abi: exchangeInterface,
    functionName: "getDeployerData", 
    signerOrProvider: provider, 
    args: [creatorAddress],
    watch: true,
  })

  const {config} = usePrepareContractWrite({
    address: '0x181b18F84A6B5491b006165059347FD66C448e9c', 
    abi: exchangeInterface, 
    functionName: 'directBuy', 
    signerOrProvider: signer,
    args: [creatorAddress, ethers.utils.parseEther(amount).toString()],
  })

  //ethers.utils.parseEther(amount).toString()
  const {buyData, isBuyLoading, isSuccess, write} = useContractWrite(config);


  const buyTheToken = () => {
    write();
  }

  //0x6f1061a30609842457288C26bF84513702d2b17c
 
  async function buyTheTokenBis() {
    const result = await creatorToken.connect(signer).approve('0x181b18F84A6B5491b006165059347FD66C448e9c', ethers.utils.parseEther(amount).toString()); 
    await result.wait(); 
    write();
  }


  return (
    <Container>
      <Top>For {price} MATIC
      <TopButton onClick={displayBuy}>Buy</TopButton>
      {showBuy === true &&
        <BuyContainer>
          <Cross onClick={hideBuy}>Close</Cross>
          <Title>Amount</Title>
          <BuyCover value={amount} onChange={handleChange}></BuyCover>
          <Display> {amount * price} MATIC</Display>
          <BuyButton onClick={buyTheTokenBis}>Validate</BuyButton>
      </BuyContainer>
      }
      </Top>
      <Wrapper>
        <Row>
          <Cover>52 $CARDI for 0.00002 MATIC</Cover>
          <Button>Buy</Button>
        </Row>
      </Wrapper>
    </Container>
  )
}

/*<BuyContainer>
        <Cross>Close</Cross>
        <Title>Amount</Title>
        <BuyCover></BuyCover>
        <Display>MATIC</Display>
        <BuyButton>Validate</BuyButton>
      </BuyContainer>*/

export default BuyToken

const Container = styled.div`
  height: 100%; 
  width: 100%; 
  background: transparent;
  overflow: scroll;
  position: relative;
`;

const BuyContainer = styled.div`
  height: 98%; 
  margin-top: 235px;
  width: 100%; 
  background: #212121;
  border-radius: 50px;
  position: absolute;
  z-index: 5;
  display: flex; 
  flex-direction: column; 
  align-items: center;
  padding: 10px;
`; 

const Cross = styled.div`
  position: absolute; 
  top: 10px; 
  right: 30px;
  height: 40px; 
  width: 140px; 
  background: #FFFFFF; 
  display: flex;
  justify-content: center; 
  align-items: center;
  font-family: roboto mono; 
  font-weight: 300; 
  font-size: 25px;
  border-radius: 100px;
  color: #212121;
  cursor: pointer; 

`; 

const Title = styled.text`
  font-size: 25px; 
  font-family: roboto mono; 
  font-weight: 300; 
  color: #FFFFFF;
`;

const BuyCover = styled.input`
  height: 60px; 
  width: 160px;
  display: flex; 
  flex-direction: row; 
  justify-content: center;
  align-items: center;
  font-family: roboto mono; 
  font-size: 20px; 
  font-weight: 300;
  border: dashed 2px #FFFFFF;
  padding: 10px; 
  border-radius: 100px;
  margin-top: 20px; 
  background: transparent; 
  font-family: roboto mono; 
  font-size:25px; 
  color: #FFFFFF; 
  font-weight: 300;
`; 

const Display = styled.text`
  font-family: roboto mono; 
  color: #FFFFFF; 
  font-size: 30px; 
  font-weight: 300; 
  margin-top: 20px;
`;

const BuyButton = styled.div`
  height: 50px; 
  width: 150px; 
  background: #FFFFFF; 
  color: #212121; 
  font-family: roboto mono; 
  font-size: 25px; 
  font-weight: 300; 
  margin-top: 20px; 
  display: flex; 
  justify-content: center; 
  align-items: center;
  border-radius: 100px;
  cursor: pointer;
  &:hover {
    background: #212121; 
    border: solid 2px #FFFFFF;
    color: #FFFFFF;
  }
`;

const Cover = styled.div`
  height: 70%; 
  width: auto;
  display: flex; 
  flex-direction: row; 
  justify-content: center;
  align-items: center;
  font-family: roboto mono; 
  font-size: 20px; 
  font-weight: 300;
  border: dashed 2px #FFFFFF;
  padding: 10px; 
  border-radius: 100px;
`; 

const Top = styled.div`
  height: 20%; 
  width: 100%; 
  display: flex; 
  flex-direction: row; 
  justify-content: center;
  align-items: center;
  font-family: roboto mono; 
  font-weight: 300; 
  color: #FFFFFF;
  font-size: 20px;
  margin-bottom: 30px;
`; 

const Wrapper = styled.div`
  width: 100%; 
  height: auto; 
  overflow: scroll;
  display: flex; 
  flex-direction: column;
  overflow-y: scroll;
`; 

const Row = styled.div`
  width: 100%; 
  height: 60px;
  border-bottom: solid 1px #FFFFFF;
  display: flex; 
  flex-direction: row; 
  align-items: center;
  justify-content: start;
  position : relative;
`;

const TopButton = styled.div`
  height: 45px; 
  width: 120px; 
  background: #FFFFFF; 
  border-radius: 100px; 
  display: flex; 
  justify-content: center; 
  align-items: center;
  margin-left: 30px;
  font-family: roboto mono;
  font-size: 20px;
  font-weight: 300;
  color: #212121; 
  cursor: pointer;
  &:hover {
    background: #212121; 
    color: #FFFFFF;
  }
`; 

const Button = styled.div`
  height: 80%; 
  width: 120px; 
  background: #FFFFFF; 
  border-radius: 100px; 
  display: flex; 
  justify-content: center; 
  align-items: center;
  position: absolute; 
  right: 10px;
  font-family: roboto mono;
  font-size: 20px;
  font-weight: 300;
  color: #212121; 
  cursor: pointer;
  &:hover {
    background: #212121; 
    color: #FFFFFF;
  }
`; 