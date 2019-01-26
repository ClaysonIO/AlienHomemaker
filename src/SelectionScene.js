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

    create: function ()
    {
        const text = this.add.text(30, 30, '', { font: '16px Courier', fill: '#00ff00' });

        const person1 = this.add.sprite(200, 300, 'p1').setInteractive();
        person1.setDataEnabled();
        person1.data.set("name", "Person 1");
        person1.on("pointerdown", function (event) {
            text.setText(this.data.get("name"));
        });
        const person2 = this.add.sprite(400, 300, 'p2').setInteractive();
        person2.setDataEnabled();
        person2.data.set("name", "Person 2");
        person2.on("pointerdown", function (event) {
            text.setText(this.data.get("name"));
        });
        const person3 = this.add.sprite(600, 300, 'p3')
            .setInteractive()
            .setDataEnabled();
        person3.data.set("name", "Person 3");
        person3.on("pointerdown", function () {
            text.setText(this.data.get("name"));
        });
    },

    update: function (time, delta)
    {
    }

});
