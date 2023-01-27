import React from 'react'
import { useProvider } from 'wagmi'
import { useAccount } from 'wagmi'
import exchangeInterface from '../contracts/Exchange.json';
import { ethers } from 'ethers';
import { erc20ABI } from 'wagmi';
import { useSigner } from 'wagmi';
import { useContract } from 'wagmi';
import { usePrepareContractWrite, useContractWrite } from 'wagmi'

/*export function SellProposal(creatorAddress, sellOfferAmount, sellOffer) {
  const { data: signer, isSignerError, isSignerLoading } = useSigner()
  const {config} = usePrepareContractWrite({
    address: '0x1Dc419f50b9192927cA34f4b4C96c13814b365B7', 
    abi: exchangeInterface,  
    functionName: 'makeSellProposal', 
    signerOrProvider: signer,
    args: [creatorAddress, ethers.utils.parseEther(sellOffer).toString(), ethers.utils.parseEther(sellOfferAmount).toString()],
  })

  const {data, isLoading, isSuccess, write} = useContractWrite(config);

}*/