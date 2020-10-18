class ThemesManager {
    constructor() {
        this.lastSavedTheme = $('#theme-id');
        this.saveButton = $('#theme-save');
        this.loadInput = $('#theme-load');
        this.loadButton = $('#load-theme-button');

        this.loadButton.on('click', this.loadTheme.bind(this))
        this.saveButton.on('click', this.saveTheme.bind(this))
    }

    loadTheme() {
        var t = this.loadInput.val();
        $.ajax({
            async: false,
            type: 'POST',
            url: '/cyfrowy/theme.php',
            data: {
                action: 'load',
                value: t
            },
            success: function(data) {
                try {
                    var obj = JSON.parse(data)

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
    
                    $('#custom-css-textarea').val(obj.customCSS).trigger("input");
                } catch (error) {
                    alert("Nie można wczytać motywu");
                }
            }
       });
    }

    saveTheme() {
        var that = this;
        var t;
        t = JSON.stringify({
            mainColor: $('#color-text').val(),
            bgColor: $('#color-bg').val(),
            stColor: $('#color-st').val(),
            ndColor: $('#color-nd').val(),
            rdColor: $('#color-rd').val(),
            textColor: $('#color-text-nd').val(),

            breakMainColor: $('#text-change').val(),
            breakBgColor: $('#bg-change').val(),
            breakStColor: $('#st-change').val(),
            breakNdColor: $('#nd-change').val(),
            breakRdColor: $('#rd-change').val(),
            breakTextColor: $('#text-nd-change').val(),
            
            showProgressBar: $('#show-progress-bar').val(),
            changeColorsOnBreak: $('#apply-changes-on-brakes').val(),

            clockFontSize: $('#font-size').val(),
            clockFont: $('#font-family').val(),
            clockOffsetY: $('#clock-offset').val(),

            customCSS: $('#custom-css-textarea').val()
        });

        $.ajax({
            async: false,
            type: 'POST',
            url: '/cyfrowy/theme.php',
            data: {
                action: 'save',
                value: t
            },
            success: function(data) {
                if (data.length == 5) {
                    that.lastSavedTheme.val(data);
                } else {
                    alert(data);
                }
            }
       });
    }
}