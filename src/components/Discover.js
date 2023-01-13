import React from 'react'
import styled from 'styled-components'
import ArtistBox from './ArtistBox';

function Discover() {
  return (
    <Container>
      <Left>
        <Column>
          <ArtistBox />
          <ArtistBox />
          <ArtistBox />
          <ArtistBox />
          <ArtistBox />
          <ArtistBox />
        </Column>
        <Column2>
        <ArtistBox />
          <ArtistBox />
          <ArtistBox />
          <ArtistBox />
          <ArtistBox />
          <ArtistBox />
        </Column2>
        <Column>
        <ArtistBox />
          <ArtistBox />
          <ArtistBox />
          <ArtistBox />
          <ArtistBox />
          <ArtistBox />
        </Column>
        <Column2>
        <ArtistBox />
          <ArtistBox />
          <ArtistBox />
          <ArtistBox />
          <ArtistBox />
          <ArtistBox />
        </Column2>
        <Column>
        <ArtistBox />
          <ArtistBox />
          <ArtistBox />
          <ArtistBox />
          <ArtistBox />
          <ArtistBox />
        </Column>
      </Left>
      <Right></Right>
    </Container>
  )
}
//For i in range(len(n profil))
//artist i column 0
//artist i+1 column 1
//....

export default Discover

const Container = styled.div`
  margin-top: 150px;
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
  flex-direction: row;
  justify-content : space-between;
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

const Column = styled.div`
width: 13vw;
height: auto;
background: transparent;
display: flex; 
flex-direction: column;
`; 

const Column2 = styled(Column)`

  margin-top: 70px;`; 