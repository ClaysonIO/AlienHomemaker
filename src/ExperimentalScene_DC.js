import {Person} from "./person";
import {width, height} from "./index";

export const ExperimentalScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function StartScene ()
    {
      Phaser.Scene.call(this, {
        key: 'startScene',
        active: true,
      });
    },

  allPeople: [],

  preload: function ()
  {
    this.load.image("button", "assets/start.png");
    this.load.image("ship", "assets/spaceship.png");
    this.load.image("face", "assets/face.png");
  },

  create: function ()
  {
    const spaceship = this.add.sprite(450, 300, "ship");


    var wallThickness = 64;
    var sides = (wallThickness * 2) + 96;
    var worldBounds = new Phaser.Geom.Rectangle(0, 0, width, height);
    var spriteBounds = Phaser.Geom.Rectangle.Inflate(Phaser.Geom.Rectangle.Clone(worldBounds), -sides, -sides);
    this.impact.world.setBounds(0, 0, worldBounds.width, worldBounds.height, wallThickness);

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX
      gameObject.y = dragY
    })
    const button = this.add.rectangle(100, 100, 50, 50, 0xff0000);

    for(let i = 0; i < 5; i++){
      const newPerson = new Person();
      newPerson.setRandomPosition();
      const symbol = this.impact.add.sprite(newPerson.x, newPerson.y, "face");
      newPerson.setSymbol(symbol, this);

      this.input.setDraggable(symbol);
      this.allPeople.push(newPerson);
    }

    button.setInteractive()
      .on('pointerdown', ()=>{
        const newPerson = new Person();
        newPerson.setRandomPosition();
        newPerson.setSymbol(this.impact.add.sprite(newPerson.x, newPerson.y, "face"), this);
        this.allPeople.push(newPerson);
      });
  },

  update:  function(time, delta)
  {
    this.allPeople.forEach(val=>{
      val.updateHappiness(this.allPeople)
    })
  },

  enterButtonHoverState() {
    this.clickButton.setAlpha(0.5);
  },

  enterButtonRestState() {
    this.clickButton.setAlpha(1);
  },
});
