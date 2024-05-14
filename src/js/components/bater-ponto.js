import Events from "../utils/Events";

function updateTime() {
  var now = new Date();

  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  hours = ("0" + hours).slice(-2);
  minutes = ("0" + minutes).slice(-2);
  seconds = ("0" + seconds).slice(-2);

  var daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  var dayOfWeek = daysOfWeek[now.getDay()];
  var dayOfMonth = now.getDate();

  var clock = document.getElementById("clock");
  clock.innerHTML =
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    " - " +
    dayOfWeek +
    ", " +
    dayOfMonth;

  setTimeout(updateTime, 1000);
}

updateTime();
