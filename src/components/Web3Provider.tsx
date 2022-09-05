import { useTheme } from 'next-themes'
import { APP_NAME } from '@/lib/consts'
import { createClient, WagmiConfig } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'

const client = createClient(
	getDefaultClient({
		appName: APP_NAME,
		autoConnect: true,
		infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
	})
)

const Web3Provider = ({ children }) => {
	const { resolvedTheme } = useTheme()

	return (
		<WagmiConfig client={client}>
			<ConnectKitProvider
				theme='midnight'
				mode='auto'
				customTheme={{
					"--ck-connectbutton-border-radius": "0px",
					"--ck-connectbutton-hover-background": "#222222",
					"--ck-border-radius": "0px",
					"--ck-font-family": '"interstate-mono", monospace',
					"--ck-body-background": '#0a100d',
					"--ck-accent-color": '#222222',
					"--ck-accent-text-color": '#ffe7bc',
					"--ck-primary-button-border-radius": '0px',
				  }}>{children}</ConnectKitProvider>
		</WagmiConfig>
	)
}

export default Web3Provider
