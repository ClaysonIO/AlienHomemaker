import { Person } from "./person";

export const SelectionScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function SelectionScene ()
        {
            Phaser.Scene.call(this, {
                key: 'selectionScene',
            });
        },

    preload: function ()
    {
        this.load.image('p1', 'assets/bikkuriman.png');
        this.load.image('p2', 'assets/bikkuriman.png');
        this.load.image('p3', 'assets/bikkuriman.png');
    },

    sendToFarm: function(person) {
        const farm = this.scene.get('FarmScene');
        farm.addPerson(person);
    },

    drawPerson: function(person, i, size) 
    {
        const config = this.game.config;

        let cellwidth = config.width / 3;
        let cellcenter = cellwidth / 2;
        let y = config.height / 2;

        const circle = this.add.graphics();
        circle.fillStyle(person.color.color);
        circle.fillCircle(0, 0, size);

        const txt = this.add.text(-16, -24, person.gender ? 'X' : 'Y', { font: '48px Courier', fill: person.textcolor.color });
        const c = this.add.container((i * cellwidth) + cellcenter, y);
        c.add([circle, txt]);
        const hitArea = new Phaser.Geom.Circle(0, 0, size);
        c.setInteractive(hitArea, Phaser.Geom.Circle.Contains);
        
        c.on("pointerdown", () => {
            this.sendToFarm(person);
        });
        c.on("pointerover", () => {
            console.log('pointerover');
            this.nameText.setText(person.name);
            this.emailText.setText(person.email);
            this.userNameText.setText('@' + person.userName);
        });
        c.on("pointerout", () => {
            console.log('pointerout');
            this.nameText.setText('');
            this.emailText.setText('');
            this.userNameText.setText('');
        });

        return c;
    },

    create: function ()
    {
        const personsize = 100;

        this.graphics = this.add.graphics();
        this.instructionsText = this.add.text(30, 30, 'Abduct your first human', { font: '24px Courier', fill: '#00ff00' });
        this.nameText = this.add.text(30, 60, '', { font: '16px Courier', fill: '#00ff00' });
        this.emailText = this.add.text(30, 80, '', { font: '16px Courier', fill: '#00ff00' });
        this.userNameText = this.add.text(30, 100, '', { font: '16px Courier', fill: '#00ff00' });

        let i = 100;
        const people = [
            new Person(),
            new Person(),
            new Person(),
        ];
        people.forEach((p, i) => this.drawPerson(p, i, personsize));
    },

    update: function (time, delta)
    {
    }

});
