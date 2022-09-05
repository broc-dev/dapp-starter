import React, { useState, useEffect, useRef, useMemo, Ref } from 'react';
import {
    useAccount, useBalance,
    useContract, useContractEvent,
    useContractInfiniteReads, useSwitchNetwork,
    useTransaction, usePrepareSendTransaction,
    useSendTransaction, useWaitForTransaction
} from 'wagmi';
import ts from 'tailwind-styled-components';

// @ts-ignore
import hourglass from '@images/loader.apng';
// @ts-ignore
import barebonesIdle from '@images/barebones.apng';
// @ts-ignore
import krakenIdle from '@images/kraken.apng';
// @ts-ignore
import cavesong from '@audio/cavesong.mp3';
// @ts-ignore
import buttonClick from '@audio/button-click.wav';
// @ts-ignore
import buttonClick2 from '@audio/button-click-2.wav';
import { on } from 'stream';

// @todo Add live contract
// const contract = useContract({
//     addressOrName: '',
//     contractInterface: [],
// });

/**
 * Mint Button
 * 
 * When clicked, begins a mint transaction with the chosen 
 * @param children Takes 'string' as a child and returns a button with the child as the text
 * @returns MintButton
 */
const MintButton = ({ children, selection, audioRef }: { children: string, selection: number, audioRef: any }) => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);

    const classes = `
        w-full
        h-16
        bg-murkyblack
        border-2
        border-gray-2
        font-header
        text-2xl
        font-medium
        text-zinc-400
        hover:bg-deepsea
        hover:border-deepsea
        hover:text-foam
        active:bg-aqua
        active:border-white
    `;

    const clickFunc = () => {
        audioRef?.current?.play();
        console.log('Attempting to mint ' + selection + ' NFTs');
        setLoading(true);
    }

    return(
        <div>
            <button className={classes} onClick={clickFunc}>
                {!loading
                    ? children
                    : <div className="w-full h-full flex justify-center items-center">
                        <img className="max-h-full" src={hourglass} alt="Loading..." />
                        <h1 className="ml-2 text-xl text-zinc-400 font-medium font-header">Loading...</h1>
                    </div>
                }
            </button>
            {/** Information */}
            <Information />
        </div>
    )
}

/**
 * Displays basic NFT and wallet info: user balance of ETH, and 
 * @returns Information Section
 */
const Information = () => {
    const [address, setAddress] = useState(null);
    const { address: addr } = useAccount({
        onConnect() {
            setAddress(addr);
        }
    })
    
    const [balance, setBalance] = useState(null);
    const { data, isError, isLoading, isSuccess } = useBalance({
        addressOrName: address,
        chainId: 1,
        watch: true,
        onSuccess(data) {
            setBalance(data.formatted.substring(0, 5));
        }
    });

    return (
        <div className="w-full h-7 bg-murkyblack bg-opacity-40 backdrop-blur-md flex items-center justify-center">
            <span className="text-zinc-600 text-lg font-pixel">
                0.01 ETH EACH&nbsp;·&nbsp;
                {/** Read remaining from contract */}3000/3000 REMAINING
                {/* {isSuccess && <span>&nbsp;·&nbsp;{`${(data.decimals > 0) ? data.formatted.substring(0, 5) : 0} ETH`}</span>} */}
                {balance && <span>&nbsp;·&nbsp;{balance} ETH</span>}
                &nbsp;·&nbsp;<a className="hover:underline" href="#">Contract</a>
            </span>
        </div>
    )
}

const MintPanel = ({ audioPlaying }: { audioPlaying: boolean }) => {
    const [ selection, setSelection ] = useState(0);

    const btnClick = useRef<HTMLAudioElement | undefined>(
		typeof Audio !== "undefined" ? new Audio("") : undefined
    );
    const btnClick2 = useRef<HTMLAudioElement | undefined>(
        typeof Audio !== "undefined" ? new Audio("") : undefined
    );

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

    const sel1 = useRef(null);
    const sel2 = useRef(null);
    const sel3 = useRef(null);

    useEffect(() => {
        if (selection === 1) {
            sel1.current.classList.add('bg-deepsea');
            sel1.current.classList.add('text-white');
            sel1.current.classList.replace('border-opacity-0', 'border-opacity-100');
            sel1.current.classList.replace('border-murkyblack', 'border-white');
            sel2.current.classList.remove('bg-deepsea');
            sel2.current.classList.remove('text-foam');
            sel2.current.classList.replace('border-opacity-100', 'border-opacity-0');
            sel2.current.classList.replace('border-white', 'border-murkyblack');
            sel3.current.classList.remove('bg-deepsea');
            sel3.current.classList.remove('text-foam');
            sel3.current.classList.replace('border-opacity-100', 'border-opacity-0');
            sel3.current.classList.replace('border-white', 'border-murkyblack');
        } else if (selection === 5) {
            sel1.current.classList.remove('bg-deepsea');
            sel1.current.classList.remove('text-foam');
            sel1.current.classList.replace('border-opacity-100', 'border-opacity-0');
            sel1.current.classList.replace('border-white', 'border-murkyblack');
            sel2.current.classList.add('bg-deepsea');
            sel2.current.classList.add('text-white');
            sel2.current.classList.replace('border-opacity-0', 'border-opacity-100');
            sel2.current.classList.replace('border-murkyblack', 'border-white');
            sel3.current.classList.remove('bg-deepsea');
            sel3.current.classList.remove('text-foam');
            sel3.current.classList.replace('border-opacity-100', 'border-opacity-0');
            sel3.current.classList.replace('border-white', 'border-murkyblack');
        } else if (selection === 10) {
            sel1.current.classList.remove('bg-deepsea');
            sel1.current.classList.remove('text-foam');
            sel1.current.classList.replace('border-opacity-100', 'border-opacity-0');
            sel1.current.classList.replace('border-white', 'border-murkyblack');
            sel2.current.classList.remove('bg-deepsea');
            sel2.current.classList.remove('text-foam');
            sel2.current.classList.replace('border-opacity-100', 'border-opacity-0');
            sel2.current.classList.replace('border-white', 'border-murkyblack');
            sel3.current.classList.add('bg-deepsea');
            sel3.current.classList.add('text-white');
            sel3.current.classList.replace('border-opacity-0', 'border-opacity-100');
            sel3.current.classList.replace('border-murkyblack', 'border-white');
        }
    }, [selection]);

    return(
        <div className="md:max-w-lg max-w-sm w-full h-full flex flex-col justify-between z-10">
            {/* Background Music */}
			<audio ref={musicRef} id="bg_music" src={cavesong} loop={true}></audio>
            {/* Button Audios */}
            <audio ref={btnClick} src={buttonClick} loop={false}></audio>
            <audio ref={btnClick2} src={buttonClick2} loop={false}></audio>
            <div className="">
                <h1 className="text-6xl text-white drop-shadow-2xl font-header font-normal w-full text-center mb-2" style={{"textShadow": "8px 8px 0 rgba(0,0,0,0.7)"}}>Pseudo Krakens</h1>
                <p className="text-4xl text-foam font-pixel text-center" style={{"textShadow": "4px 4px 0 #000"}}>
                    Pseudo Krakens. They're up to no good.
                </p>
            </div>
            {/** Button Group */}
            <div className="w-full">
                <div className="relative flex flex-row justify-center items-end z-10">
                    <img  src={krakenIdle} alt="Barebones Idle" />
                    <img  src={barebonesIdle} alt="Barebones Idle" />
                </div>
                <div className="relative z-20">
                    <div className="w-full h-8 flex flex-row justify-between items-center border-2 border-b-0 border-gray-2">
                        <button
                            ref={sel1}
                            className="w-1/3 h-full bg-murkyblack hover:bg-deepsea border-2 border-murkyblack border-opacity-0 text-sm leading-0 font-header font-normal text-zinc-400 hover:text-white"
                            onClick={() => {setSelection(1); btnClick.current?.play();}}
                        >1</button>
                        <button
                            ref={sel2}
                            className="w-1/3 h-full bg-murkyblack hover:bg-deepsea border-2 border-murkyblack border-opacity-0 text-sm leading-0 font-header font-normal text-zinc-400 hover:text-white"
                            onClick={() => {setSelection(5); btnClick.current?.play();}}
                        >5</button>
                        <button
                            ref={sel3}
                            className="w-1/3 h-full bg-murkyblack hover:bg-deepsea border-2 border-murkyblack border-opacity-0 text-sm leading-0 font-header font-normal text-zinc-400 hover:text-white"
                            onClick={() => {setSelection(10); btnClick.current?.play();}}
                        >10</button>
                    </div>
                    <MintButton audioRef={btnClick2} selection={selection}>Mint</MintButton>
                </div>
            </div>
        </div>
    )
}
export default MintPanel;