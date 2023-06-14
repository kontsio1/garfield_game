import Phaser from "phaser";

class Loading extends Phaser.Scene{

constructor(){
    super('Loading')
}
    
preload(){
    this.middleX = this.cameras.main.width/2
    this.middleY = this.cameras.main.height/2

    this.cameras.main.setBackgroundColor("#FFA500")

    this.PlayButton = this.add.text(this.middleX, this.middleY-5, 'PLAY GAME',
        {
            color: "#ffffff",
            backgroundColor:"#aa4a4ac8",
            fontStyle: 'strong',
            fontSize: "60px"
        }).setScale(2).setPadding(5,5)
    this.PlayButton.x -= this.PlayButton.width
    this.PlayButton.setInteractive()
    this.PlayButton.on('pointerdown', ()=>{
        this.PlayButton.setBackgroundColor("#6d0707")
        setTimeout(() => {
            this.scene.switch("Main")
        }, 500);
    })
    
    
    
    
}

create(){

}

update(){
}

}

export {Loading};