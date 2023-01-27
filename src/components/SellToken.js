import { ethers } from 'ethers'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useContractRead } from 'wagmi'
import { useProvider } from 'wagmi'
import ExchangeInterface from '../contracts/Exchange.json'
import SellTokenTo from './SellTokenTo'

function SellToken({creatorAddress, tokenAddress, symbol, price}) {

  const provider = useProvider();

  const [sellTo, setSellTo] = useState(false);

  const {data, isError, isLoading} = useContractRead({
    address: '0x1Dc419f50b9192927cA34f4b4C96c13814b365B7', 
    abi: ExchangeInterface,
    functionName: "seeBuyProposalsForToken", 
    signerOrProvider: provider, 
    args:[creatorAddress],
    watch: true,
  })

  //console.log(data);

  const showSellTo = () => {
    setSellTo(true);
  }

  /*{
    data?.map((token, i) => (
      <Row 
        creator={token._deployerAddress.substring(0,5)+"..."+token._deployerAddress.substring(38)}
        symbol={token._tokenSymbol}
        price={ethers.utils.formatEther((token._tokenPrice).toString())}
        creatorAddress={token._deployerAddress}
        tokenAddress={token._tokenAddress}
      />
    ))
  }*/
  

  return (
    <Container>
      <Container>
      <Wrapper>
        {
          data?.map((proposal, i) => (
            <Row>
              <Cover>{ethers.utils.formatEther(proposal._amount).toString()} {symbol} for {ethers.utils.formatEther(proposal._price).toString()} ROK</Cover>
              <Button onClick={showSellTo}>Sell</Button>
            </Row>
            
          ))
        }
      </Wrapper>
    </Container>
    </Container>
  )
}

export default SellToken

const Container = styled.div`
  height: 100%; 
  width: 100%; 
  background: transparent;
  overflow: scroll;
  position: relative;
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
  font-family: roboto mono; 
  font-weight: 300; 
  color: #FFFFFF;
  font-size: 20px;
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
  margin-top: 10px;
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
  color: blue;
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