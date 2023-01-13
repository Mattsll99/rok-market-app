import React, { useState } from 'react'; 
import styled from 'styled-components';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { useProvider } from 'wagmi';
import profilInterface from "../contracts/Profil.json";

function CreateProfil() {

  const provider = useProvider();

  const [inputName, setInputName] = useState(""); 
  const [inputInstagram, setInputInstagram] = useState(""); 
  const [inputOnlyfans, setInputOnlyfans] = useState("");
  const [inputTiktok, setInputTiktok] = useState("");
  const [inputTwitch, setInputTwitch] = useState("");
  const [inputTwitter, setInputTwitter] = useState(""); 
  const [inputSnap, setInputSnap] = useState(""); 
  const [inputPatreon, setInputPatreon] = useState("");
  const [inputYoutube, setInputYoutube] = useState("");

  const {config} = usePrepareContractWrite({
    address: '0xBbB9CEfBcf0f4B2527Dc147840642d8Efdf55235', 
    abi: profilInterface, 
    functionName: 'createProfil', 
    signerOrProvider: provider,
    args: [inputName, inputInstagram, inputTiktok, inputOnlyfans, inputSnap, inputYoutube, inputTwitter],
  })

  const {data, isLoading, isSuccess, write} = useContractWrite(config)

  const ProfilCreation = () => {
    write()
  }

  return (
    <Container>
      <Top>
        <Title>Create Profile</Title>
          <Input placeholder='Name' value={inputName} onChange={(e) => setInputName(e.target.value)}/>
      </Top>
      <Body>
        <Title>Your links</Title>
        <Input placeholder='Instagram' value={inputInstagram} onChange={(e) => setInputInstagram(e.target.value)}/>
        <Input placeholder='Twitter' value={inputTwitter} onChange={(e) => setInputTwitter(e.target.value)}/>
        <Input placeholder='Youtube' value={inputYoutube} onChange={(e) => setInputYoutube(e.target.value)}/>
        <Input placeholder='Onlyfans' value={inputOnlyfans} onChange={(e) => setInputOnlyfans(e.target.value)}/>
        <Input placeholder='Snapchat' value={inputSnap} onChange={(e) => setInputSnap(e.target.value)}/>
        <Input placeholder='Tiktok' value={inputTiktok} onChange={(e) => setInputTiktok(e.target.value)}/>
      </Body>
      <Validate onClick={ProfilCreation}>
        <Name>Validate</Name>
      </Validate>
    </Container>
  )
}

export default CreateProfil

const Container = styled.div`
  height: 100%; 
  width: 100%;
  display: flex; 
  flex-direction: column;
  position: relative;
`;

const Top = styled.div`
  width: 100%; 
  height: 20%; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: space-between;
`; 

const Title = styled.text`
  font-family: abril fatface; 
  font-size: 35px; 
  color: #FFFFFF;
  font-weight: 300;
  background: transparent;
`; 

const Name = styled.text`
  font-size: 30px;
  color: #FFFFFF; 
  background: transparent; 
  font-weight: 100;
  font-family: abril fatface;
`; 

const Cover = styled.div`
  height: auto; 
  display: inline-block;
  //box-sizing: border-box;
  padding-left: 20px; 
  padding-right: 20px;
  padding-top: 5px; 
  padding-bottom: 5px;
  background: transparent;
  border: dashed 3px #FFFFFF;
  border-radius: 100px;
  color: #212121;
  margin-top: 20px;
  font-family: abril fatface;
  position: relative;
  z-index:3;
  &:hover {
    width: 100%; 
    background: #FFFFFF;
  }
`;

const Body = styled.div`
  width: 100%; 
  height:60%; 
  border-radius: 40px;
  padding: 10px;
  border: dashed 3px #FFFFFF;
  display: flex; 
  flex-direction: column;
  align-items: start;
  overflow: scroll;
  margin-top: 30px;
`;

const Validate = styled.div`
  height: 50px; 
  width: 150px; 
  border-radius: 100px;
  position : absolute; 
  bottom:10px;
  right: 10px;
  background: rgb(219,0,91);
  background: linear-gradient(137deg, rgba(219,0,91,1) 0%, rgba(209,86,26,1) 33%, rgba(0,11,255,1) 100%, rgba(255,0,247,1) 100%);   
  display: flex; 
  align-items: center;
  justify-content: center;
  cursor: pointer;
`; 

const Input = styled.input`
  height: 100%; 
  width: auto;
  margin-top: 20px;
  height: 60px;
  width: 160px;
  border-radius: 100px;
  background: transparent; 
  border: dashed 2px #FFFFFF;
  font-family: abril fatface; 
  font-size: 25px;
  padding: 10px; 
  color: #FFFFFF;
  decoration: none;
  font-weight: 300;
  text-align: center;
  &:hover {
    width: 100%;
  }
`;