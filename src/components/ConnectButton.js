import React from 'react'
import styled from 'styled-components'
import { ConnectButton } from '@rainbow-me/rainbowkit'

function ConnectButton() {
  return (
    <Container>
      <ConnectButton 
      showBalance={false}
      />
    </Container>
  )
}

export default ConnectButton

const Container = styled.div`

`; 

const Text = styled.text`
  font-family: abril fatface;
  font-weight: 200;
  background: transparent;
  font-size: 25px;
`;