// Гамбургер меню
const hamburgerMenu = document.querySelector("#hamburgerMenu");
const hamburgerMenuOpenButton = document.querySelector("#hamburgerMenuOpenButton");
const hamburgerMenuCloseButton = document.querySelector("#hamburgerMenuCloseButton");

hamburgerMenuOpenButton.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
});

hamburgerMenuCloseButton.addEventListener("click", () => {
    hamburgerMenu.classList.remove("active");
});

// Таймер обратного отсчёта
// Дны
const countdownTimerDayFirst = document.querySelector("#countdownDaysFirst");
const countdownTimerDaySecond = document.querySelector("#countdownDaysSecond");
// Часы
const countdownHoursFirst = document.querySelector("#countdownHoursFirst");
const countdownHoursSecond = document.querySelector("#countdownHoursSecond");
// Минуты
const countdownMinutesFirst = document.querySelector("#countdownMinutesFirst");
const countdownMinutesSecond = document.querySelector("#countdownMinutesSecond");
// Секунды
const countdownSecondsFirst = document.querySelector("#countdownSecondsFirst");
const countdownSecondsSecond = document.querySelector("#countdownSecondsSecond");

// Функция для обновления таймера
const updateCountdown = () => {
    // Делаем расчёты
    const endDate = new Date("May 31 2025 10:30:00");
    const date = new Date();
    const diff = Math.floor((endDate.getTime() - date.getTime()) / 1000);

    if (diff <= 0) {
        clearInterval(countdown);
        alert("Конец конкурса!")
    };

    // Вычисляем даты
    let daysLeft = Math.floor(diff / 60 / 60 / 24);
    let hoursLeft = Math.floor(diff / 60 / 60) % 24;
    let minutesLeft = Math.floor(diff / 60) % 60;
    let secondsLeft = Math.floor(diff) % 60;

    // Функция для правильного отображения даты если оно меньше 10
    const setCountDisplay = (first, second, dateLeft) => {
        if (dateLeft >= 10) {
            first.innerText = dateLeft.toString().slice(0, 1) || "0";
            second.innerText = dateLeft.toString().slice(1) || "0";
        } else {
            second.innerText = dateLeft.toString().slice(0, 1) || "0";
            first.innerText = dateLeft.toString().slice(1) || "0";
        }
    }

    setCountDisplay(countdownTimerDayFirst, countdownTimerDaySecond, daysLeft);
    setCountDisplay(countdownHoursFirst, countdownHoursSecond, hoursLeft);
    setCountDisplay(countdownMinutesFirst, countdownMinutesSecond, minutesLeft);
    setCountDisplay(countdownSecondsFirst, countdownSecondsSecond, secondsLeft);
};

// Вызываем функцию что-би при загрузи страница не было нулей
updateCountdown();

// Ставим интервал на каждую секунду для функции
const countdown = setInterval(updateCountdown, 1000);