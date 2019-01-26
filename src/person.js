import faker from 'faker';
import 'phaser';
import {game} from "./index";

export class Person{
  constructor(){

    this.gender = faker.random.number(1); // 0 is male, 1 is female
    this.name = faker.name.findName(null, null, this.gender);

    //
    this.r = Math.floor(Math.random() * 256);
    this.g = Math.floor(Math.random() * 256);
    this.b = Math.floor(Math.random() * 256);
    //Alpha is the happiness of the person;
    this.a = .5;

    this.color = new Phaser.Display.Color(this.r, this.g, this.b, Math.floor(this.a * 256));

    //This is the one attribute that affects this person's happiness, and who they move towards.
    this.priority = faker.random.arrayElement(['r', 'g', 'b']);

    //Current position in the farm
    this.x = null;
    this.y = null;

    this.velocity = null; //The current movement velocity of this individual

    //This is the
    this.symbol;
    this.physicsBody;
  }

  setSymbol(ref, scene, physics){
    console.log("SCENE", scene);
    this.symbol = ref;
    this.symbol.alpha = this.a;
    this.physicsBody = new Phaser.Physics.Arcade.Body(physics, this.symbol);

    this.symbol.setInteractive()
      .on('pointerover', ()=>{
        this.symbol.alpha = 1;
      })
      .on('pointerout', ()=>{
        this.symbol.alpha = this.a;
      })
      .on('pointerdown', ()=>{
        let netHappiness = 0;
        let netVelocity = new Phaser.Math.Vector2({x: 0, y: 0});

        const happiness = scene.allPeople.map(val=>{
          const happiness = this.calculateHappinessImpact(val);
          netHappiness -= happiness;

          netVelocity = netVelocity.add(happiness.vector);
          return [val.name, happiness.absolute, happiness.vector.x, happiness.vector.y];
        });


        console.table(happiness);
        console.log(this.physicsBody);
        this.physicsBody.setVelocity(netVelocity);
        console.table([["SHOULD SET VELOCITY:", netVelocity.x, netVelocity.y]]);
      });

    scene.input.setDraggable(this.symbol);
  }

  setRandomPosition(){
    this.x = Math.floor(Math.random() * game.config.width);
    this.y = Math.floor(Math.random() * game.config.height);
    console.log(this.x, this.y);

  }

  updateHappiness(){

  }

  calculateHappinessImpact(otherPerson){
    let happiness = null;
    let mute = 10;

    //0 mental distance means very attracted to person. The higher the number, the more they repel
    //Max is 255.
    //neutralPoint is where it switches from attracting to repelling.
    const neutralPoint = 50;
    const mentalDistance = Math.abs(this[this.priority] - otherPerson[this.priority]);

    //Cutoff distance is where a person no longer has any effect on you.
    const cutoffDistance = 600;
    const physicalDistance = Math.sqrt(Math.pow((this.x - otherPerson.x), 2) + Math.pow((this.y - otherPerson.y), 2));

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
    const yDiff = otherPerson.y - this.y;
    const xDiff = otherPerson.x - this.x;
    const hypDiff = Math.sqrt(Math.pow(yDiff, 2) + Math.pow(xDiff, 2));

    const newX = adjustedHappiness * (xDiff / hypDiff);
    const newY = adjustedHappiness * (yDiff / hypDiff);

    return {absolute: happiness / mute, vector: new Phaser.Math.Vector2({x: newX, y: newY})};
  }

calculateVelocity(allOtherPeople){

}

movePerson(){

}
}