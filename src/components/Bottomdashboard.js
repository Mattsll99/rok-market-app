import React from 'react'
import styled from 'styled-components'

function Bottomdashboard() {
  return (
    <Container>
      <Row>
        <LeftBox>
          <Currency>$ADNL</Currency>
          <Address>0x20...33</Address>
        </LeftBox>
        <RightBox>
          <Amount>333333333333333333333</Amount>
        </RightBox>
      </Row>
    </Container>
  )
}

export default Bottomdashboard

const Container = styled.div`
  height: 60%; 
  width: 100%;
  border-radius: 40px;
  padding: 10px; 
  overflow: scroll;
  background: #DCCFAC;
`;

const Row = styled.div`
  height: 60px; 
  width: 100%; 
  background: transparent;
  display: flex; 
  flex-direction: row; 
  justify-content: space-between;
  position: relative;
`; 

const LeftBox = styled.div`
  max-width: 60%; 
  width: auto; 
  height: 100%;
  border-radius: 100px;
  background: transparent;
  overflow: hidden;
  display: flex; 
  flex-direction: row;
  align-items: center;
  padding-right: 5px;
  padding-left: 5px;
  border: solid 1px #3B3395;
  color: #3B3395;
  &:hover {
    position: absolute;
    max-width: 100%; 
    width: 100%;
    background: #FFFFFF;
  }
`;

const RightBox = styled.div`
  max-width: 35%; 
  width: auto; 
  height: 100%;
  border-radius: 100px;
  background: #3B3395;
  overflow: hidden;
  display: flex; 
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  border: solid 1px #3B3395;
  color: #FFFFFF;
  &:hover {
    position : absolute; 
    max-width: 100%;
    width: 100%;
    overflow: scroll;
  }
`;

const Currency = styled.text`
  font-family: abril fatface; 
  font-weight: 300; 
  font-size: 25px;
`; 

const Address = styled.text`
  font-family: roboto mono; 
  font-size: 15px; 
  font-weight: 300; 
  color: #DCCFAC;
  margin-left: 10px;
`;

const Amount = styled.text`
  font-family: roboto mono; 
  font-weight: 300; 
  font-size: 30px;
`;