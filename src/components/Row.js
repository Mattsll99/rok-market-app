import React, { useState } from 'react'
import styled from 'styled-components'
import Trade from './Trade'

function Row({creator, symbol, price, creatorAddress, tokenAddress}) {
  const [isShown, setIsShown] = useState(false);

  const showTrade = () => {
    setIsShown(true);
  }

  const hideTrade = () => {
    setIsShown(false);
  }

  return (
    <Container>
      <Menu>
        <Section>
          <ProfilPic></ProfilPic>
          <NameBis>{creator}</NameBis>
        </Section>
        <Section2>
          <Name>{symbol}</Name>
        </Section2>
        <Section2>
          <Name>{price+" "}ROK</Name>
        </Section2>
      </Menu>
      <Right>
      <Button onClick={showTrade}>
        <Name>Buy/Sell</Name>
      </Button>
      {isShown === true && 
      <Wrapper>
        <CloseButton onClick={hideTrade}>Close</CloseButton>
        <Trade 
          creatorAddress={creatorAddress}
          tokenAddress = {tokenAddress}
          price={price}
          symbol = {symbol}
        />
      </Wrapper>}
      </Right>
    </Container>
  )
}

export default Row

const Container = styled.div`
  height: 70px; 
  width: 100%; 
  border-bottom : solid 1px #3B3395;
  display : flex; 
  flex-direction : row;
  position: relative;
  padding-left: 10px;
  color: #212121;
  &:hover {
    background: #212121; 
    color: #FFFFFF;
  }
  @media(max-width: 525px) {
    padding: 0;
  }
`; 

const CloseButton = styled.div`
  height: 80px; 
  width: 180px; 
  border-radius: 100px; 
  background: #3B3395;
  position: absolute; 
  z-index: 5;
  margin-top: 20px; 
  left:0;
  right:0; 
  margin-left: auto; 
  margin-right: auto;
  display: flex; 
  justify-content: center; 
  align-items: center;
  color: #FFFFFF; 
  font-size: 35px; 
  font-weight: 300; 
  font-family: abril fatface; 
  cursor: pointer;
  &:hover {
    background: #FFFFFF; 
    color: #3B3395;
  }
`;

const Wrapper = styled.div`
  height: 100vh; 
  width: 100vw;
  position: fixed;
  left:0; 
  top: 0;
  z-index: 3;
  background: transparent;
`;

const Menu = styled.div`
  height: 100%; 
  width: 75%; 
  display: flex; 
  flex-direction: row; 
  justify-content : space-between;
`; 

const Right = styled.div`
  height: 100%;
  width: 20%;
  display: flex; 
  justify-content: center; 
  align-items: center;
  position: absolute;
  padding-left: 20px;
  right: 0;
`;

const Section = styled.div`
  height: 100%; 
  width: 250px; 
  display: flex; 
  flex-direction: row;
  justify-content: start; 
  align-items: center;
  overflow: scroll;
  @media(max-width: 1020px) {
    width: 190px;
  }
  @media(max-width: 530px) {
    width: 150px;
  }
`; 

const Section2 = styled(Section)`
  justify-content: end;
  width: 100px;
  @media(max-width: 990px) {
    justify-content: center;
  }
`;

const ProfilPic = styled.div`
  height: 44px; 
  width: 44px; 
  border-radius: 88px;
  background: rgb(219,0,91);
  background: linear-gradient(137deg, rgba(219,0,91,1) 0%, rgba(209,86,26,1) 33%, rgba(0,11,255,1) 100%, rgba(255,0,247,1) 100%);  
  @media(max-width: 525px) {
    display: none; 
  }
`;

const Name = styled.text`
  background: transparent; 
  font-size: 16px; 
  font-family: roboto mono; 
  margin-left: 10px;
  font-weight: 300;
`; 

const NameBis = styled(Name)`
  @media(max-width: 1090px) {
  } 
`;


const Button = styled.div`
  height: 50px; 
  width: 150px; 
  border-radius: 100px; 
  background: #3B3395;
  display: flex; 
  justify-content: center; 
  align-items: center;
  margin-left: -10px;
  color: #FFFFFF;
  cursor: pointer; 
  &:hover {
    background: #FFFFFF; 
    color: #3B3395;
  }
  @media(max-width: 486px) {
    margin-left: -20px;
  }
`;