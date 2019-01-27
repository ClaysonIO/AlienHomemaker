import { width, height } from "./index";

export const StartScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function StartScene ()
        {
            Phaser.Scene.call(this, {
                key: 'StartScene',
                active: true,
            });
        },

    preload: function ()
    {
        this.load.image("button", "assets/start.png");
        this.load.image("ship", "assets/spaceship.png");
    },

    create: function ()
    {
        const spaceship = this.add.sprite(width / 2, height / 3, "ship");
        this.clickButton = this.add.sprite(width / 2, height / 1.8,"button")
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("FarmScene");
                this.scene.get("FarmScene").clearData();
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
