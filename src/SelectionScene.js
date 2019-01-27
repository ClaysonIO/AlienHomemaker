import { Person } from "./person";
import { height, width, textColor, bigFont, smallFont } from "./index";

export const SelectionScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function SelectionScene ()
        {
            Phaser.Scene.call(this, {
                key: 'SelectionScene',
            });
        },

    init: function (data) {
        this.isMeal = data.isMeal;
    },

    preload: function ()
    {
    },

    sendToFarm: function(person) {
        const farm = this.scene.get("FarmScene");
        if (this.isMeal) {
            farm.removePerson(person.name);
        } else {
            person.setRandomPosition();
            farm.addPerson(person);
        }
        this.clearProfile();
        this.instructionsText.setText('');
        this.scene.resume("FarmScene")
        this.scene.get("FarmScene").startScene();
        this.scene.stop('SelectionScene');
    },

    drawPerson: function(person, size) 
    {
        const circle = this.add.graphics();
        circle.fillStyle(person.color.color);
        circle.fillCircle(0, 0, size);

        const txt = this.add.text(-16, -24, person.gender ? 'X' : 'Y', { font: '48px Courier', fill: '#000' });
        const c = this.add.container(0, 0, [circle, txt]);
        const hitArea = new Phaser.Geom.Circle(0, 0, size);
        c.setInteractive(hitArea, Phaser.Geom.Circle.Contains)
            .on("pointerdown", () => {
                this.sendToFarm(person);
            })
            .on("pointerover", () => {
                this.setProfile(person);
            })
            .on("pointerout", () => {
                this.clearProfile();
            });
        return c;
    },

    setProfile(person) {
        this.nameText.setText(person.name + ' (@' + person.userName + ')');
    },

    clearProfile() {
        this.nameText.setText('');
    },

    create: function ()
    {
        this.scene.bringToTop("SelectionScene");
        const personSize = 100;

        this.graphics = this.add.graphics();
        this.instructionsText = this.add.text(30, 30, `${this.isMeal ? "Eat" : "Abduct"} a human`, { font: bigFont, fill: textColor });
        this.nameText = this.add.text(30, 60, '', { font: smallFont, fill: textColor });
        this.circle1 = new Phaser.Geom.Circle(width / 2, height / 2, personSize * 2);

        this.people = this.add.group();
        const pplList = this.isMeal 
            ? this.scene.get("FarmScene").getVictims()
            : [ new Person(), new Person(), new Person() ];
        pplList.forEach(p => this.people.add(this.drawPerson(p, personSize)));

        Phaser.Actions.PlaceOnCircle(this.people.getChildren(), this.circle1);
    },

    update: function (time, delta)
    {
        const rotationSpeed = 0.008;
        Phaser.Actions.RotateAroundDistance(this.people.getChildren(), this.circle1, rotationSpeed, this.circle1.radius);
    }
});
