import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './components/Home'
import NFTDemo from './components/nft/NFTDemo'
import { arbitrum, mainnet, polygon, sepolia } from 'viem/chains'
import { Web3Modal, createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi-react-native'
import { WagmiConfig } from 'wagmi'
import Mint from './components/nft/Mint'

const projectId = 'ca798ffca58c5bd1ba43bda18f1608b1'

const metadata = {
  name: 'Web3 Modal NFT App',
  description: 'Demonstraing Wallet connect with RN and expo using Wagmi and Viem',
  url: 'https://www.example.com',
  icons: [''],
  redirect: {
    native: '',
    universal: ''
  }
}

const chains = [sepolia, mainnet, polygon, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata})

createWeb3Modal({
  projectId,
  chains,
  wagmiConfig
})


export type RootParamsList = {
  Home: undefined;
  NFTDemo: undefined;
  Mint: undefined;
}

const Stack = createNativeStackNavigator()

export default function App () {
  return (
    <WagmiConfig config={wagmiConfig}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='NFTDemo' component={NFTDemo} />
          <Stack.Screen name='Mint' component={Mint} />
        </Stack.Navigator>
      </NavigationContainer>
      <Web3Modal />
    </WagmiConfig>
  )
}