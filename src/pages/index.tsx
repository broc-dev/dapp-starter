import { FC, useRef, useState, useEffect } from 'react'
import { APP_NAME } from '@/lib/consts'
import { motion, AnimatePresence } from 'framer-motion';
import { Button, PageNavButton } from '@/components/StyledComponents';
import Info from '@/components/sections/InfoSection';
import Demo from '@/components/sections/DemoSection';
import Footer from '@/components/sections/FooterSection';

import MintPanel from '@/components/MintPanel';
// @ts-ignore
import desktopBG from '@images/desktop-bg.apng';

const Home: FC = () => {
	const buttonRefs = [useRef(null), useRef(null)];

	const [mintActive, setMintActive] = useState(false);

	return (
		<div>
			<div> {/* PAGE SECTION 1 */}
				<img className="absolute top-0 left-0 w-full h-full max-h-screen" style={{"objectFit": 'cover'}} src={desktopBG} alt="BG" />
				<div className="w-screen h-screen flex flex-col items-stretch justify-center bg-gradient-to-br from-zinc-900 to-gray-1">
					
					{/* Mint Button Container */}
					<div className="w-full h-5/6 flex justify-center items-stretch">
						<MintPanel />
					</div>
				</div>
			</div>
			<div style={{"backgroundImage": "url(images/stone-tiles.png)"}} className="w-screen min-h-screen h-auto">
				<Info />
				<Demo />
			</div>
			<Footer />
		</div>
	)
}

export default Home
