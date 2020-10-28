(function() {
    this.progressFilled = document.querySelector('.progress-filled');
    this.info = document.querySelector('.progress-info');

    this.lessonsStarts = [25800, 28800, 32100, 35400, 39300,
        42600, 45900, 49200, 52200, 55200, 58200, 61200, 64200];
    
    this.lessonsEnds = [28500, 31500, 34800, 38100, 42000,
            45300, 48600, 51900, 54900, 57900, 60900, 63900, 66900];

    this.minutesGramar = (n)=>{
        var m=n%10;
        
        if(n<20 && n > 10) {
            return "minut";
        }

        if (m==0) {
            return "minut";
        } else if (m==n && m==1) {
            return "minuta";
        } else if (m==1) {
            return "minut";
        } else if (m<5) {
            return "minuty";
        } else {
            return "minut";
        }
    };

    function tick() {
        var now = new Date(), //Generating amount of seconds from midnight
            then = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(), 0, 0, 0),
            currentSeconds = (now.getTime() - then.getTime()) / 1000;
        
        var onLesson = null;

        //Check if we are on lesson
        for (var i = 0; i < this.lessonsEnds.length; i++) {
            if (this.lessonsStarts[i] > currentSeconds && currentSeconds > this.lessonsEnds[i - 1]) {
                onLesson = false;
                break;
            } else if (this.lessonsEnds[i] > currentSeconds && currentSeconds > this.lessonsStarts[i]) {
                onLesson = true;
                break;
            }
        }

        if (onLesson == null) { //In case school is over
            if (currentSeconds > 0 && currentSeconds > this.lessonsEnds[this.lessonsEnds.length - 1]) {
                // after school, before midnight
                var secondsFromEndOfLastLesson = currentSeconds - this.lessonsEnds[this.lessonsEnds.length - 1] //time passed from last lesson end to current time
                var secondsFromLastLessonToFirstLesson = (86400 - this.lessonsEnds[this.lessonsEnds.length - 1]) + this.lessonsStarts[0]; //read below its exactly the same
                var procentage = secondsFromEndOfLastLesson / secondsFromLastLessonToFirstLesson * 100 + "%"; //fuck my life
            } else {
                //after midnight
                var secondsFromEndOfLastLesson = currentSeconds + (86400 - this.lessonsEnds[this.lessonsEnds.length - 1]); //time passed after midnight+time from last lesson to midnight
                var secondsFromLastLessonToFirstLesson = (86400 - this.lessonsEnds[this.lessonsEnds.length - 1]) + this.lessonsStarts[0]; //time passed from last lesson to midnight+time passed from midnight to first lesson (independent from current time. const)
                var procentage = secondsFromEndOfLastLesson / secondsFromLastLessonToFirstLesson * 100 + "%"; //just divide
            }
            this.progressFilled.style.width = procentage;

            if(Math.ceil((secondsFromLastLessonToFirstLesson - secondsFromEndOfLastLesson) / 60) > 60) {
                var hours = Math.floor((secondsFromLastLessonToFirstLesson - secondsFromEndOfLastLesson)/3600);
                var minutes = Math.ceil(((secondsFromLastLessonToFirstLesson - secondsFromEndOfLastLesson)/60)-(hours*60));
                this.info.innerHTML = `Czas do rozpoczęcia zajęć: ${hours} godzin${(hours==1?"a":"")} i ${minutes} ${this.minutesGramar(minutes)}`;
            } else {
                var minutes = Math.ceil((secondsFromLastLessonToFirstLesson - secondsFromEndOfLastLesson) / 60)
                this.info.innerHTML = `Zajęcia zaczną się za ${minutes} ${this.minutesGramar(minutes)}`;
            }
        } else {
            //If on lesson get lesson finish procentage
            var procentage, minutesLeft;
            if (onLesson) {
                var currentLessonStart, currentLessonEnd

                for (var i = 0; i < this.lessonsStarts.length; i++) {
                    if (currentSeconds > this.lessonsStarts[i]) {
                        currentLessonStart = this.lessonsStarts[i];
                        currentLessonEnd = this.lessonsEnds[i];
                    }
                }

                procentage = ((currentSeconds - currentLessonStart) / (currentLessonEnd-currentLessonStart)) * 100 + "%";
                minutesLeft = Math.ceil(((currentLessonEnd-currentLessonStart) - (currentSeconds - currentLessonStart)) / 60);
            } else { //Which break are we on?
                var nextLessonStart, lastLessonEnd;

                for (var i = 0; i < this.lessonsStarts.length; i++) {
                    if (currentSeconds < this.lessonsStarts[i + 1]) {
                        nextLessonStart = this.lessonsStarts[i + 1];
                        lastLessonEnd = this.lessonsEnds[i];
                        break;
                    }
                }
                procentage = ((currentSeconds - lastLessonEnd) / (nextLessonStart - lastLessonEnd)) * 100 + "%";
                minutesLeft = Math.ceil(((nextLessonStart - lastLessonEnd) - (currentSeconds - lastLessonEnd)) / 60);
            }
            this.progressFilled.style.width = procentage;
            this.info.innerHTML = `Koniec ${onLesson ? "lekcji" : "przerwy"} za ${minutesLeft} ${this.minutesGramar(minutesLeft)}`;
        }
    }

    tick();
    setInterval(tick.bind(this), 1000);
})();