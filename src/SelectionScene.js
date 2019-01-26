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

    drawPerson: function(person, idx) 
    {
        const size = 50;
        let x = (idx * 100) + (size * 2);
        let y = 300;
        // screen middle
        const circle = new Phaser.Geom.Circle(x, y, size);
        this.graphics.fillStyle(person1.color, 1);
        this.graphics.fillCircleShape(circle);
        this.add.text(x, y, person.gender ? 'X' : 'Y', { font: '96px Courier', fill: 0xFFFFFF - person.color });
    },

    create: function ()
    {
        this.graphics = this.add.graphics();
        const nametext = this.add.text(30, 30, '', { font: '16px Courier', fill: '#00ff00' });

        let i = 100;
        const people = [
            new Person(),
            new Person(),
            new Person(),
        ];
        people.forEach((p, i) => drawPerson(p, i));
    },

    update: function (time, delta)
    {
    }

});
