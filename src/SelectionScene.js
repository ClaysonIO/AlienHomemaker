import { Person } from "./person";
import { height, width, textColor, bigFont, smallFont, pid } from "./index";

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
        if (!this.isMeal) {
            this.load.image('i' + pid, 'https://picsum.photos/141/141/?random');
            this.load.image('i' + (pid + 1), 'https://picsum.photos/141/141/?random');
            this.load.image('i' + (pid + 2), 'https://picsum.photos/141/141/?random');
        }
    },

    sendToFarm: function(person) {
        const farm = this.scene.get("FarmScene");
        if (this.isMeal) {
            farm.removePerson(person.name);
        } else {
            farm.addPerson(person);
        }
        this.clearProfile();
        this.instructionsText.setText('');
        this.scene.resume("FarmScene")
        this.scene.get("FarmScene").startScene();
        this.scene.stop('SelectionScene');
    },

    setProfile(person) {
        this.nameText.setText(person.name + ' (@' + person.userName + ')');
    },

    clearProfile() {
        this.nameText.setText('');
    },

    create: function ()
    {
        console.log('create');
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

        pplList.forEach(person => {
            const c = person.drawPerson(this, personSize);
            c.on("pointerdown", () => {
              this.sendToFarm(person);
            })
            .on("pointerover", () => {
                this.setProfile(person);
            })
            .on("pointerout", () => {
                this.clearProfile();
            });
            this.people.add(c);
        });
        Phaser.Actions.PlaceOnCircle(this.people.getChildren(), this.circle1);
    },

    update: function (time, delta)
    {
        if (this.people) {
            const rotationSpeed = 0.008;
            Phaser.Actions.RotateAroundDistance(this.people.getChildren(), this.circle1, rotationSpeed, this.circle1.radius);
        }
    }
});
