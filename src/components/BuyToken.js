import React from 'react'
import styled from 'styled-components'

//Utiliser le même fonctionnement avec mappingvia address token

function BuyToken() {
  return (
    <Container>
      <Top>For 0.0006 ETH</Top>
      <Wrapper>
        <Row>
          <Cover>52 $CARDI for 0.00002 MATIC</Cover>
          <Button>Buy</Button>
        </Row>
      </Wrapper>
    </Container>
  )
}

export default BuyToken

const Container = styled.div`
  height: 100%; 
  width: 100%; 
  background: transparent;
  overflow: scroll;
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