import React, { useState } from 'react'
//import {process} from "process";
import process from 'process';
import styled from 'styled-components'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { useContractRead, usePrepareContractRead } from 'wagmi';
import { prepareWriteContract, writeContract } from '@wagmi/core';
import profilInterface from "../contracts/Profil.json";
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useContract, useSigner, useProvider } from 'wagmi'
import Registerd from './Registerd';


//import Registerd from './components/Registerd';

//https://github.com/madeinfree/wagmi-nft-fronend-booster/blob/main/app/components/MintBlock.jsx
//https://github.com/madeinfree/wagmi-nft-fronend-booster/blob/main/app/components/MintBlock.jsx


//If isConnected && profilCreated
const contractAddress = process.env.NEW_PROFIL;


function Profil() {

  const provider = useProvider();
  const [inputName, setInputName] = useState(""); 
  const [inputInsta, setInputInsta] = useState(""); 
  const [inputOnlyfans, setInputOnlyfans] = useState("");
  const [inputTiktok, setInputTiktok] = useState("");
  const [inputTwitch, setInputTwitch] = useState("");
  const [inputTwitter, setInputTwitter] = useState(""); 
  const [inputSnap, setInputSnap] = useState(""); 
  const [inputPatreon, setInputPatreon] = useState("");
  const [inputYoutube, setInputYoutube] = useState("");

  const[profilCreated, setProfilCreated] = useState(false);

  const profilAddress = process.env.NEWPROFIL;

  const {config} = usePrepareContractWrite({
    address: '0xBbB9CEfBcf0f4B2527Dc147840642d8Efdf55235', 
    abi: profilInterface, 
    functionName: 'createProfil', 
    signerOrProvider: provider,
    args: [inputName, inputInsta, inputTiktok, inputOnlyfans, inputSnap, inputYoutube, inputTwitter],
  })
  const {data, isLoading, isSuccess, write} = useContractWrite(config)

  const handleProfilCreation = () => {
    write() 
  }
  
  if(profilCreated === false) { //Ou not user 
    return (
      <Container>
        <Top>
          <Title>Create profil</Title>
        </Top>
        <Body>
          <Left></Left>
          <Right>
            <TopRight>
              <Name placeholder='Name' type= 'text' value={inputName} onChange={(a) => setInputName(a.target.value)}/>
            </TopRight>
            <BodyRight>
              <Row>
                <Square>
                  <Logo src="../assets/whiteInsta.png"/>
                  <LinkInput type = "text" value={inputInsta} onChange={(b) => setInputInsta(b.target.value)}/>
                </Square>
                <Square>
                  <Logo src ="../assets/whiteOF.png"/>
                  <LinkInput type="text" value = {inputOnlyfans} onChange={(c) => setInputOnlyfans(c.target.value)}/>
                </Square>
                <Square>
                  <Logo src="../assets/whitetiktok.png"/>
                  <LinkInput type="text" value = {inputTiktok} onChange={(d) => setInputTiktok(d.target.value)}/>
                </Square>
              </Row>
              <Row>
              <Square>
                <Logo src ="../assets/whiteTwitch.png"/>
                <LinkInput type="text" value = {inputTwitch} onChange={(e) => setInputTwitch(e.target.value)}/>
              </Square>
                <Square>
                  <Logo src="../assets/white twi.png"/>
                  <LinkInput type="text" value = {inputTwitter} onChange={(f) => setInputTwitter(f.target.value)}/>
                </Square>
                <Square>
                  <Logo src="../assets/whiteSnap.png"/>
                  <LinkInput type="text" value = {inputSnap} onChange={(g) => setInputSnap(g.target.value)}/>
                </Square>
              </Row>
              <Row>
                <Square>
                  <Logo src="../assets/whitePatreon.png"/>
                  <LinkInput type="text" value = {inputPatreon} onChange={(h) => setInputPatreon(h.target.value)}/>
                </Square>
                <Square>
                  <Logo src="../assets/whiteYT.png"/>
                  <LinkInput type="text" value = {inputYoutube} onChange={(i) => setInputYoutube(i.target.value)}/>
                </Square>
                <Square></Square>
              </Row>
            </BodyRight>
          </Right>
        </Body>
        <Validate onClick={handleProfilCreation}>Validate</Validate>
        {isSuccess && setProfilCreated(true)}
      </Container>
    )
  }
  else {
    return (
      <Registerd />
    )
  }
  
}

export default Profil

const Container = styled.div`
  height: 400px; 
  width: 400px; 
  background: #3B3395;
  position: absolute; 
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto;
  margin-top: 100px;
  border-radius: 50px;
  padding: 30px;
`;

const Top = styled.div`
  width: 100%; 
  height: 20%; 
  background: transparent;
  display: flex; 
  justify-content: center; 
  //align-items: center; 
  color: #FFFFFF;
`; 

const Body = styled.div`
  width: 100%;
  height: 65%; 
  display: flex; 
  flex-direction: row;
  background: transparent;
  justify-content: space-between;
`; 

const Left = styled.div`
  width: 48%; 
  height: 100%;
  background: transparent;
  border: solid 2px #FFFFFF;
  border-radius: 25px;
  background: rgb(0,13,219);
  background: linear-gradient(121deg, rgba(0,13,219,1) 0%, rgba(218,56,0,1) 35%, rgba(255,0,247,1) 100%);
`;

const Right = styled(Left)`
  border: none; 
  background: transparent;
  display: flex; 
  flex-direction : column;
  justify-content: space-between;
`;

const Title = styled.text`
  font-size: 40px; 
  font-family: abril fatface;
  background: transparent;
  font-weight: 200;
`; 

const TopRight = styled.div`
  width: 100%; 
  height: 30%; 
  background: transparent;
  border-radius: 20px; 
  border: dashed 2px #FFFFFF;
  padding: 10px;
`; 

const Name = styled.input`
  height: 100%; 
  width: 100%;
  font-family: roboto mono; 
  font-weight: 300; 
  font-size: 18px;
  color: #FFFFFF;
  background: transparent;
  border: none;
  text-decoration: none;
`; 

const BodyRight = styled.div`
  height: 68%; 
  width: 100%; 
  background: transparent;
  display: flex; 
  flex-direction: column; 
  justify-content: space-between;
`; 

const Row = styled.div`
  width: 100%; 
  height: 30%;
  background: transparent;
  display: flex; 
  flex-direction: row; 
  justify-content: space-between;
  background: transparent;
  position: relative;
`; 

const Square = styled.div`
  height: 100%; 
  width: 30%; 
  background: transparent;
  border-radius: 15px;
  border: solid 2px #FFFFFF;
  display: flex; 
  justify-content: center; 
  align-items: center;
  cursor: pointer;
  &:hover {
    background: rgb(0,13,219);
    background: linear-gradient(121deg, rgba(0,13,219,1) 0%, rgba(218,56,0,1) 35%, rgba(255,0,247,1) 100%);
    position: absolute;
    z-index: 2;
    width: 100%;
    justify-content: start;
    padding-left: 10px;
    justify-content: space-between;
    padding-left: 120px;
  }
`; 

const Logo = styled.img`
  height: 70%; 
  width: auto; 
  background: transparent;
  //position: absolute;
`; 

const LinkInput = styled.input`
  width: 60%;
  height: 70%;
  padding-left: 5px; 
  padding-right: 5px;
  border-radius: 100px;
  border: solid 2px #FFFFFF;
  background: transparent;
  position: absolute; 
  left: 10px;
  z-index: -1;
  font-family: roboto mono; 
  font-size: 14px; 
  font-weight: 400; 
  color: #FFFFFF;
`;

const Validate = styled.div`
  height: 50px; 
  width: 160px; 
  border-radius: 100px; 
  background: #FFFFFF;
  position: absolute; 
  bottom : 15px; 
  right: 15px;
  display:flex; 
  justify-content: center; 
  align-items: center;
  font-size: 25px; 
  font-weight: 300;
  font-family: abril fatface; 
  color: #3B3395;
  cursor: pointer;
  &:hover {
    background: rgb(0,13,219);
    background: linear-gradient(121deg, rgba(0,13,219,1) 0%, rgba(218,56,0,1) 35%, rgba(255,0,247,1) 100%);
    color: #FFFFFF; 
    border: solid 2px #FFFFFF;
  }
`;