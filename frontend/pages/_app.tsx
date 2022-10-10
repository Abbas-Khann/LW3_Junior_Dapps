import '../styles/globals.css';
import { Provider } from '@self.id/react';
import { ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
const { chains, provider } = configureChains(
  [chain.goerli, chain.polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Junior Dapps',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider client={{ ceramic: "testnet-clay" }}>
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains} modalSize="compact" theme={midnightTheme({
      accentColor: '#6A62FC4F',
      accentColorForeground: 'white',
      borderRadius: 'small',
      fontStack: 'rounded'
    })}>
    <ToastContainer
    theme='dark'
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
    <Component {...pageProps} />
    </RainbowKitProvider>
    </WagmiConfig>
    </Provider>
    );
}

export default MyApp
