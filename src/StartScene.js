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
        this.clickButton = this.add.sprite(450,450,"button")
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("selectionScene");
            }, this)
            .on('pointerover', () => this.enterButtonHoverState() )
            .on('pointerout', () => this.enterButtonRestState() );
    },

    enterButtonHoverState() {
        this.clickButton.setAlpha(0.5);
    },

    enterButtonRestState() {
        this.clickButton.setAlpha(1);
    },
});
