import React from 'react'
import { useAccount } from 'wagmi'
import Image from 'next/image';
import ts from 'tailwind-styled-components';

import krakenGif from '@images/kraken.gif';

const H1 = ts.h1`
    text-white
    font-header
    lg:text-4xl
    md:text-3xl
    text-2xl
`;

const P = ts.p`
    text-zinc-400
    font-pixel
    lg:text-3xl
    text-2xl
    md:mb-3
    mb-2
`;

const InfoText = ts.h1`
    text-foam
    font-header
    text-2xl
`;

const DemoButton = ts.button`
    bg-deepsea
    hover:bg-aqua
    text-zinc-400
    hover:text-white
    font-header
    md:text-2xl
    text-xl
    md:py-3
    md:px-5
    py-2
    px-4
    mt-3
`;

const Info = () => {
    return(
        <div className="w-screen min-h-screen h-auto flex flex-col items-stretch justify-center bg-gradient-to-b from-black to-transparent">
            <div className="w-full h-full md:p-8 p-4 flex flex-row items-stretch justify-center md:flex-nowrap flex-wrap">
                <div className="md:w-1/2 w-full m-4 md:p-10 p-4 bg-black backdrop-blur-sm bg-opacity-40 rounded-lg">
                    <H1>Pseudo Krakens?</H1>
                    <P>In celebration of our launch on Arbitrum Nova, and in honor of SudoSwap...</P>
                    <P>We give you, the "pseudo-kraken", an in-game cosmetic pet that follows your player.</P>
                    <P>These pets will render in the MMO open world universe with the Alpha release. You will be able to choose which pet follows you at any given time.</P>
                    <P>The pseudo-kraken is known for its telepathy, manipulating crystalline structures to amplify its signals, akin to sonar on steroids. Pseudo-krakens communicate this way, as a hivemind. With their chain of agents dispersed throughout the universe, an ally is never too far.</P>
                    <a href="#demo"><DemoButton>See in action</DemoButton></a>
                </div>
                <div className="relative md:w-1/2 w-full m-4 md:p-10 p-4 bg-zinc-700 bg-opacity-0 rounded-lg">
                    <Image layout='responsive' src={krakenGif} />
                    <div className="absolute md:top-8 md:left-8 top-4 left-4">
                        <InfoText>3000 Krakens</InfoText>
                        <InfoText>0.01 ETH Each</InfoText>
                        <InfoText>YOUR INGAME COMPANION</InfoText>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info;