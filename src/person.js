import faker from 'faker';
import 'phaser';
import {width, height, backgroundColor, biggerFont, pid} from "./index";

export class Person {
  constructor() {
    this.gender = faker.random.number(1); // 0 is male, 1 is female

    this.firstName = faker.name.firstName(this.gender);
    this.lastName = faker.name.lastName(this.gender);
    this.name = faker.name.findName(this.firstName, this.lastName, this.gender);
    this.userName = faker.internet.userName(this.firstName, this.lastName);
    this.email = faker.internet.email(this.firstname, this.lastName);
    this.id = pid++;

    const bgColor = this.hexToRgb(backgroundColor);
    const personColor = this.hexToRgb(faker.internet.color(bgColor.r, bgColor.g, bgColor.b));

    this.r = personColor.r;
    this.g = personColor.g;
    this.b = personColor.b;

    //Alpha is the happiness of the person;
    this.a = 1.0;

    this.color = new Phaser.Display.Color(this.r, this.g, this.b, Math.floor(this.a * 256));

    //This is the one attribute that affects this person's happiness, and who they move towards.
    this.priority = faker.random.arrayElement(['r', 'g', 'b']);

    //Current position in the farm
    this.x = Math.floor(704 * Math.random()) + 32;
    this.y = Math.floor(504 * Math.random()) + 32;

    //This is the
    this.symbol;
  }

  hexToRgb(hex){
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  setSymbol(ref, scene){
    this.symbol = ref;
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

  updateHappiness(allPeople, delta){
    const {netHappiness, netVelocity} = allPeople.reduce((acc, val)=>{
      const happiness = this.calculateHappinessImpact(val);
      acc.netHappiness -= happiness.absolute;
      acc.netVelocity = acc.netVelocity.add(happiness.vector);
      return acc;
    }, {netHappiness: 0, netVelocity: new Phaser.Math.Vector2({x: 0, y: 0})});

    this.setHappiness(netHappiness * (delta / 1000));
    this.symbol.setAcceleration(netVelocity.x, netVelocity.y);
    return this.a;
  }

  setHappiness(happiness){
    this.a += happiness;
    if(this.a > 1){
      this.a = 1;
    }
  }

  drawPerson(scene, size){
      const shadowCircle = scene.add.graphics();
      shadowCircle.fillStyle('#000');
      shadowCircle.fillCircle(0, 0, size + 2);

      const circle = scene.add.graphics();
      circle.fillStyle(this.color.color);
      circle.fillCircle(0, 0, size);

      const txt = scene.add.text(Math.floor(size * 0.355), Math.floor(size * 0.71), this.gender ? 'X' : 'Y', { font: biggerFont, fill: '#FFF' });
      const img = scene.add.image(0, 0, 'i' + this.id);
      const c = scene.add.container(0, 0, [shadowCircle, circle, txt, img]);

      const hitArea = new Phaser.Geom.Circle(0, 0, size);
      c.setInteractive(hitArea, Phaser.Geom.Circle.Contains);
      return c;
  }

  calculateHappinessImpact(otherPerson){
    let happiness = null;
    let mute = 100;

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

    const newX = -1 * happiness * (xDiff / hypDiff);
    const newY = -1 * happiness * (yDiff / hypDiff);

    return {absolute: adjustedHappiness, vector: new Phaser.Math.Vector2({x: newX, y: newY})};
  }
}