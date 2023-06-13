import Phaser from "phaser";
import { useEffect, useState } from "react";

export const GameHolder = () => {

  useEffect(()=>{
    class MainScene extends Phaser.Scene {
      constructor() {
        super();
      }
  //PRELOADER
      preload() {
        this.load.image("Sky", "./assets/Sky.jpeg");
        this.load.image("player", "./assets/Garfield.png");
        this.load.image("ground", "./assets/platform.png");
        this.load.image("island", "./assets/platform.png");
        this.load.image("lasagna", "./assets/Lasagna.png")
      }
  //ADD ENTITIES
      create() {
        let sky = this.add.image(400, 250, "Sky");
        sky.setScale(1.4);
  
        this.platforms = this.physics.add.staticGroup(); // static group
        this.platforms
          .create(400, 500, "ground")
          .setDisplaySize(800, 100)
          .refreshBody(); //refreshBody keeps checking for collision
        this.platforms
          .create(100, 300, "island")
          .setDisplaySize(100, 30)
          .refreshBody();
        this.platforms
          .create(650, 200, "island")
          .setDisplaySize(100, 30)
          .refreshBody();
        this.platforms
          .create(400, 400, "island")
          .setDisplaySize(100, 30)
          .refreshBody();
        this.platforms
          .create(300, 150, "island")
          .setDisplaySize(100, 30)
          .refreshBody();
  
        this.player = this.physics.add.sprite(100, 0, "player").setScale(0.3);
        this.physics.add.collider(this.player, this.platforms);
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.1);

        this.lasagna = this.physics.add.group()
        for (let i=50; i<this.game.config.width; i+= 60){
          this.lasagna.create(i,0,'lasagna').setScale(0.08)
        }
        this.lasagna.children.iterate((child)=>{
          child.setBounce(Phaser.Math.FloatBetween(0.4, 0.8))
        })
        this.physics.add.collider(this.lasagna,this.platforms)
        
        this.physics.add.overlap(this.player, this.lasagna, this.collectLasagna, null, this)
      }

    //FUNCTIONALITY
      update() {
        let cursors = this.input.keyboard.createCursorKeys();
        
        if(Phaser.Input.Keyboard.JustDown(cursors.up)){
          if(this.player.body.touching.down){
            this.canDoubleJump = true
            this.player.setVelocityY(-400)
          } 
          else if(this.canDoubleJump) {
            this.canDoubleJump = false
            this.player.setVelocityY(-400)
          }
        }
        if (cursors.left.isDown) {
          this.player.setVelocityX(-160);
        } else if (cursors.right.isDown) {
          this.player.setVelocityX(160);
        } else {
          this.player.setVelocityX(0, 0);
        }
      }

      collectLasagna(player, lasagna) {
        lasagna.disableBody(true,true)
      }

    }
  
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
      scene: MainScene,
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