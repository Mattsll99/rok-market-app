import React from 'react'
import styled from 'styled-components'
//import ConnectButton from './ConnectButton';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Faucet from './Faucet';

function Header() {
  return (
    <Container>
      <Logo>ROK</Logo>
      <Faucet />
      <ConnectButton
        showBalance={false}
      />
    </Container>
  )
}

export default Header

const Container = styled.div`
  height: 100px; 
  width: 100vw; 
  position: fixed; 
  top: 0; 
  //background: transparent;
  background: #DCCFAC;
  display: flex; 
  flex-direction: row; 
  align-items: center;
  justify-content: space-between;
  padding-left: 30px; 
  padding-right: 30px;
  z-index: 3;
`;

const Logo = styled.text`
  font-family: abril fatface; 
  font-size: 40px; 
  background: transparent;
  color: #212121;
`; 

const Menu = styled.div`
  height: 50%; 
  width: 20%; 
  padding: 20px;
  background: transparent;
  display: flex; 
  flex-direction: row;
  align-items: center;
  justify-content: space-between; 
  border-bottom: solid 2px #827136;
  @media(max-width: 930px) {
    width: 50%;
  }
  @media(max-width: 694px) {
    justify-content: center;
    width: 20%;
  }
`; 

const linkStyle = {
  textDecoration: "none", 
  color: '#FFFFFF', 
  font: "abril-fatface",
}

const Text = styled.li`
  font-family: abril fatface;
  font-weight: 200;
  background: transparent;
  cursor: pointer;
  //text-decoration: none;
`; 

const Text2 = styled(Text)`
  @media(max-width: 694px) {
    display: none;
    cursor: none ;
  }
`;

const Launch = styled.div`
  height: 30px; 
  width: 110px;
  //background: #3B3395;
  background: #BAA570;
  border-radius: 100px;
  display: flex; 
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  @media(max-width: 694px) {
    display: none
  }
`;

