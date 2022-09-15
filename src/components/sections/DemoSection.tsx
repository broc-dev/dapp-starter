import React from 'react';
import { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import dynamic from 'next/dynamic';
// import PhaserGame from './phaser/index';

// IonPhaser causes a problem with NextJS SSR. Need to import component like so so that it can be client rendered only.
const PhaserGame = dynamic(
    () => import('./phaser/index'),
    { ssr: false }
);


const Demo = ({ selectedKrakenID = 0 }) => {
    const [connected, setConnected] = useState(false);
    const account = useAccount();

    const [hasKrakens, setHasKrakens] = useState(true);
    const [krakenIDs, setKrakenIDs] = useState([1, 2, 3, 4, 5, 6, 20]); // @todo replace with [] and get krakenIDs from user input

    useEffect(() => {
        if (account.isConnected) {
            setConnected(true);
        } else {
            setConnected(false);
        }
    }, [account.isConnected]);

    return(
        <div className="w-screen h-screen px-12 pb-12 bg-gradient-to-b from-transparent to-black">
            <div id="demo" className="relative w-full h-full flex flex-col items-stretch justify-center bg-murkyblack shadow-2xl rounded-lg">
                <div className="bg-black md:hidden absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                    <h1 className="text-2xl text-white font-header">Experience only viewable on desktop</h1>
                </div>
                {!connected
                && <div className="bg-black md:flex absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                    <h1 className="text-2xl text-white font-header">You must be connected to view your<br />pseudo kraken.</h1>
                </div>}
                {hasKrakens ? <PhaserGame isConnected={connected} krakenIDs={krakenIDs} selectedKrakenID={selectedKrakenID} />
                : <div className="bg-black md:flex absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                    <h1 className="text-2xl text-white font-header">You have no pseudo krakens.</h1>
                </div>}
            </div>
        </div>
    )
}

export default Demo;