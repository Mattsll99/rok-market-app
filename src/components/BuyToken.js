import { ethers } from 'ethers'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useContract, useContractRead, usePrepareContractWrite, useSigner } from 'wagmi'
import { useContractWrite } from 'wagmi'
import { useProvider } from 'wagmi'
import { useAccount } from 'wagmi'
import { erc20ABI } from 'wagmi'
import exchangeInterface from '../contracts/Exchange.json';
import ROKInterface from '../contracts/ROK.json'
import BuyRow from './BuyRow'
import BuyTokenFrom from './BuyTokenFrom'
//https://ethereum.stackexchange.com/questions/141613/wagmi-usewaitfortransaction-not-waiting-long-enough


//Utiliser le même fonctionnement avec mappingvia address token
function BuyToken({creatorAddress, tokenAddress, symbol, price}) {

  //const [showBuyFrom, setShowBuyFrom] = useState(false);

  const provider = useProvider();
  const { data: signer, isSignerError, isSignerLoading } = useSigner()
  const {address, isConnecting, isDisconnected} = useAccount();

  const [showBuy, setShowBuy] = useState(false);
  const [amount, setAmount] = useState("");

  const creatorToken = useContract({
    address: tokenAddress, 
    abi: erc20ABI, 
    signerOrProvider: signer,
  })

  const ROK = useContract({
    address: '0xa2640d174DC8a343D54546ed47EBdb85B467CF9e', 
    abi: ROKInterface, 
    signerOrProvider: signer
  })

  const referenceToken = useContract({
    address: '0x0F0e87a679eA51BeCE18A96BA9c63F424Bf24d07', 
    abi: erc20ABI, 
    signerOrProvider: signer,
  })

  const handleBuyFrom = () => {
    setShowBuy(true);
  }

  //var sellerAddress;

  function handleBuyFromBis(_sellerAddress) {
    //sellerAddress = _sellerAddress
    setShowBuy(true)
  }

  const [tokenPrice, setTokenPrice] =useState("")


  const displayBuy = () => {
    setShowBuy(true);
  }

  const hideBuy = () => {
    setShowBuy(false);
  }

  const handleChange = (event) => {
    setAmount(event.target.value);
  }

  const {config} = usePrepareContractWrite({
    address: '0x1Dc419f50b9192927cA34f4b4C96c13814b365B7', 
    abi: exchangeInterface, 
    functionName: 'directBuy', 
    signerOrProvider: signer,
    args: [creatorAddress,(typeof amount !== 'undefined' && amount.toString() !=="")? ethers.utils.parseEther(amount).toString() : "0"]
  })
  //ethers.utils.parseEther(amount).toString()

  //ethers.utils.parseEther(amount).toString()
  const {buyData, isBuyLoading, isSuccess, write} = useContractWrite(config);

  const buyTheToken = () => {
    //await ROK.connect(address).approve('0x1Dc419f50b9192927cA34f4b4C96c13814b365B7', ethers.utils.parseEther(amount).toString()); 
    ROK.connect(signer).approve('0x1Dc419f50b9192927cA34f4b4C96c13814b365B7', ethers.utils.parseEther(amount).toString())
    write();
  }


  const {data, isofferError, isOfferLoading} = useContractRead({
    address: '0x1Dc419f50b9192927cA34f4b4C96c13814b365B7', 
    abi: exchangeInterface,
    functionName: "seeSellProposalsForToken", 
    signerOrProvider: provider, 
    args:[creatorAddress],
    watch: true,
  })
 
  async function buyTheTokenBis() {
   //await creatorToken.connect(signer).approve('0x1Dc419f50b9192927cA34f4b4C96c13814b365B7', ethers.utils.parseEther(amount).toString())
    const result = await ROK.connect(signer).approve('0x1Dc419f50b9192927cA34f4b4C96c13814b365B7', ethers.utils.parseEther(amount).toString()); 
    await result.wait(); 
    const transaction = await write();
    await transaction.wait();
  }


  return (
    <Container>
      <Top>For {price} ROK
      <TopButton onClick={displayBuy}>Buy</TopButton>
      
      </Top>
      <Wrapper>
        <Row>
          <Cover>52 {symbol} for 0.00002 ROK</Cover>
          <Button>Buy</Button>
        </Row>
        {
        data?.map((proposal, i) => (
        <BuyRow 
          creatorAddress={creatorAddress}
          sellerAddress={proposal._sellerAddress}
          tokenAddress={proposal._tokenAddress}
          amount={ethers.utils.formatEther(proposal._amount).toString()}
          price={ethers.utils.formatEther(proposal._price).toString()}
          symbol={symbol}
        />
    ))
  }
      </Wrapper>
    </Container>
  )
}

/*<Row>
          <Cover>{ethers.utils.formatEther(proposal._amount).toString()} {symbol} for {ethers.utils.formatEther(proposal._price).toString()} ROK</Cover>
          <BodyButton onClick={handleBuyFrom}>Buy</BodyButton>
        </Row>*/



        /*{showBuy === true &&
          <Wrap>
            <Cross onClick={hideBuy}>Close</Cross>
            <BuyTokenFrom
              creatorAddress={creatorAddress}
              price={price}
              tokenAddress={tokenAddress}
            />
          </Wrap>
          }*/

export default BuyToken

const Container = styled.div`
  height: 100%; 
  width: 100%; 
  background: transparent;
  overflow: scroll;
  position: relative;
`;

const Wrap = styled.div`
  height: 100%; 
  width: 100%; 
  position: absolute;
  top: 0; 
  bottom: 0; 
  margin-top: auto; 
  margin-bottom: auto;
`; 

/*const BuyContainer = styled.div`
  height: 98%; 
  margin-top: 235px;
  width: 100%; 
  background: #212121;
  border-radius: 50px;
  position: absolute;
  z-index: 5;
  display: flex; 
  flex-direction: column; 
  align-items: center;
  padding: 10px;
`;*/ 

const Cross = styled.div`
  position: absolute; 
  top: 10px; 
  right: 30px;
  z-index: 6;
  height: 40px; 
  width: 140px; 
  background: #FFFFFF; 
  display: flex;
  justify-content: center; 
  align-items: center;
  font-family: roboto mono; 
  font-weight: 300; 
  font-size: 25px;
  border-radius: 100px;
  color: #212121;
  cursor: pointer; 

`; 

/*const Title = styled.text`
  font-size: 25px; 
  font-family: roboto mono; 
  font-weight: 300; 
  color: #FFFFFF;
`;*/

/*const BuyCover = styled.input`
  height: 60px; 
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
  margin-top: 20px; 
  background: transparent; 
  font-family: roboto mono; 
  font-size:25px; 
  color: #FFFFFF; 
  font-weight: 300;
`;*/ 

const Display = styled.text`
  font-family: roboto mono; 
  color: #FFFFFF; 
  font-size: 30px; 
  font-weight: 300; 
  margin-top: 20px;
`;

/*const BuyButton = styled.div`
  height: 50px; 
  width: 150px; 
  background: #FFFFFF; 
  color: #212121; 
  font-family: roboto mono; 
  font-size: 25px; 
  font-weight: 300; 
  margin-top: 20px; 
  display: flex; 
  justify-content: center; 
  align-items: center;
  border-radius: 100px;
  cursor: pointer;
  &:hover {
    background: #212121; 
    border: solid 2px #FFFFFF;
    color: #FFFFFF;
  }
`;*/

/*const BodyButton = styled.div`
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
`; */

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
  align-items: center;
  font-family: roboto mono; 
  font-weight: 300; 
  color: #FFFFFF;
  font-size: 20px;
  margin-bottom: 30px;
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

const TopButton = styled.div`
  height: 45px; 
  width: 120px; 
  background: #FFFFFF; 
  border-radius: 100px; 
  display: flex; 
  justify-content: center; 
  align-items: center;
  margin-left: 30px;
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