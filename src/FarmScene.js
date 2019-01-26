import * as R from "ramda";

const timeBetweenAbductionsMilliseconds = 5000;
const timeBetweenAbductionSeconds = timeBetweenAbductionsMilliseconds / 1000;

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
        this.text = this.add.text(30, 30, 'Abduct your first human', { font: '24px Courier', fill: '#00ff00' });

        this.timedEvent = this.time.delayedCall(timeBetweenAbductionsMilliseconds,
            () => this.scene.start("SelectionScene"), [], this);

        console.log(this.getPeople());
    },

    update: function (time, delta) {
        const progress = timeBetweenAbductionSeconds - this.timedEvent.getProgress() * timeBetweenAbductionSeconds;
        this.text.setText("Next Abduction: " + progress.toPrecision(3));
    },

    clearData() {
        this.data.set("people", {});
        this.data.set("happiness", 50);
    },

    getPeople() {
        const result = this.data.get("people");
        return result ? result : {};
    },

    removePerson(name) {
        this.data.set("people", R.dissoc(name, this.getPeople()));
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
