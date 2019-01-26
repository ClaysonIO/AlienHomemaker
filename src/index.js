import 'phaser';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,

    }
};

var game = new Phaser.Game(config);

class cover extends Phaser.Scene {
  function

  preload() {
    this.load.image('logo', 'assets/logo.png');
  }

  function

  create() {
    var logo = this.add.image(550, 150, 'logo');

    // this.tweens.add({
    //     targets: logo,
    //     y: 450,
    //     duration: 2000,
    //     ease: 'Power2',
    //     yoyo: true,
    //     loop: -1
    // });

    let button = this.add.rectangle(200, 550, 200, 100, 0xff0000);
    button.setInteractive();

    button.on('pointerdown', () => console.log("Down"))
  }
}

class SceneA extends Phaser.Scene {

  constructor ()
  {
    super('SceneA');
  }

  create ()
  {
    let button = this.add.rectangle(200, 550, 200, 100,  0x00ff00);
  }

  update (time, delta)
  {

  }

}
