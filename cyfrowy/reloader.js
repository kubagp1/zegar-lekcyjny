class Reloader {
    constructor() {
        setInterval(this.tick.bind(this), 50000);
    }

    tick() {
        $.get(
            {
                url: "/refresh.txt?n="+Math.round(Math.random()*1000000), //prevent caching by using n param
                success: (c)=>{

                    if (!localStorage.getItem('refresh')) {
                        localStorage.setItem('refresh', c);
                    } else if (localStorage.getItem('refresh') != c) {
                        localStorage.setItem('refresh', c);
                        location.reload();
                    }
                }
            }
        )
    }
}