import { Person } from "./person";
import {height, width, smallFont, textColor} from "./index";

let pid = 0;

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
            this.load.audio("abduct", "assets/audio/abduct.mp3");
            this.load.image('i' + pid, 'https://picsum.photos/141/141/?random');
            this.load.image('i' + (pid + 1), 'https://picsum.photos/141/141/?random');
            this.load.image('i' + (pid + 2), 'https://picsum.photos/141/141/?random');
        } else {
            this.load.audio("eat", "assets/audio/eat.mp3");
            this.load.audio("drink", "assets/audio/drink.mp3");
            this.load.image("eat", "assets/attack.png")
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
        // this.scene.resume("FarmScene")
        this.scene.get("FarmScene").startScene();
        this.people.clear(true, true);
        this.people = null;
        this.scene.stop('SelectionScene');
    },

    setProfile(person) {
        this.nameText.setText(person.name);
        this.userNameText.setText('@' + person.userName);
    },

    clearProfile() {
        this.nameText.setText('');
        this.userNameText.setText('');
    },

    create: function ()
    {
        if (this.isMeal) {
            const eatSound = this.sound.add("eat");
            eatSound.play();
            const drinkSound = this.sound.add("drink");
            this.time.delayedCall(1500, () => drinkSound.play(), [], this);
        } else {
            const abductSound = this.sound.add("abduct");
            abductSound.rate = 1.4;
            abductSound.play();
        }
        this.scene.bringToTop("SelectionScene");
        const personSize = 100;

        this.graphics = this.add.graphics();
        if (this.isMeal) {
            this.add.sprite(50, 200, "eat");
        }
        this.nameText = this.add.text(810, 510, '', { font: smallFont, fill: textColor });
        this.userNameText = this.add.text(810, 540, '', { font: smallFont, fill: textColor });
        this.circle1 = new Phaser.Geom.Circle(width / 2, height / 2, personSize * 2);

        this.people = this.add.group();
        const pplList = this.isMeal 
            ? this.scene.get("FarmScene").getVictims()
            : [ new Person(pid++), new Person(pid++), new Person(pid++) ];

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
