import React, { useState } from 'react'
import styled from 'styled-components'
import BuyTokenFrom from './BuyTokenFrom';

function BuyRow({creatorAddress, sellerAddress, tokenAddress, symbol, amount, price}) {

  const [showBuyFrom, setShowBuyFrom] = useState(false);

  const displayBuyFrom = () => {
    setShowBuyFrom(true);
  }

  const hideBuyFrom = () => {
    setShowBuyFrom(false);
  }

  return (
    <Wrap>
       {showBuyFrom === true &&
    <Wrapper>
      <Cross onClick={hideBuyFrom}>Close</Cross>
      <BuyTokenFrom 
        creatorAddress={creatorAddress}
        sellerAddress={sellerAddress}
        tokenAddress={tokenAddress}
        price={price}
      />
      </Wrapper>
    }
    <Container>
      <Cover>{amount } {symbol } for {price} ROK</Cover>
      <BodyButton onClick={displayBuyFrom}>Buy</BodyButton>
    </Container>
    </Wrap>
  )
}

export default BuyRow

const Container = styled.div`
  width: 100%; 
  height: 60px;
  border-bottom: solid 1px #FFFFFF;
  display: flex; 
  flex-direction: row; 
  align-items: center;
  justify-content: start;
  position : relative;
`;

const Wrap = styled.div``;

const Wrapper = styled.div`
  position: relative;
`;

const Cross = styled.div`
  position: fixed; 
  top: 260px; 
  right: 450px;
  z-index: 6;
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

const BodyButton = styled.div`
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