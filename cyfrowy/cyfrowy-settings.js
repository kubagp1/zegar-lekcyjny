class Settings {
    constructor(colorBginput, colorTextInput, colorStInput, colorNdInput, colorRdInput, colorTextNdInput, fontFamilyInput, fontSizeInput, fontOffsetYInput,
    lessonsStartsInput, lessonsEndsInput, lessonsButton, outsideBox, closeButton, settingsButton, clock, tabs, tabsContent,
    hideProgressBar, customCSSBox) {
        this.clock = clock;

        this.colorBgInput = colorBginput;
        this.colorTextInput = colorTextInput;
        this.colorStInput = colorStInput;
        this.colorNdInput = colorNdInput;
        this.colorRdInput = colorRdInput;
        this.colorTextNdInput = colorTextNdInput;

        this.fontFamilyInput = fontFamilyInput;
        this.fontSizeInput = fontSizeInput;
        this.fontOffsetYInput = fontOffsetYInput;

        this.lessonsStartsInput = lessonsStartsInput;
        this.lessonsEndsInput = lessonsEndsInput;
        this.lessonsButton = lessonsButton;

        this.outsideBox = outsideBox;
        this.closeButton = closeButton;
        this.settingsButton = settingsButton;

        this.tabs = tabs;
        this.tabsContent = tabsContent;

        this.hideProgressBar = hideProgressBar;

        this.customCSSBox = customCSSBox;

        //END OF VARIABLES

        //SET COLORS ON SETTINGS
        this.colorBgInput.val(getComputedStyle(document.documentElement).getPropertyValue('--bg-color').toLowerCase());
        this.colorTextInput.val(getComputedStyle(document.documentElement).getPropertyValue('--main-color').toLowerCase());
        this.colorStInput.val(getComputedStyle(document.documentElement).getPropertyValue('--st-color').toLowerCase());
        this.colorNdInput.val(getComputedStyle(document.documentElement).getPropertyValue('--nd-color').toLowerCase());
        this.colorRdInput.val(getComputedStyle(document.documentElement).getPropertyValue('--rd-color').toLowerCase());
        this.colorTextNdInput.val(getComputedStyle(document.documentElement).getPropertyValue('--text-color').toLowerCase());

        // COLOR CHANGE

        this.colorBgInput.on('input', (e)=>{ //background color
            document.documentElement.style.setProperty('--bg-color', e.target.value);
        });

        this.colorTextInput.on('input', (e)=>{ //text color
            document.documentElement.style.setProperty('--main-color', e.target.value);
        });

        this.colorStInput.on('input', (e)=>{ //first color
            document.documentElement.style.setProperty('--st-color', e.target.value);
        });

        this.colorNdInput.on('input', (e)=>{ //second color
            document.documentElement.style.setProperty('--nd-color', e.target.value);
        });

        this.colorRdInput.on('input', (e)=>{ //third color
            document.documentElement.style.setProperty('--rd-color', e.target.value);
        });
        this.colorTextNdInput.on('input', (e)=>{ //text second color (for feal text not clock)
            document.documentElement.style.setProperty('--text-color', e.target.value);
            document.documentElement.style.setProperty('--text-muted-color', globalThis.makeDarker(e.target.value));
        });

        //font change
        this.fontFamilyInput.on('input', (e)=>{ //font family
            this.clock.clock.css('font-family', `${e.target.value}, Helvetica, Arial, sans-serif`);
        });
        this.fontFamilyInput.on('focusin', (e)=>{
            this.outsideBox.css('opacity', '0.5');
        }).on('focusout', (e)=>{
            this.outsideBox.css('opacity', '1');
        });

        this.fontSizeInput.on('input', (e)=>{ //font size
            this.clock.clock.css('font-size', `calc(var(--clock-font-size)*${e.target.value/50})`);
        });
        this.fontSizeInput.on('focusin', (e)=>{
            this.outsideBox.css('opacity', '0.5');
        }).on('focusout', (e)=>{
            this.outsideBox.css('opacity', '1');
        });

        this.fontOffsetYInput.on('input', (e)=>{ //font offset Y
            this.clock.clock.css('--offset-y', `${e.target.value-50}%`);
        });
        this.fontOffsetYInput.on('focusin', (e)=>{
            this.outsideBox.css('opacity', '0.5');
        }).on('focusout', (e)=>{
            this.outsideBox.css('opacity', '1');
        });

        //lessonsStartsStops
        this.lessonsButton.on('click', ()=>{
            this.applyLessonsTimes(this.lessonsStartsInput, this.lessonsEndsInput)
        });

        //closing
        this.closeButton.on('click', ()=>{
            this.closeSettings();
        });

        this.outsideBox.on('click', (e)=>{
            if(e.target == e.currentTarget) {
                this.closeSettings();
            }
        });

        //opening
        this.settingsButton.on('click', ()=>{
            this.openSettings();
        });

        this.closeSettings = function() {
            this.outsideBox.removeClass('display-block');
        }

        //tabs behavior
        this.tabsContent.children().css('display', 'none');
        this.tabsContent.children().first().css('display', '');

        this.tabs.children().on('click', (e)=>{
            var a = $(e.target).attr('name');
            this.tabsContent.children().css('display', 'none').removeClass('active');
            $(`.${a}`).css('display', '')
            $(this.tabs).children().removeClass('active');
            $(e.target).addClass('active');
        });

        //hide progress bar
        this.hideProgressBar.on('input', (e)=>{
            if(e.target.value=="show")
                this.clock.progressBar.parent().parent().css('display', '');
            else {
                this.clock.progressBar.parent().parent().css('display', 'none');
            }
        });

        this.customCSSBox.on('input', (e)=>{
            $('#custom-css').html(e.target.value);
        })

        this.openSettings = this.openSettings;
    }

    openSettings() {
        this.outsideBox.addClass('display-block');
    }

    applyLessonsTimes(a,b) {
        try {
            var aVal = $(a).val();
            var bVal = $(b).val();

            if(!aVal)
                aVal = $(a).attr("placeholder");
            if(!bVal)
                bVal = $(b).attr("placeholder");

            var oa = this.convertToSecondsFromMidnight(aVal);
            var ob = this.convertToSecondsFromMidnight(bVal);

            if (typeof oa == "string") {
                throw "Bład podczas przeliczania godzin rozpoczęcia lekcji: "+oa
            }
            if (typeof ob == "string") {
                throw "Bład podczas przeliczania godzin rozpoczęcia przerw: "+oa
            }

            for (let i = 0; i < oa.length; i++) {
                if (oa[i]>=ob[i])
                    throw `Godzina ${i+1} (w kolejności od najmniejszej) w polu po lewo musi być mniejsza od godziny po prawo.`
            }

            if (oa.length!=ob.length)
                throw "Oba pola muszą zawierać taką samą ilość godzin (dzwonków).";

            this.clock.lessonsStarts = oa;
            this.clock.lessonsEnds = ob;
            alert('Zastosowano!')
            this.lessonsStartsStr = this.lessonsStartsInput.val();
            this.lessonsEndsStr = this.lessonsEndsInput.val();
        } catch (error) {
            alert(error);
        }
    }

    convertToSecondsFromMidnight(s) {
        s=`["${s}"]`;
        s = s.replace(/,/g, `", "`);

        var o = JSON.parse(s);

        o.forEach((element, i, a)=>{
            a[i]=element.replace(/\s/g, "");
        });

        for (let i = 0; i < o.length; i++) {
            let element = o[i];
            let t = element.replace(/[^0-9]/g);
            let y = element.replace(/[^0-9]/);
            if(t!=y)
                return `Błąd w godzinie ${i+1} ("${o[i]}"). Niepoprawna forma zapisu.`;
        }

        var r = new Array;
        for (let i = 0; i < o.length; i++) {
            const element = o[i];
            let j = element.search(/[^0-9]/);
            if (j==-1)
                return `Błąd w godzinie ${i+1} ("${o[i]}"). Godziny i minuty nie są poprawnie rozdzielone.`;
            let h = parseInt(element.substring(0,j),10);
            if (h>=24 || h<0)
                return `Błąd w godzinie ${i+1} ("${o[i]}"). Godzina nie może być ujemna lub >23.`;
            let m = parseInt(element.slice(j+1),10);
            if (m>=60 || m<0)
                return `Błąd w godzinie ${i+1} ("${o[i]}"). Minuty nie mogą być ujemne lub >59.`;
            let t = ((h*60)+m)*60;
            r.push(t);
        }
        r = r.sort();
        for (let i = 1; i < r.length; i++) {
            const element = r[i];
            if(element==r[i-1])
             return 'Usuń zduplikowane godziny';
        }
        return r.sort();
    }
}