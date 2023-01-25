import React, { useEffect } from 'react'
import styled from 'styled-components'
import {useContractRead} from 'wagmi'
import { useProvider } from 'wagmi';
import Dashboard from './Dashboard';
import Row from './Row';
import exchangeInterface from '../contracts/Exchange.json';
import profilInterface from '../contracts/Profil.json';
import { ethers } from 'ethers';

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

  //0x1Dc419f50b9192927cA34f4b4C96c13814b365B7

  const {data, isError, isLoading} = useContractRead({
    address: '0x1Dc419f50b9192927cA34f4b4C96c13814b365B7', 
    abi: exchangeInterface,
    functionName: "getAllDeployers", 
    signerOrProvider: provider, 
    watch: true,
  })

  var creatorData
  //console.log(data)
  useEffect(() => {
    creatorData = data; 
  }, [])

  //1 access the data array 
  //2 for each address in data array execute the getProfil function 
  //Only Render the name, the token symbol, the token price

  //console.log(data)


  return (
    <Container>
      <Left>
        <Top>
          <Wrapper>
            <Menu>Creator</Menu>
            <Menu style={{marginLeft: "12vw"}}>Token</Menu>
            <Menu>Price</Menu>
          </Wrapper>
        </Top>
        <Body>
        {
            data?.map((token, i) => (
              <Row 
                creator={token._deployerAddress.substring(0,5)+"..."+token._deployerAddress.substring(38)}
                symbol={token._tokenSymbol}
                price={ethers.utils.formatEther((token._tokenPrice).toString())}
                creatorAddress={token._deployerAddress}
                tokenAddress={token._tokenAddress}
              />
            ))
          }
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

const Section = styled.div`
  height: 100%; 
  width: 250px; 
  display: flex; 
  flex-direction: row;
  justify-content: start; 
  align-items: center;
  overflow: scroll;
  background: transparent;
  color: #212121;
  background: red;
`; 

const Section2 = styled(Section)`
  justify-content: end;
  background: blue;
`;