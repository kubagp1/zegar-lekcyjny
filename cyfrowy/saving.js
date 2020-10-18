class Saver{
    constructor(app) {
        this.load = this.load;
        this.save = this.save;
        this.reset = this.reset;

        $('#save-settings').on('click', this.save.bind(this, app))
        $('#load-settings').on('click', this.load.bind(this, app))
        $('#clean-settings').on('click', this.reset.bind(this))
    }

    load(app) {
        var str = localStorage.getItem('settings');
        if(!app) {
            app = globalThis.app;
        }
        if (!str) {
            this.save(app);
            return;
        } else {
            if(!app) {
                app = globalThis.app;
            }

            var obj = JSON.parse(str);

            $('#color-text').val(obj.mainColor).trigger("input");
            $('#color-bg').val(obj.bgColor).trigger("input");
            $('#color-st').val(obj.stColor).trigger("input");
            $('#color-nd').val(obj.ndColor).trigger("input");
            $('#color-rd').val(obj.rdColor).trigger("input"); 
            $('#color-text-nd').val(obj.textColor).trigger("input");

            $('#text-change').val(obj.breakMainColor).trigger("input");
            $('#bg-change').val(obj.breakBgColor).trigger("input");
            $('#st-change').val(obj.breakStColor).trigger("input");
            $('#nd-change').val(obj.breakNdColor).trigger("input");
            $('#rd-change').val(obj.breakRdColor).trigger("input");
            $('#text-nd-change').val(obj.breakTextColor).trigger("input");

            $('#show-progress-bar').val(obj.showProgressBar).trigger("input");
            $('#apply-changes-on-brakes').val(obj.changeColorsOnBreak).trigger("input");

            $('#font-size').val(obj.clockFontSize).trigger("input");
            $('#font-family').val(obj.clockFont).trigger("input");
            $('#clock-offset').val(obj.clockOffsetY).trigger("input");

            $('#lessonsStarts').val(obj.lessonsStartsStr);
            $('#lessonsEnds').val(obj.lessonsEndsStr);

            $('#custom-css-textarea').val(obj.customCSS).trigger("input");
            
            app.clock.lessonsStarts = obj.lessonsStarts;
            app.clock.lessonsEnds = obj.lessonsEnds;
        }
    }

    save(app) {
        if (!app) {
            app = globalThis.app;
        }

        var obj = {}

        obj.mainColor = $('#color-text').val();
        obj.bgColor = $('#color-bg').val();
        obj.stColor = $('#color-st').val();
        obj.ndColor = $('#color-nd').val();
        obj.rdColor = $('#color-rd').val();
        obj.textColor = $('#color-text-nd').val();

        obj.breakMainColor = $('#text-change').val();
        obj.breakBgColor = $('#bg-change').val();
        obj.breakStColor = $('#st-change').val();
        obj.breakNdColor = $('#nd-change').val();
        obj.breakRdColor = $('#rd-change').val();
        obj.breakTextColor = $('#text-nd-change').val();
        
        obj.showProgressBar = $('#show-progress-bar').val();
        obj.changeColorsOnBreak = $('#apply-changes-on-brakes').val();

        obj.clockFontSize = $('#font-size').val();
        obj.clockFont = $('#font-family').val();
        obj.clockOffsetY = $('#clock-offset').val();

        obj.lessonsStarts = app.clock.lessonsStarts;
        obj.lessonsEnds = app.clock.lessonsEnds;

        obj.lessonsStartsStr = app.settings.lessonsStartsStr;
        obj.lessonsEndsStr = app.settings.lessonsEndsStr;

        obj.customCSS = $('#custom-css-textarea').val();

        var json = JSON.stringify(obj);
        localStorage.setItem('settings', json);
    }

    reset() {
        localStorage.removeItem('settings');
        location.reload();
    }
}