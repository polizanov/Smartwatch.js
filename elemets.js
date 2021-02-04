function stopWatch() {
    let stopWatchBtn = document.getElementById("stopwatch");
    let stopWatchWrapper = document.getElementById("stopWatch-wrapper");
    let buttons = [...document.querySelectorAll("#stopWatch-wrapper button")];
    let spanTimeElement = document.querySelector("#stopWatch-wrapper span");

    if (stopWatchWrapper.style.display == "none") {
        stopWatchWrapper.style.display = "block";
        stopWatchBtn.style.borderStyle = "inset";
    } else if (stopWatchWrapper.style.display == "block") {
        stopWatchWrapper.style.display = "none";
        stopWatchBtn.style.borderStyle = "outset";
    }

    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    buttons[0].addEventListener("click", () => {
        buttons[0].setAttribute("disabled", "true");
        buttons[3].setAttribute("disabled", "true")
        let intervalTime = setInterval(() => {
            seconds++;
            if (seconds == 60) {
                seconds = 0;
                minutes++;
            }

            if (minutes == 60) {
                minutes = 0;
                hours++
            }

            spanTimeElement.textContent = getEditedTimeString(seconds, minutes, hours);

            buttons[2].addEventListener("click", () => {
                clearInterval(intervalTime);
                buttons[0].removeAttribute("disabled");
                buttons[3].removeAttribute("disabled");
                htmltags = "";
            })
        }, 1000)


        buttons[1].addEventListener("click", () => {
            let stopWatchDivElement = document.querySelector("#stopWatch-wrapper article div");
            let htmlTags = `<span style="color:red">${getEditedTimeString(seconds, minutes, hours)}</span><br>`;
            stopWatchDivElement.innerHTML = htmlTags
        })

        buttons[3].addEventListener("click", () => {
            hours = 0;
            minutes = 0;
            seconds = 0;

            [...document.querySelectorAll("#stopWatch-wrapper article div span")]
                .forEach(el => {
                    el.remove();
                });

            [...document.querySelectorAll("#stopWatch-wrapper article div br")]
                .forEach(el => {
                    el.remove();
                });

            numLab = 0;
            spanTimeElement.textContent = "00:00:00";
        })


    })



}

function timer() {
    let inputDiv = document.getElementById("input");
    let countingDiv = document.getElementById("counting");

    let intervalTime;

    let timerBtn = document.getElementById("timer")
    let timerWrapper = document.getElementById("timer-wrapper");
    let startBtn = document.querySelector("#input button");
    let countingDivButtons = [...document.querySelectorAll("#counting button")];
    let spanTimeElement = document.querySelector("#counting span");

    if (timerWrapper.style.display == "none") {
        timerWrapper.style.display = "block";
        timerBtn.style.borderStyle = "inset";
    } else if (timerWrapper.style.display == "block") {
        timerWrapper.style.display = "none";
        timerBtn.style.borderStyle = "outset";
    }

    startBtn.addEventListener("click", () => {
        countingDivButtons[1].setAttribute("disabled", "true");
        let hoursElement = document.querySelector("input[placeholder='Hours']");
        let minutesElement = document.querySelector("input[placeholder='Minutes']");
        let secondsElement = document.querySelector("input[placeholder='Seconds']");

        let hours = validateInput(hoursElement);
        let minutes = validateInput(minutesElement);
        let seconds = validateInput(secondsElement);

        hoursElement.value = "";
        minutesElement.value = "";
        secondsElement.value = "";

        if (hours == undefined || minutes == undefined || seconds == undefined) {
            return;
        }

        if (hours == 0 & minutes == 0 & seconds == 0) {
            return;
        }

        if (minutes > 59 || seconds > 59) {
            return;
        }


        inputDiv.style.display = "none";
        countingDiv.style.display = "block"

        intervalTime = setInterval(() => {
            if (seconds == 0) {
                if (minutes !== 0 || hours !== 0) {
                    if (minutes == 0) {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                    } else {
                        minutes--;
                        seconds = 59;
                    }
                } else {
                    seconds = 0;
                }
            }



            if (hours == 0 && minutes == 0 && seconds == 1) {
                clearInterval(intervalTime);
                countingDivButtons[1].removeAttribute("disabled")
                spanTimeElement.textContent = "00:00:00";
            }
            seconds--;
            spanTimeElement.textContent = getEditedTimeString(seconds, minutes, hours);

            countingDivButtons[0]
                .addEventListener("click", () => {
                    clearInterval(intervalTime);
                    countingDivButtons[1].removeAttribute("disabled");
                })
        }, 1000)


    })

    countingDivButtons[1]
        .addEventListener("click", () => {
            spanTimeElement.textContent = "00:00:00";
            inputDiv.style.display = "block";
            countingDiv.style.display = "none";
            clearInterval(intervalTime);
        })


    function validateInput(element) {
        let result;
        if (element.value.length == 0) {
            result = 0;
            return result;
        } else if ((element.value < 0 || !Number(element.value)) && element.value.length > 0) {
            element.value = "";
            isValidInput = false;
            return;
        } else {
            isValidInput = true;
            result = element.value
            return result;

        }
    }

}


function getEditedTimeString(s, m, h) {
    h < 10 ? h = `0${h}` : h;
    m < 10 ? m = `0${m}` : m;
    s < 10 ? s = `0${s}` : s;

    return `${h}:${m}:${s}`;
}
