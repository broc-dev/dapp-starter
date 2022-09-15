import React, { useState, useRef, useEffect } from 'react';
import { IonPhaser } from "@ion-phaser/react";
import config from "./config";
import vars from './vars';
import { EventManager as events } from './managers/EventManager';
// import "./style.scss";

import DemoScene from "./scenes/Demo";

export const setSelectedKraken = (id) => {
    vars.chosenKrakenID = id;
    events.emit('updateKrakenIDs');
}

const PhaserGame = (
    { isConnected, krakenIDs, selectedKrakenID }: 
    { isConnected: boolean, krakenIDs: Number[], selectedKrakenID: Number }) => {
    const gameRef = useRef(null);
    const startBtnRef = useRef(null);
    const globals = { krakenIDs: krakenIDs, selectedKrakenID: selectedKrakenID };

    // Call `setInitialize` when you want to initialize your game! :)
    const [initialize, setInitialize] = useState(false);

    function startGame() {
        events.removeAllListeners();
        vars.krakenIDs = krakenIDs;
        vars.selectedKrakenID = selectedKrakenID;
        setInitialize(true);
    };

    // @todo Change
    const changeKrakenIDs = () => {
        vars.krakenIDs = [1, 3, 5, 6, 7, 8, 9, 10, 37, 58, 29, 102, 105, 103];
        vars.chosenKrakenID = vars.krakenIDs[Math.floor(Math.random() * vars.krakenIDs.length)];
        events.emit('updateKrakenIDs');
    }

    useEffect(() => {
        destroy();
    }, [isConnected]);

    function destroy() {
        if (gameRef.current) {
            gameRef.current.destroy();
        }
        setInitialize(false);
    };

    return (
    <>
        <button 
                className={
                    'w-64 h-16 bg-deepsea text-zinc-400 hover:bg-aqua hover:text-white font-header text-3xl'
                }
                onClick={() => changeKrakenIDs()}
            >
                Sneed
            </button>
        <div id="phaser-wrapper" className="w-full h-full flex flex-col justify-center items-center">
            <button
                className={
                    !initialize
                    ? 'w-64 h-16 bg-deepsea text-zinc-400 hover:bg-aqua hover:text-white font-header text-3xl'
                    : 'hidden'
                }
                onClick={() => startGame()}
                ref={startBtnRef}
            >
                Start
            </button>
            <IonPhaser
                ref={gameRef}
                game={Object.assign(config, {
                    scene: [
                        DemoScene
                    ],
                    data: {
                        sneed: "feed"
                    }
                }, globals)}
                initialize={initialize}
            />
        </div>
    </>
    );

}

export default PhaserGame;