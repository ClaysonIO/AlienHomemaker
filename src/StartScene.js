export const StartScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function StartScene ()
        {
            Phaser.Scene.call(this, {
                key: 'startScene',
                active: true,
            });
        },

    preload: function ()
    {
        this.load.image("button", "assets/start.png")
    },

    create: function ()
    {
        const button = this.add.sprite(450,450,"button")
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("selectionScene");
            }, this);
    },
});
