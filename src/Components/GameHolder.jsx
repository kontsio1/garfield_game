import Phaser from "phaser";
import { useEffect, useState } from "react";
import Main from "../Scenes/Main";
import { Loading } from "../Scenes/Loading";

export const GameHolder = () => {


  useEffect(()=>{
    const LoadingToPlay = new Loading()
    const MainToPlay = new Main()

    const config = {
      type: Phaser.AUTO,
      title: "some-game-title",
      parent: "game-container",
      width: 800,
      height: 500,
      pixelArt: true,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 600 },
          debug: true,
        },
      },
      scene: [LoadingToPlay, MainToPlay],
    };
    new Phaser.Game(config);
  },[])
  
  return(
    <>
      <div id='game-container'>
    {/* This is the game container */}
      </div>
    </>
  )
};