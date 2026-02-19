document.addEventListener('DOMContentLoaded', function() {
    
    // ================= 1. ГЛАВНЫЙ СЛАЙДЕР (HERO) ================= //
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true, // Зацикленный слайдер
        speed: 800, // Плавная смена слайдов
        spaceBetween: 20, // Расстояние между слайдами
        
        // Кастомная кнопка "Вперед"
        navigation: {
            nextEl: '.custom-next',
        },
        
        // Поддержка свайпа
        grabCursor: true,
    });


    // ================= 2. СЛАЙДЕР ПРОЕКТОВ ================= //
    const projectsSwiper = new Swiper('.projects-swiper', {
        loop: true,
        speed: 600,
        grabCursor: true,
        
        // Кнопки навигации
        navigation: {
            nextEl: '.projects-next',
            prevEl: '.projects-prev',
        },

        // Адаптивность
        breakpoints: {
            320: { // Телефоны
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: { // Планшеты и ПК
                slidesPerView: 2,
                spaceBetween: 30
            }
        }
    });


    // ================= 3. СЛАЙДЕР УСЛУГ ================= //
    const servicesSwiper = new Swiper('.services-swiper', {
        loop: true,
        speed: 600,
        grabCursor: true,
        
        navigation: {
            nextEl: '.services-next',
            prevEl: '.services-prev',
        },

        // Адаптивность под 4 колонки
        breakpoints: {
            320: { // Мобильные
                slidesPerView: 1,
                spaceBetween: 15
            },
            576: { // Большие телефоны
                slidesPerView: 2,
                spaceBetween: 20
            },
            992: { // Планшеты
                slidesPerView: 3,
                spaceBetween: 20
            },
            1200: { // Десктопы
                slidesPerView: 4,
                spaceBetween: 20
            }
        }
    });


    // ================= 4. ЛОГИКА КВИЗА (ОПРОСНИК) ================= //
    const quizSteps = document.querySelectorAll('.quiz__step');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const stepCounter = document.getElementById('current-step');
    const quizActions = document.querySelector('.quiz__actions'); // Блок с кнопками Назад/Далее
    
    // Кнопки внутри финальных шагов
    const btnSubmit = document.getElementById('quiz-submit');
    const btnReset = document.getElementById('quiz-reset');

    if (quizSteps.length > 0) {
        // Массив порядка шагов: 1 -> 2 -> 3 -> 4 -> 5 -> contact -> success
        const stepsOrder = ['1', '2', '3', '4', '5', 'contact', 'success'];
        let currentIndex = 0; // Начинаем с первого шага (индекс 0)

        function updateQuizUI() {
            const currentStepName = stepsOrder[currentIndex];

            // 1. Скрываем все шаги
            quizSteps.forEach(step => step.classList.remove('active'));
            
            // 2. Показываем текущий шаг
            const activeStep = document.querySelector(`.quiz__step[data-step="${currentStepName}"]`);
            if (activeStep) activeStep.classList.add('active');
            
            // 3. Обновляем счетчик (только если это шаги с цифрами 1-5)
            if (stepCounter) {
                if (currentIndex < 5) {
                    stepCounter.parentElement.style.display = 'block'; // Показываем "Вопрос X/5"
                    stepCounter.textContent = currentIndex + 1;
                } else {
                    stepCounter.parentElement.style.display = 'none'; // Скрываем на финале
                }
            }
            
            // 4. Управление нижней панелью кнопок (Назад/Далее)
            if (currentStepName === 'contact' || currentStepName === 'success') {
                // Скрываем стандартные кнопки на шаге контактов и успеха
                if(quizActions) quizActions.style.display = 'none';
            } else {
                // Показываем на обычных шагах
                if(quizActions) quizActions.style.display = 'flex';
                
                // Состояние кнопки НАЗАД
                if (currentIndex === 0) {
                    btnPrev.disabled = true;
                } else {
                    btnPrev.disabled = false;
                }

                // Текст кнопки ДАЛЕЕ
                btnNext.innerHTML = 'Далее <img src="" alt="Вперед">';
            }
        }

        // --- Обработчики событий ---

        // Стандартная кнопка "Далее"
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                if (currentIndex < stepsOrder.length - 1) {
                    currentIndex++;
                    updateQuizUI();
                }
            });
        }

        // Стандартная кнопка "Назад"
        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateQuizUI();
                }
            });
        }

        // Кнопка "Получить расчет" (на шаге контактов)
        if (btnSubmit) {
            btnSubmit.addEventListener('click', (e) => {
                e.preventDefault();
                // Здесь можно добавить проверку валидации формы
                // Переходим на шаг Success
                const successIndex = stepsOrder.indexOf('success');
                if (successIndex !== -1) {
                    currentIndex = successIndex;
                    updateQuizUI();
                }
            });
        }

        // Кнопка "Начать с начала"
        if (btnReset) {
            btnReset.addEventListener('click', () => {
                currentIndex = 0; // Сброс на 1 шаг
                
                // Сброс всех инпутов (по желанию)
                document.querySelectorAll('.quiz__input').forEach(input => input.value = '');
                document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => input.checked = false);
                
                updateQuizUI();
            });
        }
        
        // Запуск
        updateQuizUI();
    }

});