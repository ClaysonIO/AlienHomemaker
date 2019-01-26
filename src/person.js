import faker from 'faker';
import 'phaser';
import {game} from "./index";

export class Person{
  constructor(){

    this.gender = faker.random.number(1); // 0 is male, 1 is female
    this.name = faker.name.findName(null, null, this.gender);
    this.r = Math.floor(Math.random() * 256);
    this.g = Math.floor(Math.random() * 256);
    this.b = Math.floor(Math.random() * 256);
    this.a = .5;

    this.color = new Phaser.Display.Color(this.r, this.g, this.b, Math.floor(this.a * 256));

    this.priority = faker.random.arrayElement(['r', 'g', 'b']);

    this.x = null; //Current position in the farm
    this.y = null;

    this.velocity = null; //The current movement velocity of this individual

    this.symbol;
  }

  setSymbol(ref, scene){
    this.symbol = ref;
    this.symbol.setInteractive();
    this.symbol.alpha = this.a;

    this.symbol.on('pointerover', ()=>{
      console.log("Set Alpha")
      this.symbol.alpha = 1;
    })

    this.symbol.on('pointerout', ()=>{
      console.log("Set Alpha")
      this.symbol.alpha = this.a;
    })

    scene.input.setDraggable(this.symbol);
  }

  setRandomPosition(){
    this.x = Math.floor(Math.random() * game.config.width);
    this.y = Math.floor(Math.random() * game.config.height);
    console.log(this.x, this.y);

  }

  updateHappiness(){

  }

  calculateHappiness(otherPerson){
    const mentalDistance = Math.abs(this[this.priority] - otherPerson[this.priority]);

    const physicalDistance = Math.sqrt((this.x - otherPerson.x)^2 + (this.y - otherPerson.y)^2);


  }

  calculateVelocity(allOtherPeople){

  }

  movePerson(){

  }
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}