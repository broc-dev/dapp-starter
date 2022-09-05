import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head';
import Web3Provider from '@/components/Web3Provider'
import '@/styles/globals.css';

const App = ({ Component, pageProps }) => {
	return (
		<ThemeProvider attribute="class">
			<Head>
				<link rel="stylesheet" href="https://use.typekit.net/ych5thr.css" />
			</Head>
			<Web3Provider>
				<Component {...pageProps} />
			</Web3Provider>
		</ThemeProvider>
	)
}

export default App
