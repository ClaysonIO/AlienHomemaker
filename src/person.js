import faker from 'faker';
import 'phaser';
import {backgroundColor, biggerFont} from "./index";

export class Person {
  constructor(pid) {
    this.gender = faker.random.number(1); // 0 is male, 1 is female

    this.firstName = faker.name.firstName(this.gender);
    this.lastName = faker.name.lastName(this.gender);
    this.name = faker.name.findName(this.firstName, this.lastName, this.gender);
    this.userName = faker.internet.userName(this.firstName, this.lastName);
    this.email = faker.internet.email(this.firstname, this.lastName);
    this.id = pid;

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
    this.x = Math.floor(600 * Math.random()) + 100;
    this.y = Math.floor(400 * Math.random()) + 100;

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

  createSymbol(scene){
    const ref = new personIcon(scene, this.r, this.g, this.b, this.a, this.x, this.y);

    this.symbol = ref;
    // this.symbol.alpha = this.a;
    // this.symbol.setOrigin(.5, .5)
    // this.symbol.setActiveCollision().setAvsB().setBounce(5);

    // this.symbol.setInteractive()
    //   .on('pointerover', ()=>{
    //     this.symbol.alpha = 1;
    //   })
    //   .on('pointerout', ()=>{
    //     this.symbol.alpha = this.a;
    //   })

    // scene.input.setDraggable(this.symbol);
  }

  updateHappiness(allPeople, delta){
    const {netHappiness, netVelocity} = allPeople.reduce((acc, val)=>{
      const happiness = this.calculateHappinessImpact(val);
      acc.netHappiness -= happiness.absolute;
      acc.netVelocity = acc.netVelocity.add(happiness.vector);
      return acc;
    }, {netHappiness: 0, netVelocity: new Phaser.Math.Vector2({x: 0, y: 0})});

    this.setHappiness(netHappiness * (delta / 1000));
    this.symbol.body.setAcceleration(netVelocity.x, netVelocity.y);
    return this.a;
  }

  setHappiness(happiness){
    this.a += happiness;
    if(this.a > 1){
      this.a = 1;
    } else if(this.a < 0){
      this.a = 0;
    }

    this.symbol.setHappiness(this.a);
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
    const physicalDistance = Math.sqrt(Math.pow((this.symbol.body.body.pos.x - otherPerson.symbol.body.body.pos.x), 2) + Math.pow((this.symbol.body.body.pos.y - otherPerson.symbol.body.body.pos.y), 2));

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
    const yDiff = otherPerson.symbol.body.body.pos.y - this.symbol.body.body.pos.y;
    const xDiff = otherPerson.symbol.body.body.pos.x - this.symbol.body.body.pos.x;
    const hypDiff = Math.sqrt(Math.pow(yDiff, 2) + Math.pow(xDiff, 2));

    const newX = -1 * happiness * (xDiff / hypDiff);
    const newY = -1 * happiness * (yDiff / hypDiff);

    return {absolute: adjustedHappiness, vector: new Phaser.Math.Vector2({x: newX, y: newY})};
  }
}


class personIcon{
  constructor(sceneObject, r, g, b, a, x, y){
    this.container = sceneObject.add.container();
    this.sprite0 = sceneObject.add.sprite(0, 0, 'face');
    this.whiteBG = sceneObject.add.rectangle( 0, 30, 30, 30, 0xcccccc);
    this.red = sceneObject.add.rectangle( -10, 45, 10, 0, 0xff0000);
    this.green = sceneObject.add.rectangle( 0, 45, 10, 0, 0x00ff00);
    this.blue = sceneObject.add.rectangle( 10, 45, 10,  0, 0x0000ff);

    this.happinessBG = sceneObject.add.rectangle( 20, 15, 10, 60, 0x000000);
    this.happinessMeter = sceneObject.add.rectangle( 20, 45, 10, 0, 0xffff00);


    this.container.add([this.sprite0, this.whiteBG, this.red, this.green, this.blue, this.happinessBG, this.happinessMeter]);
    this.container.setSize(30, 30);

    this.blue.setSize(this.blue.width, -1 * 30 * (r / 255));
    this.green.setSize(this.green.width, -1 * 30 * (g / 255));
    this.red.setSize(this.red.width, -1 * 30 * (b / 255));
    this.happinessMeter.setSize(this.happinessMeter.width, -1 * 60 * a)  ;

    this.body = sceneObject.impact.add.body(x, y).setActiveCollision().setAvsB().setBounce(5);
    this.body.setGameObject(this.container);
    this.container.setInteractive();
  }

  setHappiness(a){
    this.happinessMeter.setSize(this.happinessMeter.width, -1 * 60 * a)  ;
  }
}