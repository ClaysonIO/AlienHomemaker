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

    //Alpha is the happiness of the person;
    this.a = .5;
    this.color = new Phaser.Display.Color(this.r, this.g, this.b, Math.floor(this.a * 256));
    this.textcolor = new Phaser.Display.Color(255 - this.r, 255 - this.g, 255 - this.b, 255);

    //This is the one attribute that affects this person's happiness, and who they move towards.
    this.priority = faker.random.arrayElement(['r', 'g', 'b']);

    //Current position in the farm
    this.x = Math.floor(width * Math.random());
    this.y = Math.floor(height * Math.random());

    //This is the
    this.symbol;
  }

  setSymbol(ref, scene){

    this.symbol = ref;
    this.scene = scene;
    this.symbol.alpha = this.a;
    this.symbol.setOrigin(.5, .5)
    this.symbol.setActiveCollision().setAvsB().setBounce(5);

    this.symbol.setInteractive()
      .on('pointerover', ()=>{
        this.symbol.alpha = 1;
      })
      .on('pointerout', ()=>{
        this.symbol.alpha = this.a;
      })

    scene.input.setDraggable(this.symbol);
  }

  setRandomPosition(){
    this.x = Math.floor(Math.random() * width);
    this.y = Math.floor(Math.random() * height);
    console.log(this.x, this.y);

  }

  updateHappiness(allPeople){
    let netHappiness = 0;
    let netVelocity = new Phaser.Math.Vector2({x: 0, y: 0});

    allPeople.forEach(val=>{
      const happiness = this.calculateHappinessImpact(val);
      netHappiness -= happiness;

      netVelocity = netVelocity.add(happiness.vector);
      return [val.name, happiness.absolute, happiness.vector.x, happiness.vector.y];
    });

    this.symbol.setAcceleration(netVelocity.x, netVelocity.y);
  }

  calculateHappinessImpact(otherPerson){
    let happiness = null;
    let mute = 1;

    //0 mental distance means very attracted to person. The higher the number, the more they repel
    //Max is 255.
    //neutralPoint is where it switches from attracting to repelling.
    const neutralPoint = 50;
    const mentalDistance = Math.abs(this[this.priority] - otherPerson[this.priority]);

    //Cutoff distance is where a person no longer has any effect on you.
    const cutoffDistance = 600;
    const physicalDistance = Math.sqrt(Math.pow((this.symbol.x - otherPerson.symbol.x), 2) + Math.pow((this.symbol.y - otherPerson.symbol.y), 2));

    //If beyond cutoff, no effect. Otherwise, it falls off in linear fashion.
    if(cutoffDistance <= physicalDistance){
      happiness = 0;
    } else if(physicalDistance === 0) {
      happiness = mentalDistance - neutralPoint;
    } else {
      happiness = (mentalDistance - neutralPoint) * (cutoffDistance - (physicalDistance / cutoffDistance)) / cutoffDistance
    }

    //Mute the happiness, so it's not insanely high.
    const adjustedHappiness =  happiness / mute;

    //Figure out the direction of the other element, then turn it into a vector based on the
    //adjustedHappiness this person provides.
    const yDiff = otherPerson.symbol.y - this.symbol.y;
    const xDiff = otherPerson.symbol.x - this.symbol.x;
    const hypDiff = Math.sqrt(Math.pow(yDiff, 2) + Math.pow(xDiff, 2));

    const newX = -1 * adjustedHappiness * (xDiff / hypDiff);
    const newY = -1 * adjustedHappiness * (yDiff / hypDiff);

    return {absolute: happiness / mute, vector: new Phaser.Math.Vector2({x: newX, y: newY})};
  }
}