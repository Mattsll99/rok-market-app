import React from 'react'
import styled from 'styled-components'
import {useContractRead} from 'wagmi'
import { useProvider } from 'wagmi';
import Dashboard from './Dashboard';
import Row from './Row';
import exchangeInterface from '../contracts/Exchange.json';

function Exchange() {
  //1. Accéder à tous les tokens
  //Pour chaque token existant, render
    //Nom du créateur
    //Symbol du token
    //Prix du token
    //Lien tu component pour le trade

  //access all the deployers
  /*const {data, isError, isLoading} = useContractRead({
    address: '0xBbB9CEfBcf0f4B2527Dc147840642d8Efdf55235', 
    abi: profilInterface, 
    functionName: 'seeProfil', 
    signerOrProvider: provider,
    args: [address], //address of the user
    watch: true,
  })*/
  const provider = useProvider();

  /*const {data, isError, isLoading} = useContractRead({
    address: '0x0e3aa970e8147BB7b0937d7d1354F884B1301179', 
    abi: exchangeInterface,
    functionName: "seeAllDeployers", 
    signerOrProvider: provider, 
    watch: true,
  })*/


  return (
    <Container>
      <Left>
        <Top>
          <Wrapper>
          <Menu>Creator</Menu>
          <Menu>Token</Menu>
          <Menu>Price</Menu>
          </Wrapper>
        </Top>
        <Body>
         <Row 
          creator="Elon Musk"
          symbol="$MUSK"
          price="0.006 "
         />
          <Row 
          creator="Cardi B"
          symbol="$CARDI"
          price="0.006 "
         />
          <Row 
          creator="MR Beast"
          symbol="$BEAST"
          price="0.006 "
         />
          <Row 
          creator="Charlie D'Amelio"
          symbol="$CHRL"
          price="0.006 "
         />
          <Row 
          creator="Logan Paul"
          symbol="$LPT"
          price="0.006 "
         />
          <Row 
          creator="Taylor Swift "
          symbol="$SWIFT"
          price="0.006 "
         />
          <Row 
          creator="IShowSpeed"
          symbol="$SPEED"
          price="0.006 "
         />
          <Row 
          creator="Jake Paul"
          symbol="$JPT"
          price="0.006 "
         />
          <Row 
          creator="ADNL"
          symbol="$ADNL"
          price="0.006 "
         />
        </Body>
      </Left>
      <Dashboard />
    </Container>
  )
}

export default Exchange

const Container = styled.div`
  //margin-top: 150px;
  height: auto; 
  width: 100vw;
  display: flex; 
  flex-direction: row; 
  padding: 30px;
  //position: relative;
`; 

const Left = styled.div`
  width: 70vw; 
  height: auto;
  display: flex; 
  flex-direction: column;
`;

const Right = styled.div`
  height: 600px;
  width: 300px;
  background: #3B3395;
  position: fixed; 
  right: 30px;
  top: 150px;
  border-radius: 50px;
`;

const Top = styled.div`
  width: 100%; 
  height: 50px; 
  background: transparent;
  //position: fixed;
  display: flex; 
  flex-direction : row;
  align-items: center;
  border-bottom: solid 2px #3B3395;
`;  

const Wrapper = styled.div`
  height: 100%; 
  width: 75%; 
  background: transparent;
  display: flex; 
  flex-direction : row; 
  align-items: center;
  justify-content: space-between;
  padding: 30px;
`; 

const Menu = styled.text`
  background: transparent; 
  font-weight: 300; 
  font-size: 18px;
`; 

const Body = styled.div`
  width: 100%; 
  height: auto;
  //background: red;
  //margin-top: 50px;
  //position: fixed;
  display: flex; 
  flex-direction: column;
`; 

