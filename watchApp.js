function getDataAndTime() {
    document.getElementById("stopWatch-wrapper")
        .style.display = "none";
    document.getElementById("timer-wrapper")
        .style.display = "none";


    let timeElement = document.querySelector("#wrapper #watch h2");
    let dateElement = document.querySelector("#wrapper #watch h4");
    let clock = setInterval(() => {
        timeElement.textContent = getTime();

        if (timeElement.textContent == "00 : 00 : 00") {
            dateElement.textContent = getDate();
        }
    }, 1000);

    timeElement.textContent = getTime();
    dateElement.textContent = getDate();

    
}

function getTime() {
    let date = new Date
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hour < 10 ? hour = `0${hour}` : hour;
    minutes < 10 ? minutes = `0${minutes}` : minutes;
    seconds < 10 ? seconds = `0${seconds}` : seconds;

    return `${hour} : ${minutes} : ${seconds}`
}

function getDate() {
    let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    day < 10 ? day = `0${day}` : day;
    month < 10 ? month = `${month}` : month;

    return `${day} : ${months[month]} : ${year}`
}



