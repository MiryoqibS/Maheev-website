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

// Слайдер
const initSlider = (slider, sliderWrapper, sliderSlides, perView) => {
    slider = document.getElementById(slider);
    sliderWrapper = document.getElementById(sliderWrapper);
    sliderSlides = document.querySelectorAll(`#${sliderSlides}`);
    // Дополнительные элементы слайдера 
    const sliderSwipeLeft = slider.querySelector("#swiperSwipeLeft");
    const sliderSwipeRight = slider.querySelector("#swiperSwipeRight");
    const sliderPagination = slider.querySelector("#swiperPagination");

    const sliderSwipeWidth = 50;
    const gap = 25;
    const slideWidth = 240;
    let sliderMaxWidth = 0;
    let sliderWrapperLeft = 0;

    // Задаём стили для доп. элементов слайдера
    [sliderSwipeLeft, sliderSwipeRight].forEach((button) => {
        button.style.display = "flex";
        button.style.justifyContent = "center";
        button.style.alignItems = "center";
        button.style.position = "absolute";
        button.style.top = "50%";
        button.style.width = `${sliderSwipeWidth}px`;
        button.style.height = `${sliderSwipeWidth}px`;
        button.style.borderRadius = "50%";
        button.style.backgroundColor = "#E25E5E";
    });

    sliderSwipeLeft.style.left = "0";
    sliderSwipeRight.style.right = "0";

    sliderPagination.style.position = "absolute";
    sliderPagination.style.top = "90%";
    sliderPagination.style.left = "50%";
    sliderPagination.style.transform = "translate(-50%,-50%)";

    // Иконки для кнопок слайдера
    const SVG_NS = "http://www.w3.org/2000/svg";
    const XLINK_NS = "http://www.w3.org/1999/xlink";

    // Создаём <svg>
    const arrowIconRight = document.createElementNS(SVG_NS, "svg");
    arrowIconRight.setAttribute("width", "24");
    arrowIconRight.setAttribute("height", "24");

    // Создаём <use>
    const use = document.createElementNS(SVG_NS, "use");
    use.setAttributeNS(XLINK_NS, "xlink:href", "/public/sprites.svg#icon-arrow-right");

    // Вставляем <use> внутрь <svg>
    arrowIconRight.appendChild(use);

    const arrowIconLeft = arrowIconRight.cloneNode(true);
    arrowIconLeft.style.transform = "rotate(180deg)";

    // Добавляем иконку в нужную кнопку
    sliderSwipeRight.appendChild(arrowIconRight);
    sliderSwipeLeft.appendChild(arrowIconLeft);

    // Ждём отрисовки элементов
    const totalPages = Math.ceil(sliderSlides.length / perView);
    let currentPage = 0;

    setTimeout(() => {
        // Пагинация
        function renderPagination() {
            sliderPagination.innerHTML = ""; // очищаем

            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement("span");
                dot.style.display = "inline-block";
                dot.style.width = "10px";
                dot.style.height = "10px";
                dot.style.margin = "0 5px";
                dot.style.borderRadius = "50%";
                dot.style.backgroundColor = i === currentPage ? "#E25E5E" : "#ccc";
                dot.style.cursor = "pointer";

                dot.addEventListener("click", () => {
                    currentPage = i;
                    sliderWrapperLeft = -((slideWidth + gap * 2) * perView * currentPage);
                    sliderWrapper.style.left = `${sliderWrapperLeft}px`;
                    renderPagination();
                    console.log("test");
                    
                });

                sliderPagination.appendChild(dot);
            };
        };

        renderPagination();

        const maxScroll = (sliderSlides.length - perView) * (slideWidth + gap * 2);

        // Прокрутка с помощью колёсика мыши
        sliderWrapper.addEventListener("wheel", (event) => {
            event.preventDefault();

            // Влево
            if (event.deltaY > 0 && sliderWrapperLeft < 0) {
                sliderWrapperLeft += slideWidth + gap * 2;
                sliderWrapper.style.left = `${sliderWrapperLeft}px`
            }

            // Вправо
            if (event.deltaY < 0 && Math.abs(sliderWrapperLeft) < maxScroll) {
                sliderWrapperLeft -= slideWidth + gap * 2;
                sliderWrapper.style.left = `${sliderWrapperLeft}px`
            }
        }, { passive: false });

        // Прокрутка слайдера с помощью кнопок
        sliderSwipeLeft.addEventListener("click", () => {
            if (sliderWrapperLeft < 0) {
                sliderWrapperLeft += slideWidth + gap * 2;
                sliderWrapper.style.left = `${sliderWrapperLeft}px`
            }
        });

        sliderSwipeRight.addEventListener("click", () => {
            if (Math.abs(sliderWrapperLeft) < maxScroll) {
                sliderWrapperLeft -= slideWidth + gap * 2;
                sliderWrapper.style.left = `${sliderWrapperLeft}px`
            }
        })

        // Задаём стили для слайдов
        sliderSlides.forEach((slide) => {
            slide.style.width = `${slideWidth}px`;
            slide.style.objectFit = "cover";
            slide.style.marginInline = `${gap}px`;
        });

        // Вычисляем максимальную ширину слайдера 
        for (let i = 0; i < perView; i++) {
            sliderMaxWidth += sliderSlides[i].offsetWidth;
        };

        slider.style.width = `${sliderMaxWidth + gap * 2 * perView}px`;

        // Настраиваем стили для слайдера
        slider.style.paddingInline = `${sliderSwipeWidth}px`;
        slider.style.marginInline = "auto";
        slider.style.height = "700px";
        slider.style.position = "relative";
        sliderWrapper.style.position = "absolute";
        sliderWrapper.style.top = "0";
        sliderWrapper.style.left = "0";
        sliderWrapper.style.transition = "all .4s ease";
        sliderWrapper.style.display = "flex";
    }, 0)
};

initSlider("productsSlider", "productsSliderWrapper", "productsSliderSlide", 4);
