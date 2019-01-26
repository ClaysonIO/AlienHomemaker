import * as R from "ramda";

export const FarmScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function FarmScene ()
        {
            Phaser.Scene.call(this, {
                key: 'farmScene',
            });
        },

    preload: function ()
    {
    },

    create: function ()
    {
    },

    update: function (time, delta)
    {
    },

    clearData() {
        this.data.set("people", {});
        this.data.set("happiness", 50);
    },

    getPeople() {
        this.data.get("people");
    },

    removePerson(name) {
        this.data.set("people", R.dissoc(name, this.getPeople()));
    },

    addPerson(person) {
        this.data.set("people", R.assoc(person.name, this.getPeople()))
    },
});
