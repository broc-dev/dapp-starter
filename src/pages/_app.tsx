import { useRef, useState, useEffect } from 'react'
import 'tailwindcss/tailwind.css'
import Head from 'next/head';
import Web3Provider from '@/components/Web3Provider'
import ConnectWallet from '@/components/ConnectWallet'
import KrakenWallet from '@/components/KrakenWallet'
import Image from 'next/image';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'
import '@/styles/globals.css';
import { motion, AnimatePresence } from 'framer-motion'

import tridentWordmark from '@images/trident-wordmark.svg';

// @ts-ignore
import cavesong from '@audio/cavesong.mp3';

const ToggleAudioBtn = ({ audioPlaying, toggleAudio }) => {
	return (
		<div className="fixed right-8 bottom-8 z-40 p-3 bg-zinc-900 hover:bg-zinc-800 rounded-full shadow-md" onClick={toggleAudio}>
			{audioPlaying ? <SpeakerWaveIcon className="h-6 w-6 text-white" /> : <SpeakerXMarkIcon className="h-6 w-6 text-white" />}
		</div>
	)
}

const App = ({ Component, pageProps, router }) => {
	const [ krakenIds, setKrakenIds ] = useState([]);

	const [audioPlaying, setAudioPlaying] = useState(true);

	const musicRef = useRef<HTMLAudioElement | undefined>(
		typeof Audio !== "undefined" ? new Audio("") : undefined
    );

	const playMusic = () => {
		if (musicRef.current) {
			musicRef.current.paused && musicRef.current?.play();
		}
	}

	const pauseMusic = () => {
		if (musicRef.current) {
			musicRef.current?.pause();
		}
	}

	useEffect(() => {
        if (audioPlaying) {
            playMusic();
        } else {
            pauseMusic();
        }
	}, [audioPlaying]);

	const toggleAudio = () => {
		setAudioPlaying(!audioPlaying);
	}

	return (
		<div>
			<Head>
				<title>Pseudo Krakens - Trident</title>
			</Head>
			{/* Background Music */}
			<audio ref={musicRef} id="bg_music" src={cavesong} loop={true}></audio>
			<Web3Provider>
				<AnimatePresence>

					<Component {...pageProps} audioPlaying={audioPlaying} />
					{/* </motion.div> */}
				</AnimatePresence>
				{/* Nav Bar */}
				<div className="sm:fixed absolute top-0 w-full flex sm:flex-row flex-col justify-between items-center px-4 bg-gradient-to-b from-black to-transparent z-40">
					<div className="flex flex-row items-center">
						<Image src={tridentWordmark} alt="Trident" width={128} height={32} />
						<div className="flex flex-row items-center justify-center ml-6">
							<a className="font-serif text-lg font-medium text-zinc-500 hover:text-white transition duration-100 px-3 py-2" href="https://trident.game">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
								<path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
								<path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
								</svg>
							</a>
							<a className="font-serif text-lg font-medium fill-zinc-500 hover:fill-white transition duration-100 px-3 py-2" href="https://twitter.com/TridentDAO">
								<svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>
							</a>
							<a className="font-serif text-lg font-medium fill-zinc-500 hover:fill-white transition duration-100 px-3 py-2" href="https://discord.gg/tridentdao">
								<svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/></svg>
							</a>
						</div>
					</div>
					<div className="flex flex-row items-center cursor-pointer">
						<ConnectWallet />
						<KrakenWallet setKrakenIds={setKrakenIds} />
					</div>
				</div>
				{/* Toggle Audio Btn */}
				<ToggleAudioBtn audioPlaying={audioPlaying} toggleAudio={toggleAudio} />
			</Web3Provider>
		</div>
	)
}

export default App
