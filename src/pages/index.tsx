import { FC, useRef, useState, useEffect } from 'react'
import { APP_NAME } from '@/lib/consts'
import ConnectWallet from '@/components/ConnectWallet'
import Head from 'next/head';
import Image from 'next/image';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'
import { Button, PageNavButton } from '@/components/StyledComponents';
import MintPanel from '@/components/MintPanel';

import tridentWordmark from '@images/trident-wordmark.svg';
// @ts-ignore
import desktopBG from '@images/desktop-bg.apng';

const ToggleAudioBtn = ({ audioPlaying, toggleAudio }) => {
	return (
		<div className="fixed right-8 bottom-8 z-50" onClick={toggleAudio}>
			{audioPlaying ? <SpeakerWaveIcon className="h-6 w-6 text-white" /> : <SpeakerXMarkIcon className="h-6 w-6 text-white" />}
		</div>
	)
}

const Home: FC = () => {
	const [audioPlaying, setAudioPlaying] = useState(true);
	const toggleAudio = () => {
		setAudioPlaying(!audioPlaying);
	}

	const [ currentPage, setCurrentPage ] = useState(0);
	const buttonRefs = [useRef(null), useRef(null)];

	return (
		<div>
			{/* PAGE NAVIGATION */}
			<div className="fixed left-8 top-0 bottom-0 h-screen flex flex-col items-center justify-center z-50">
				<PageNavButton ref={buttonRefs[0]} onClick={() => setCurrentPage(0)} active={currentPage == 0 ? true : false}></PageNavButton>
				<PageNavButton ref={buttonRefs[1]} onClick={() => setCurrentPage(1)} active={currentPage == 1 ? true : false}></PageNavButton>
			</div>
			{/* Nav Bar */}
			<div className="sm:fixed absolute top-0 w-full flex sm:flex-row flex-col justify-between items-center px-4 bg-zinc-900 bg-opacity-10 hover:bg-opacity-50 backdrop-blur-lg transition duration-200 z-50">
				<div className="flex flex-row items-center">
					<Image src={tridentWordmark} alt="Trident" width={128} height={32} />
				</div>
				<div className="sm:absolute top-0 left-0 w-full h-full flex flex-row items-center justify-center">
					<div className="flex flex-row items-center justify-center text-zinc-200 hover:text-zinc-500">
						<a className="font-serif text-lg font-medium hover:text-white hover:bg-zinc-900 transition duration-100 px-3 py-2" href="https://trident.game">Home</a>
						<a className="font-serif text-lg font-medium hover:text-white hover:bg-zinc-900 transition duration-100 px-3 py-2" href="https://twitter.com/TridentDAO">Twitter</a>
						<a className="font-serif text-lg font-medium hover:text-white hover:bg-zinc-900 transition duration-100 px-3 py-2" href="https://discord.gg/tridentdao">Discord</a>
					</div>
				</div>
				<ConnectWallet />
			</div>
			{/* Toggle Audio Btn */}
			<ToggleAudioBtn audioPlaying={audioPlaying} toggleAudio={toggleAudio} />
			<div> {/* PAGE SECTION 1 */}
				<img className="absolute top-0 left-0 w-full h-full" style={{"objectFit": 'cover'}} src={desktopBG} alt="BG" />
				<div className="w-screen h-screen flex flex-col items-stretch justify-center bg-gradient-to-br from-zinc-900 to-gray-1">
					
					{/* Mint Button Container */}
					<div className="w-full h-5/6 flex justify-center items-stretch">
						<MintPanel audioPlaying={audioPlaying} />
					</div>
				</div>
			</div>
			<div> {/* PAGE SECTION 2 */}
				<div className="w-screen h-screen flex flex-col items-stretch justify-center bg-murkyblack">

				</div>
			</div>
		</div>
	)
}

export default Home
