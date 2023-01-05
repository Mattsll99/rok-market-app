import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
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

const alchemyKey = process.env.ALCHEMY_ID;

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
        <Text>Buy, Sell, & Trade <br /> the tokens of your fav content creators</Text>
        <Profil />
        </Container>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;

const Container = styled.div`
  width: 100vw; 
  height: 200vh;
  //height: auto;
  padding-top: 150px;
  text-align: center;
  background: #DCCFAC;
`;

const Text = styled.text`
  font-family: abril fatface; 
  font-size: 40px; 
  background: transparent;
  color: #74623F;
`; 