class ColorChanger {
    update() {
        this.applyChanges = $('#apply-changes-on-brakes').val() == "show" ? 1 : 0;
        this.clockColor = $('#text-change').val();
        this.bgColor = $('#bg-change').val();
        this.stColor = $('#st-change').val();
        this.ndColor = $('#nd-change').val();
        this.rdColor = $('#rd-change').val();
        this.textNdColor = $('#text-nd-change').val();

        document.documentElement.style.setProperty('--changed-text-color', `var(${this.convertName(this.clockColor)})`);
        document.documentElement.style.setProperty('--changed-bg-color', `var(${this.convertName(this.bgColor)})`);
            document.documentElement.style.setProperty('--changed-st-color', `var(${this.convertName(this.stColor)})`);
            document.documentElement.style.setProperty('--changed-nd-color', `var(${this.convertName(this.ndColor)})`);
            document.documentElement.style.setProperty('--changed-rd-color', `var(${this.convertName(this.rdColor)})`);
            document.documentElement.style.setProperty('--changed-text-nd-color', `var(${this.convertName(this.textNdColor)})`);
        
    }

    constructor() {
        this.update();
        $('#apply-changes-on-brakes, #text-change, #bg-change, #st-change, #nd-change, #rd-change, #text-nd-change')
            .on('change', this.update.bind(this))
    }

    tick(onBreak) {
        if (onBreak && this.applyChanges) {
            document.documentElement.style.setProperty('--used-main-color', `var(${this.convertName(this.clockColor)})`);
            document.documentElement.style.setProperty('--used-bg-color', `var(${this.convertName(this.bgColor)})`);
            document.documentElement.style.setProperty('--used-st-color', `var(${this.convertName(this.stColor)})`);
            document.documentElement.style.setProperty('--used-nd-color', `var(${this.convertName(this.ndColor)})`);
            document.documentElement.style.setProperty('--used-rd-color', `var(${this.convertName(this.rdColor)})`);
            document.documentElement.style.setProperty('--used-text-color', `var(${this.convertName(this.textNdColor)})`);
            document.documentElement.style.setProperty('--used-text-muted-color', 
                globalThis.makeDarker(getComputedStyle(document.documentElement)
                    .getPropertyValue('--used-text-color')));
        } else {
            document.documentElement.style.setProperty('--used-main-color', 'var(--main-color)');
            document.documentElement.style.setProperty('--used-bg-color', 'var(--bg-color)');
            document.documentElement.style.setProperty('--used-st-color', 'var(--st-color)');
            document.documentElement.style.setProperty('--used-nd-color', 'var(--nd-color)');
            document.documentElement.style.setProperty('--used-rd-color', 'var(--rd-color)');
            document.documentElement.style.setProperty('--used-text-color', 'var(--text-color)');
            document.documentElement.style.setProperty('--used-text-muted-color', 
                globalThis.makeDarker(getComputedStyle(document.documentElement)
                    .getPropertyValue('--text-color')));
        }

    }

    convertName(name) {
        switch (name) {
            case "text":
                return "--main-color";
                break;
            case "bg":
                return "--bg-color";
            case "st":
                    return "--st-color";
            case "nd":
                return "--nd-color";
            case "rd":
                return "--rd-color";
            case "text-nd":
                return "--text-color";
            default:
                break;
        }
    }
}