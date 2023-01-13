import React from 'react'
import styled from 'styled-components';

function ArtistBox() {
  return (
    <Container>
      <Top></Top>
      <Bottom></Bottom>
    </Container>
  )
}

export default ArtistBox

const Container = styled.div`
  height: 200px; 
  width: 100%; 
  background: #3B3395;
  border-radius: 50px;
  margin-bottom: 20px;
  position: relative;
  display: flex; 
  flex-direction: column; 
`; 

const Top = styled.div`
  width: 100%; 
  height: 60%; 
  background: red;
  border-top-right-radius: 50px; 
  border-top-left-radius: 50px;
`; 

const Bottom = styled.div`
  width: 100%; 
  height: 40%;  
  border-bottom-left-radius: 50px; 
  border-bottom-right-radius: 50px;
`; 