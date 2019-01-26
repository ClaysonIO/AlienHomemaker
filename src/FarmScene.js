import * as R from "ramda";

const timeBetweenAbductionsMilliseconds = 3000;
const timeBetweenAbductionSeconds = timeBetweenAbductionsMilliseconds / 1000;

const mealInterval = 5;

export const FarmScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function FarmScene() {
            Phaser.Scene.call(this, {
                key: 'FarmScene',
            });
        },

    preload: function () {
    },

    create: function () {
        this.countdownText = this.add.text(30, 30, '', {font: '24px Courier', fill: '#00ff00'});

        this.waitForMeal();
        const timeToMeal = this.data.get("timeToMeal");
        this.mealText = this.add.text(30, 80, `Time to meal: ${timeToMeal}`, {font: '24px Courier', fill: '#00ff00'});

        this.isMealTime = timeToMeal === 0;

        this.timedEvent = this.time.delayedCall(timeBetweenAbductionsMilliseconds,
            () => {
                this.isMealTime ? this.scene.start("EndScene") : this.scene.start("SelectionScene");
            }, [], this);

        console.log(this.data.list);
    },

    update: function (time, delta) {
        const progress = timeBetweenAbductionSeconds - this.timedEvent.getProgress() * timeBetweenAbductionSeconds;
        this.countdownText.setText(`Next ${this.isMealTime ? "Meal" : "Abduction"}: ${progress.toPrecision(3)}`);
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

    getVictims() {
        const people = this.data.get("people");
        const victims = [];
        const numberOfVictims = 3;
        for (let i = 0; i < numberOfVictims; i++) {
            victims.push(people[Math.floor(Math.random() * people.length)]);
        }
        return victims;
    }
});
