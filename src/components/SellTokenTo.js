import React from 'react'
import styled from 'styled-components'

function SellTokenTo() {
  return (
    <Container>
      <Cover placeholder="0"></Cover>
      <Validate>Validate</Validate>
    </Container>
  )
}

export default SellTokenTo

const Container = styled.div`
  background: red; 
  height: 100%; 
  width: 100%; 
  position: absolute;
  z-index: 4;
  background: #3B3395;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`; 

const Cover = styled.input`
  height: 100%; 
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
  background: transparent; 
  font-family: roboto mono; 
  font-size:25px; 
  color: #FFFFFF; 
  font-weight: 300;
`; 

const Validate = styled.div`
  height: 100%; 
  width: 160px; 
  background: #FFFFFF; 
  display: flex; 
  justify-content: center;
  align-items: center;
  color: #212121; 
  border-radius: 100px;
  font-family: roboto mono; 
  font-weight: 300; 
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background: #212121;
    color: #FFFFFF;
  }
`; 