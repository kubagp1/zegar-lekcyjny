//TODO: add after school exception

function declare() {
    window.lessonsStarts = [25800, 28800, 32100, 35400, 39300,
        42600, 45900, 49200, 52200, 55200, 58200, 61200, 64200];

    window.lessonsEnds = [28500, 31500, 34800, 38100, 42000,
        45300, 48600, 51900, 54900, 57900, 60900, 63900, 66900];

    window.progressBar = $('.progress-filled');
    window.clock = $(".clock");
    window.info = $('.info');
}

function init() {
    declare();
    tick();
    setInterval(tick, 1000);
}

function genTimeString() {
    dt = new Date();
    return `${dt.getHours() < 10 ? "0" + dt.getHours().toString() : dt.getHours()}:${dt.getMinutes() < 10 ? "0" + dt.getMinutes().toString() : dt.getMinutes()}`;
}

function tick () {
    var onLesson = null;
    var lessonsEnds = window.lessonsEnds;
    var lessonsStarts = window.lessonsStarts;
    

    //UPDATE CLOCK
    clock.text(genTimeString());

    //Get current time in seconds
    var now = new Date(),then = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0),currentSeconds = (now.getTime() - then.getTime())/1000;
    //Determine if we are on brake or not
    for (i=0;i<lessonsEnds.length;i++) {
        if (lessonsStarts[i] > currentSeconds && currentSeconds > lessonsEnds[i-1]) {
            onLesson = false;
            break;
        } else if (lessonsEnds[i] > currentSeconds && currentSeconds > lessonsStarts[i]) {
            onLesson = true;
            break;
        }
    }
    if(onLesson == null) { // STUFF TO DO WHEN THERE IS NO SCHOOL
        // checks if we are after or before school
        if (currentSeconds>0 && currentSeconds>window.lessonsEnds[window.lessonsEnds.length-1]) {
            // after school, before midnight
            var secondsFromEndOfLastLesson = currentSeconds-lessonsEnds[lessonsEnds.length-1]//time passed from last lesson end to current time
            var secondsFromLastLessonToFirstLesson = (86400-lessonsEnds[lessonsEnds.length-1])+lessonsStarts[0]; //read below its exacly the same
            var procentage = secondsFromEndOfLastLesson/secondsFromLastLessonToFirstLesson*100+"%"; //fuck my life
        } else {
            //after midnight
            var secondsFromEndOfLastLesson = currentSeconds+(86400-lessonsEnds[lessonsEnds.length-1]); //time passed after midnight+time from last lesson to midnight
            var secondsFromLastLessonToFirstLesson = (86400-lessonsEnds[lessonsEnds.length-1])+lessonsStarts[0]; //time passed from last lesson to midnight+time passed from midnight to first lesson (independent from current time. const)
            var procentage = secondsFromEndOfLastLesson/secondsFromLastLessonToFirstLesson*100+"%"; //just divide
        }
        window.progressBar.css("width", procentage);
        window.info.text("Do rozpoczęcia lekcji zostało: "+Math.ceil((secondsFromLastLessonToFirstLesson-secondsFromEndOfLastLesson)/60)+"min")
    } else { // SKIP DOING SHIT IF THERE IS NO SCHOOL
        //If on lesson get lesson finish procentage
        var procentage, minutesLeft;
        if(onLesson) {
            var currentLessonStart, currentLessonEnd

            for (i=0;i<lessonsStarts.length; i++) {
                if (currentSeconds>lessonsStarts[i]) {
                    currentLessonStart = lessonsStarts[i];
                    currentLessonEnd = lessonsEnds[i];
                }
            }

            procentage = ((currentSeconds-currentLessonStart)/2700)*100+"%";
            minutesLeft = Math.ceil((2700-(currentSeconds - currentLessonStart))/60);
        } else { //Which break are we on?
            var nextLessonStart, lastLessonEnd;

            for (i=0;i<lessonsStarts.length; i++) {
                if (currentSeconds<lessonsStarts[i+1]) {
                    nextLessonStart = lessonsStarts[i+1];
                    lastLessonEnd = lessonsEnds[i];
                    break;
                }
            }
            procentage = ((currentSeconds-lastLessonEnd)/(nextLessonStart-lastLessonEnd))*100+"%";
            minutesLeft = Math.ceil(((nextLessonStart-lastLessonEnd)-(currentSeconds-lastLessonEnd))/60);
        }
        window.progressBar.css("width", procentage);
        window.info.text("Do końca "+(onLesson?"lekcji":"przerwy")+" zostało "+minutesLeft+"min");
        window.clock.css("color", (onLesson ? "white" : "#E8CF43"))
    }
}

$(document).ready(init);