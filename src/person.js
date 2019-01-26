import faker from 'faker';
import 'phaser';
import {width, height} from "./index";

export class Person {
  constructor() {
    this.gender = faker.random.number(1); // 0 is male, 1 is female
    this.firstName = faker.name.firstName(this.gender);
    this.lastName = faker.name.lastName(this.gender);
    this.name = faker.name.findName(this.firstName, this.lastName, this.gender);
    this.userName = faker.internet.userName(this.firstName, this.lastName);
    this.email = faker.internet.email(this.firstname, this.lastName);

    this.r = Math.floor(Math.random() * 256);
    this.g = Math.floor(Math.random() * 256);
    this.b = Math.floor(Math.random() * 256);
    this.a = .5;
    this.color = new Phaser.Display.Color(this.r, this.g, this.b, Math.floor(this.a * 256));
    this.textcolor = new Phaser.Display.Color(255 - this.r, 255 - this.g, 255 - this.b, 255);

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
    this.x = Math.floor(Math.random() * width);
    this.y = Math.floor(Math.random() * height);
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