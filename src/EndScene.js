export const EndScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function EndScene ()
        {
            Phaser.Scene.call(this, {
                key: 'endScene',
            });
        },

    preload: function ()
    {
        this.load.image("shooter", "assets/shooter.png");
        this.load.image("dead", "assets/dead.png");
    },

    create: function ()
    {
        this.add.sprite(300,400,"shooter");
        this.add.sprite(700,500,"dead");
        const text = this.add.text(250, 150, 'You have failed us!', { font: '50px Arial', fill: '#00ff00' });
        setTimeout(() => {
            this.scene.start("startScene");
        }, 3000);
    },
});
