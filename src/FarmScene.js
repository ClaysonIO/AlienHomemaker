import * as R from "ramda";
import {height, width, bigFont, textColor} from "./index";
import {createTileBackground} from "./MapGenerate";

const timeBetweenAbductionsMilliseconds = 3000;
const timeBetweenAbductionSeconds = timeBetweenAbductionsMilliseconds / 1000;

const mealInterval = 5;

function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

export const FarmScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function FarmScene() {
      Phaser.Scene.call(this, {
        key: 'FarmScene'
      });
    },

  preload: function () {
    this.load.image("face", "assets/face.png");
    this.load.image("farm-tiles", "../assets/bitmap.png")
  },

  create: function () {
    createTileBackground(this);

    const sides = (64 * 2) + 96;
    const worldBounds = new Phaser.Geom.Rectangle(48, 48, 704, 504);
    const spriteBounds = Phaser.Geom.Rectangle.Inflate(Phaser.Geom.Rectangle.Clone(worldBounds), -sides, -sides);
    this.impact.world.setBounds(48, 48, worldBounds.width, worldBounds.height, 64);

    this.happiness = 1;
    this.countdownText = this.add.text(810, 30, '', {font: bigFont, fill: textColor, displayWidth: 200, style: {align: 'center'}});
    this.mealText = this.add.text(810, 80, '', {font: bigFont, fill: textColor, displayWidth: 200, style: {align: 'center'}});
    this.happinessText = this.add.text(810, 130, '', {font: bigFont, fill: textColor, displayWidth: 200, style: {align: 'center'}});
    this.populationText = this.add.text(810, 180, '', {font: bigFont, fill: textColor, displayWidth: 200, style: {align: 'center'}});


    this.startScene();
  },

  startScene: function(){
    R.values(this.getPeople())
      .forEach(p => {
        if(!p.symbol){
          this.renderPerson(p)
        }
      });

    this.waitForMeal();
    const timeToMeal = this.data.get("timeToMeal");
    this.mealText.setText(`Time to meal: ${timeToMeal}`);

    this.isMealTime = timeToMeal === 0;
    this.isPaused = false;

    this.timedEvent = this.time.delayedCall(timeBetweenAbductionsMilliseconds,
      () => {
        this.isPaused = true;
        this.scene.pause('FarmScene');
        this.scene.run("SelectionScene", { isMeal: this.isMealTime });
      }, [], this)
  },

  update: function (time, delta) {
    const progress = timeBetweenAbductionSeconds - this.timedEvent.getProgress() * timeBetweenAbductionSeconds;

    const everybody = R.values(this.getPeople());

    const totalHappiness = everybody.reduce((acc, p) => {
      acc += p.updateHappiness(everybody, delta);
      return acc;
    }, 0);
    this.happiness = everybody.length ? totalHappiness / everybody.length : 1;

    if (!this.isPaused){
      this.countdownText.setText(`Next ${this.isMealTime ? "Meal" : "Abduction"}: ${progress.toString().substr(0,4)}`);
      this.happinessText.setText(`Happiness: ${Math.floor(this.happiness * 100)}%`);
      this.populationText.setText(`Population: ${everybody.length}`);
      if (this.happiness < 0.15) {
        this.time.delayedCall(1500, () => this.scene.start("EndScene"), [], this)
      }
    }
  },

  clearData() {
    this.data.set("people", {});
    this.data.set("timeToMeal", mealInterval);
    this.data.set("happiness", 50);
  },

  waitForMeal() {
    this.data.set("timeToMeal", this.data.get("timeToMeal") - 1);
  },

  getPeople() {
    const result = this.data.get("people");
    return result ? result : {};
  },

  removePerson(name) {
    this.data.set("people", R.dissoc(name, this.getPeople()));
    this.data.set("timeToMeal", mealInterval);
  },

  addPerson(person) {
    this.data.set("people", R.assoc(person.name, person, this.getPeople()));
  },

  renderPerson(person) {
    const symbol = this.impact.add.sprite(person.x, person.y, "face");
    person.setSymbol(symbol, this);
  },

  getVictims() {
    const people = R.values(this.data.get("people"));
    const victims = [];
    const numberOfVictims = 3;
    const set = new Set();
    for (let i = 0; i < numberOfVictims; i++) {
      let id = getRandomIndex(people);
      let maxAttempts = 5;
      while (set.has(id) && maxAttempts > 0) {
        id = getRandomIndex(people);
        maxAttempts--;
      }
      set.add(id);
      victims.push(people[id]);
    }
    return victims;
  }
});
