import Phaser from "phaser";

class Main extends Phaser.Scene {
    constructor() {
      super('Main');
    }
//PRELOADER
    preload() {
      this.load.image("Sky", "./assets/Sky.jpeg");
      this.load.image("player", "./assets/Garfield.png");
      this.load.image("ground", "./assets/platform.png");
      this.load.image("island", "./assets/platform.png");
      this.load.image("lasagna", "./assets/Lasagna.png");
    }
//ADD ENTITIES
    create() {
      let sky = this.add.image(400, 250, "Sky");
      sky.setScale(1.4);

      this.platforms = this.physics.add.staticGroup(); // static group
      this.platforms.create(400, 500, "ground").setDisplaySize(800, 100).refreshBody(); //refreshBody keeps checking for collision
      this.platforms.create(100, 300, "island").setDisplaySize(100, 30).refreshBody();
      this.platforms.create(650, 200, "island").setDisplaySize(100, 30).refreshBody();
      this.platforms.create(400, 400, "island").setDisplaySize(100, 30).refreshBody();
      this.platforms.create(300, 150, "island").setDisplaySize(100, 30).refreshBody();

      this.player = this.physics.add.sprite(100, 0, "player").setScale(0.3);
      this.player.setCollideWorldBounds(true);
      this.player.setBounce(0.2);
      
      this.lasagna = this.physics.add.group()
      for (let i=50; i<this.game.config.width; i+= 60){
          this.lasagna.create(i,0,'lasagna').setScale(0.08)
        }
        this.lasagna.children.iterate((child)=>{
            child.setBounce(Phaser.Math.FloatBetween(0.4, 0.8))
        })
    
      this.score = 0
      this.ScoreDisplay = this.add.text(0,0,`Score: ${this.score}`).setFontSize(30)

      this.physics.add.collider(this.player, this.platforms);
      this.physics.add.collider(this.lasagna,this.platforms)
      this.physics.add.overlap(this.player, this.lasagna, this.collectLasagna, null, this)
    }

  //FUNCTIONALITY
    update() {
      let cursors = this.input.keyboard.createCursorKeys();
    //   this.keys = this.input.keyboard.addKeys('W','S','A','D')
    //   console.log(this.keys)
      
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
      this.score += 1
      this.ScoreDisplay.setText(`Score: ${this.score}`)
      if(this.lasagna.countActive(true) === 0){
        this.lasagna.children.iterate(child => {
            child.enableBody(true, child.x, 0, true, true)
        })
      }
    }
  }

  export default Main;