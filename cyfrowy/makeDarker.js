function makeDarker (a) { // a = "#rrggbb"
    a=a.slice(1); //get reck #
    var b = a.slice(4) //get rect rrgg..
    var g = a.substring(2,4) //get rect rr..bb
    var r = a.substring(0,2) //get rect ..ggbb
    r = Math.round(parseInt(r,16)/2).toString(16).length === 1 ? "0"+Math.round(parseInt(r,16)/2).toString(16) : Math.round(parseInt(r,16)/2).toString(16);
    g = Math.round(parseInt(g,16)/2).toString(16).length === 1 ? "0"+Math.round(parseInt(g,16)/2).toString(16) : Math.round(parseInt(g,16)/2).toString(16);
    b = Math.round(parseInt(b,16)/2).toString(16).length === 1 ? "0"+Math.round(parseInt(b,16)/2).toString(16) : Math.round(parseInt(b,16)/2).toString(16);
    return `#${r+g+b}`
}