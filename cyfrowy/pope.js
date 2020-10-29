class PopeEesterEgg {
    constructor() {
        this.pope = $('.pope');
        this.play = this.play;
        this.init();
    }

    init() {
        var now = new Date(), //Generating amount of seconds from midnight
            then = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(), 0, 0, 0),
            currentSeconds = (((now.getTime() - then.getTime()) / 1000)) % 86400;
        
        var popeStamp = 77820;

        if (currentSeconds < popeStamp) {
            this.timeout = setTimeout(this.play.bind(this), (popeStamp-currentSeconds)*1000);
        } else {
            this.timeout = setTimeout(this.play.bind(this), (popeStamp+(86400-currentSeconds))*1000);
        }
    }

    play() {
        if (this.pope.hasClass('pope-anim')) {
            var elm = this.pope[0],
            newone = elm.cloneNode(true);
            elm.parentNode.replaceChild(newone, elm);
        } else {
            this.pope.addClass('pope-anim');
        }

        this.init();
    }
}