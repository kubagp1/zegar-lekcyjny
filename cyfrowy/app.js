class App{
    constructor() {
        var lessonsStarts = [25800, 28800, 32100, 35400, 39300,
            42600, 45900, 49200, 52200, 55200, 58200, 61200, 64200];
        
        var lessonsEnds = [28500, 31500, 34800, 38100, 42000,
                45300, 48600, 51900, 54900, 57900, 60900, 63900, 66900];

        this.saver = new Saver(app);

        this.colorChanger = new ColorChanger();
    
        this.clock = new Clock(lessonsStarts, lessonsEnds, $('.progress-filled'), $(".clock"), $('.info'));

        this.settings = new Settings(
            $('#color-bg'),
            $('#color-text'),
            $('#color-st'),
            $('#color-nd'),
            $('#color-rd'),
            $('#color-text-nd'),
            $('#font-family'),
            $('#font-size'),
            $('#clock-offset'),
            $('#lessonsStarts'),
            $('#lessonsEnds'),
            $('#lessonsConfirm'),
            $('.settings'),
            $('#closeButton'),
            $('.settings-button'),
            this.clock,
            $(".tabs"),
            $('.tabs-content'),
            $('#show-progress-bar'),
            $('#custom-css-textarea'),
            $('#fullscreen'),
            $('#time-offset'),
            $('#apply-time-offset-to-clock')
        )

        this.saver.load(this);
        this.reloader = new Reloader();
        this.themes = new ThemesManager();
    }
}

var app;
$(document).ready( function() {
    app = new App();
});