export const EatScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function EatScene ()
        {
            Phaser.Scene.call(this, {
                key: 'eatScene',
            });
        },

    preload: function ()
    {
    },

    create: function ()
    {
        const farmScene = this.scene.get("farmScene");
        const person1 = this.add.sprite(200, 300, 'p1')
            .setInteractive()
            .setDataEnabled()
            .on("pointerdown", () => {
                farmScene.removePerson(this.data.get("name"));
                this.scene.switch("farmScene");
            });
    },

    update: function (time, delta)
    {
    },
});
