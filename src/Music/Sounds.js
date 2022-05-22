/**
 * @class
 */
const Sounds = function (fileName, onEndCallback) {
    if (fileName !== undefined) {
        /**
         * @type {Audio}
         */
        this.file = new Audio(require(`../assets/sfx/${fileName}`));

        this.file.addEventListener("ended", onEndCallback);
    }
};

/**
 * @class
 */
export const MediaPlayer = function (onEndCallback) {
    /**
     * @type {Sounds}
     */
    this.roll = new Sounds("roll.mp3");
    this.fail1 = new Sounds("fail1.mp3", onEndCallback);
    this.fail2 = new Sounds("fail2.mp3", onEndCallback);

    this.playSound = (effect) => {
        if (this[effect] !== undefined) {
            this[effect].file.currentTime = 0;
            this[effect].file.muted = this.mute;
            this[effect].file.play();
        } else {
            console.warn(`This sound doesn't exists`);
        }
    };
};
