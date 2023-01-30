import React, { useState } from 'react'
import styled from 'styled-components'

function BuyTokenFrom({creatorAddress, sellerAddress, tokenAddress, price}) {

  const [amount, setAmount] = useState("");

  const handleChange = (event) => {
    setAmount(event.target.value);
  }
  return (
    <BuyContainer>
          <Title>Amount</Title>
          <BuyCover value={amount} placeholder = "0" onChange={handleChange}></BuyCover>
          <Display> {amount * price} ROK</Display>
          <BuyButton>Validate</BuyButton>
    </BuyContainer>
  )
}

export default BuyTokenFrom

const BuyContainer = styled.div`
  height: 98%; 
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