import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Profil from './components/Profil';
import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultWallets, RainbowKitProvider, darkTheme, ConnectButton} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { myCustomTheme } from './components/Theme';
import Registerd from './components/Registerd';
import Discover from './components/Discover';
import Exchange from './components/Exchange';
import Trade from './components/Trade';

//const alchemyKey = process.env.ALCHEMY_ID;
const alchemyKey = 'w7eEPiIoWugKjoU7vCuJhmfwAihhPNqQ';


//https://billyjitsu.hashnode.dev/the-rainbowkit-wagmi-guide-i-wish-i-had

const {chains, provider} = configureChains(
  [polygonMumbai], 
  [
    alchemyProvider({apiKey: alchemyKey}), 
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider 
        chains={chains}
        theme = {darkTheme({
          borderRadius: "large",
          accentColor: "#3B3395",
          overlayBlur: "small", 
          fontStack: "rounded",
          fontStack: "abril fatface", 
        })}
      >
      
      <Container>
        <Header />
        <Exchange />
      </Container>
       
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;

const Container = styled.div`
  width: 100vw; 
  height: 100vh;
  //height: auto;
  padding-top: 150px;
  text-align: center;
  background: #DCCFAC;
  //padding: 30px;
  overflow: scroll;
`;

const Text = styled.text`
  font-family: abril fatface; 
  font-size: 40px; 
  background: transparent;
  color: #74623F;
`; 